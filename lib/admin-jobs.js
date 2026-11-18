import { EMPLOYMENT_TYPES, JOB_STATUSES, WORK_MODES } from "@/lib/admin-options";

/**
 * Validasi isian lowongan untuk /api/admin/jobs, dengan aturan yang sama dengan parseJob di
 * app/admin/jobs/actions.js (file "use server" itu hanya menerima FormData dan tidak mengekspor parseJob).
 * Bedanya: teks yang kepanjangan ditolak (di formulir dibatasi maxLength oleh browser), bukan dipotong diam-diam.
 *
 * Hasil: { values } (siap dimasukkan ke tabel jobs, tanpa published_at) atau { errors: { field: pesan } }.
 * `current` = baris lowongan lama saat PUT: field yang tidak dikirim memakai nilai lama, jadi kiriman boleh sebagian.
 * Saat membuat baru, field yang tidak dikirim memakai bawaan formulir: status draft, full_time, onsite, sektor hijau.
 */

export const JOB_LIST_COLUMNS =
  "id,title,company_name,sector,city,province,employment_type,work_arrangement,status,deadline,is_green_job,published_at,updated_at";

const has = (list, value) => list.some((item) => item.value === value);
const isBlank = (value) => value === undefined || value === null || value === "";
const SECTOR_CODE = /^[A-Za-z0-9_-]+$/;

/** "YYYY-MM-DD" yang benar-benar ada di kalender ("2026-02-31" ditolak; Date.parse sendiri menerimanya). */
function isCalendarDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

const DEFAULTS = { status: "draft", employment_type: "full_time", work_arrangement: "onsite", is_green_job: true };

export function parseJobInput(body, current) {
  const errors = {};
  const pick = (key) => (body[key] !== undefined ? body[key] : (current?.[key] ?? DEFAULTS[key]));

  /** Teks wajib: string, dirapikan, lalu dicek panjangnya. */
  const required = (key, min, max, minMessage) => {
    const raw = pick(key);
    if (raw !== undefined && raw !== null && typeof raw !== "string") {
      errors[key] = "Harus berupa teks.";
      return "";
    }
    const value = String(raw ?? "").trim();
    if (value.length < min) errors[key] = minMessage;
    else if (value.length > max) errors[key] = `Maksimal ${max} karakter.`;
    return value;
  };

  /** Teks opsional: kosong menjadi null. */
  const optional = (key, max) => {
    const raw = pick(key);
    if (isBlank(raw)) return null;
    if (typeof raw !== "string") {
      errors[key] = "Harus berupa teks.";
      return null;
    }
    const value = raw.trim();
    if (value.length > max) errors[key] = `Maksimal ${max} karakter.`;
    return value || null;
  };

  const choice = (key, list, message) => {
    const value = pick(key);
    if (!has(list, value)) errors[key] = message;
    return value;
  };

  const money = (key) => {
    const raw = pick(key);
    if (isBlank(raw)) return null;
    const n = typeof raw === "number" || (typeof raw === "string" && raw.trim() !== "") ? Number(raw) : Number.NaN;
    if (!Number.isFinite(n) || n < 0 || n > 999_999_999_999) {
      errors[key] = "Isi angka 0 atau lebih.";
      return null;
    }
    return Math.round(n);
  };

  const values = {
    title: required("title", 3, 150, "Judul minimal 3 karakter."),
    company_name: required("company_name", 2, 120, "Nama perusahaan minimal 2 karakter."),
    sector: required("sector", 1, 60, "Pilih sektor."),
    description: required("description", 20, 5000, "Deskripsi minimal 20 karakter."),
    employment_type: choice("employment_type", EMPLOYMENT_TYPES, "Pilih jenis pekerjaan: full_time, part_time, contract, atau internship."),
    work_arrangement: choice("work_arrangement", WORK_MODES, "Pilih pola kerja: onsite, hybrid, atau remote."),
    status: choice("status", JOB_STATUSES, "Pilih status: draft, published, atau closed."),
    city: optional("city", 80),
    province: optional("province", 80),
    salary_min: money("salary_min"),
    salary_max: money("salary_max"),
  };
  if (!errors.sector && !SECTOR_CODE.test(values.sector)) errors.sector = "Pilih sektor.";

  // Batas lamaran: "YYYY-MM-DD" atau kosong. Nilai lama dari database dipotong ke 10 karakter, seperti formulir.
  const rawDeadline = pick("deadline");
  const fromBody = body.deadline !== undefined;
  const deadline = isBlank(rawDeadline) ? "" : fromBody ? rawDeadline : String(rawDeadline).slice(0, 10);
  if (deadline && !isCalendarDate(deadline)) {
    errors.deadline = "Tanggal tidak valid. Gunakan format YYYY-MM-DD.";
  }
  values.deadline = deadline || null;

  const green = pick("is_green_job");
  if (typeof green !== "boolean") errors.is_green_job = "Harus true atau false.";
  values.is_green_job = green === true;

  if (!errors.salary_min && !errors.salary_max && values.salary_min != null && values.salary_max != null && values.salary_min > values.salary_max) {
    errors.salary_max = "Gaji maksimum harus ≥ gaji minimum.";
  }

  return Object.keys(errors).length ? { errors } : { values };
}

/**
 * Apakah kode sektor ada di tabel sectors. Bila tabelnya tidak bisa dibaca, dianggap ada: formulir admin
 * juga hanya mengecek bentuk kodenya, dan database tetap menolak kode yang tidak dikenal.
 */
export async function sectorExists(supabase, code) {
  const { data, error } = await supabase.from("sectors").select("code").eq("code", code).maybeSingle();
  return error ? true : Boolean(data);
}

/** Nilai published_at saat simpan: terisi saat pertama kali berstatus published, lalu tidak diubah lagi (sama dengan saveJob). */
export function publishedAtFor(status, currentPublishedAt) {
  if (status === "published") return currentPublishedAt ?? new Date().toISOString();
  return currentPublishedAt ?? null;
}
