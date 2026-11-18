import { connection } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { todayWib } from "@/lib/job-detail-mapping";

/**
 * Saran pelatihan di Beranda (bagian "Pelatihan untuk Menutup Skill Gap Anda"). Hanya untuk server.
 * Semua query memakai sesi user yang sedang masuk, jadi tetap di bawah RLS.
 *
 * Cara menyusun saran (dari rekomendasi lowongan user):
 * 1) Ambil lowongan rekomendasi user (job_recommendations) yang masih published dan belum lewat deadline.
 * 2) Hitung skill lowongan-lowongan itu yang BELUM dimiliki user (user_skills) = skill gap.
 *    Urutan prioritas sama dengan lib/skill-gap-data.js: skill wajib (job_skills.is_required) dulu,
 *    lalu yang diminta paling banyak lowongan cocok, lalu nama.
 * 3) Skill gap teratas yang punya pelatihan (course_skills, courses published) jadi "skill utama".
 *    Tiga pelatihan diambil dari skill utama dulu, lalu dilengkapi dari skill gap berikutnya.
 */

const FORMAT_LABELS = { online: "Online", hybrid: "Hybrid", offline: "Offline" };
const isHttpUrl = (url) => /^https?:\/\//i.test(String(url ?? ""));
// Status di database (user_course_progress.status) -> status di kartu (sama dengan halaman Jalur Belajar).
// "planned" = belum dimulai, jadi tidak diberi status.
const DB_TO_UI = { in_progress: "enrolled", completed: "completed" };
const one = (rel) => (Array.isArray(rel) ? rel[0] : rel);

const COURSE_COLUMNS =
  "id,title,url,provider,level,duration_text,format,image_url,is_featured,sort_order,is_published";

/** Pelatihan urut: unggulan dulu, lalu sort_order, lalu judul. */
const byCourseOrder = (a, b) =>
  Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured)) ||
  (a.sort_order ?? 0) - (b.sort_order ?? 0) ||
  String(a.title).localeCompare(String(b.title), "id");

/**
 * Menghitung skill gap dari baris job_skills milik lowongan rekomendasi.
 * @param {Array} rows baris job_skills (dengan skills(label) dan jobs(status, deadline))
 * @param {Set<string>} owned kode skill yang sudah dimiliki user
 * @param {string} today "YYYY-MM-DD" (WIB)
 * @returns {Array<{ code: string, label: string, demand: number, required: number }>} sudah berurutan prioritas
 */
export function rankSkillGaps(rows, owned, today) {
  const stats = new Map();
  for (const row of rows ?? []) {
    const code = row?.skill_code;
    const job = one(row?.jobs);
    if (!code || !row.job_id || owned.has(code)) continue;
    if (!job || job.status !== "published" || (job.deadline && String(job.deadline) < today)) continue;
    if (!stats.has(code)) stats.set(code, { code, label: one(row.skills)?.label ?? code, jobs: new Set(), required: new Set() });
    const s = stats.get(code);
    s.jobs.add(row.job_id);
    if (row.is_required === true) s.required.add(row.job_id);
  }
  return [...stats.values()]
    .map((s) => ({ code: s.code, label: s.label, demand: s.jobs.size, required: s.required.size }))
    .sort(
      (a, b) =>
        Number(b.required > 0) - Number(a.required > 0) ||
        b.demand - a.demand ||
        a.label.localeCompare(b.label, "id"),
    );
}

/**
 * Memilih hingga `limit` pelatihan: dari skill gap teratas dulu, tanpa pelatihan ganda.
 * @param {Array<{ code: string, label: string }>} ranked skill gap berurutan prioritas
 * @param {Array} courseRows baris course_skills (dengan courses)
 * @returns {{ focus: object|null, picks: Array<{ course: object, skillLabel: string }>, covered: Set<string> }}
 *   `focus` = skill gap teratas yang punya pelatihan; `covered` = kode skill yang punya minimal satu pelatihan
 */
export function pickCourses(ranked, courseRows, limit = 3) {
  const bySkill = new Map();
  for (const row of courseRows ?? []) {
    const course = one(row?.courses);
    if (!course?.id || !course.title || !isHttpUrl(course.url) || course.is_published === false) continue;
    if (!bySkill.has(row.skill_code)) bySkill.set(row.skill_code, new Map());
    bySkill.get(row.skill_code).set(course.id, course);
  }

  let focus = null;
  const picks = [];
  const used = new Set();
  for (const skill of ranked) {
    const courses = [...(bySkill.get(skill.code)?.values() ?? [])].sort(byCourseOrder);
    if (courses.length === 0) continue;
    focus ??= skill;
    for (const course of courses) {
      if (picks.length >= limit) break;
      if (used.has(course.id)) continue;
      used.add(course.id);
      picks.push({ course, skillLabel: skill.label });
    }
    if (picks.length >= limit) break;
  }
  return { focus, picks, covered: new Set(bySkill.keys()) };
}

/** Pelatihan database -> bentuk kartu Beranda (components/home/course-card.jsx). */
function toHomeCourse({ course, skillLabel }, isPrimary, status) {
  return {
    id: course.id,
    provider: course.provider ?? "Udemy",
    title: course.title,
    level: course.level ?? "Pemula",
    duration: course.duration_text ?? "",
    mode: FORMAT_LABELS[course.format] ?? "Online",
    focusSkill: skillLabel,
    image: course.image_url ?? null,
    isPopular: Boolean(course.is_featured),
    isPrimary,
    // Tautan pelatihan (courses.url) dan status belajar user, dipakai tombol seperti di Jalur Belajar.
    url: course.url,
    status,
  };
}

const LOAD_ERROR = "Saran pelatihan belum bisa dimuat. Coba lagi beberapa saat lagi.";
const NOTE_NO_RECOMMENDATIONS =
  "Belum ada rekomendasi pelatihan. Selesaikan asesmen karier, lalu tekan Perbarui Rekomendasi di atas.";
const NOTE_NO_GAP = "Keahlian Anda sudah memenuhi lowongan yang cocok. Belum ada skill gap yang perlu ditutup.";
const NOTE_NO_COURSE = "Pelatihan untuk skill ini belum tersedia. Kami akan menambahkannya.";

/**
 * SATU SUMBER rekomendasi pelatihan, dipakai Beranda (limit 3) dan halaman Jalur Belajar mode
 * ?rekomendasi=1 (semua), supaya kartu di kedua tempat selalu sama dan berurutan sama.
 *
 * @param {object} supabase klien Supabase sesi user
 * @param {{ id: string }} user
 * @param {{ today: string, limit?: number }} options `today` = "YYYY-MM-DD" (WIB); `limit` = jumlah pelatihan maksimal
 * @returns {Promise<{
 *   error: string | null,
 *   reason: "no-recommendations" | "no-gap" | "no-course" | null,
 *   note: string | null,
 *   jobCount: number,
 *   ranked: Array<{ code: string, label: string, demand: number, required: number }>,
 *   focus: { code: string, label: string, demand: number } | null,
 *   picks: Array<{ course: object, skillLabel: string }>,
 *   uncovered: string[],
 * }>}
 */
export async function loadRecommendedCourses(supabase, user, { today, limit = 3 }) {
  const base = { error: null, reason: null, note: null, jobCount: 0, ranked: [], focus: null, picks: [], uncovered: [] };

  const [recRes, ownedRes] = await Promise.all([
    supabase.from("job_recommendations").select("job_id").eq("user_id", user.id),
    supabase.from("user_skills").select("skill_code").eq("user_id", user.id),
  ]);
  if (recRes.error || ownedRes.error) {
    console.error("[home-courses] rekomendasi/keahlian:", (recRes.error ?? ownedRes.error).message);
    return { ...base, error: LOAD_ERROR };
  }

  const jobIds = [...new Set((recRes.data ?? []).map((r) => r.job_id))];
  if (jobIds.length === 0) return { ...base, reason: "no-recommendations", note: NOTE_NO_RECOMMENDATIONS };

  const gapsRes = await supabase
    .from("job_skills")
    .select("job_id,skill_code,is_required,skills(label),jobs!inner(status,deadline)")
    .in("job_id", jobIds)
    .eq("jobs.status", "published");
  if (gapsRes.error) {
    console.error("[home-courses] job_skills:", gapsRes.error.message);
    return { ...base, error: LOAD_ERROR };
  }

  const owned = new Set((ownedRes.data ?? []).map((r) => r.skill_code));
  const ranked = rankSkillGaps(gapsRes.data, owned, today);
  if (ranked.length === 0) return { ...base, jobCount: jobIds.length, reason: "no-gap", note: NOTE_NO_GAP };

  const coursesRes = await supabase
    .from("course_skills")
    .select(`skill_code,courses!inner(${COURSE_COLUMNS})`)
    .in("skill_code", ranked.map((s) => s.code))
    .eq("courses.is_published", true);
  if (coursesRes.error) {
    console.error("[home-courses] course_skills:", coursesRes.error.message);
    return { ...base, error: LOAD_ERROR };
  }

  const { focus, picks, covered } = pickCourses(ranked, coursesRes.data, limit);
  const uncovered = ranked.filter((s) => !covered.has(s.code)).map((s) => s.label);
  if (!focus) {
    return { ...base, jobCount: jobIds.length, ranked, uncovered, reason: "no-course", note: NOTE_NO_COURSE };
  }
  return { ...base, jobCount: jobIds.length, ranked, focus, picks, uncovered };
}

/**
 * @param {{ id: string }} user user yang sedang masuk (dari getCurrentUser)
 * @returns {Promise<{
 *   alert: { skill: string, gapCount: number } | null,
 *   courses: object[],
 *   note: string | null,
 *   error: string | null,
 * }>} `note` = penjelasan bila belum ada saran (belum ada rekomendasi, tidak ada skill gap, atau belum ada pelatihan)
 */
export async function fetchHomeCourses(user) {
  // Memakai "hari ini" dan sesi user: harus dirender per permintaan, connection() paling awal.
  await connection();
  const supabase = await createClient();
  const today = todayWib();

  const r = await loadRecommendedCourses(supabase, user, { today, limit: 3 });
  if (r.error) return { alert: null, courses: [], note: null, error: r.error };
  if (!r.focus) {
    const top = r.ranked[0];
    return { alert: top ? { skill: top.label, gapCount: top.demand } : null, courses: [], note: r.note, error: null };
  }

  // Progres user untuk tiga pelatihan ini. Gagal dibaca: kartu tampil sebagai "belum mulai" (bukan error halaman).
  const progressRes = await supabase
    .from("user_course_progress")
    .select("course_id,status")
    .eq("user_id", user.id)
    .in("course_id", r.picks.map((p) => p.course.id));
  if (progressRes.error) console.error("[home-courses] progres:", progressRes.error.message);
  const statusById = new Map((progressRes.data ?? []).map((row) => [String(row.course_id), DB_TO_UI[row.status]]));

  return {
    alert: { skill: r.focus.label, gapCount: r.focus.demand },
    courses: r.picks.map((pick, i) => toHomeCourse(pick, i === 0, statusById.get(String(pick.course.id)))),
    note: null,
    error: null,
  };
}