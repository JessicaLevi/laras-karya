/**
 * Pencarian teks sederhana untuk data di halaman (lowongan, pelatihan).
 * - Tidak membedakan huruf besar-kecil dan aksen.
 * - Setiap kata harus muncul di salah satu kolom: "analis jakarta" cocok dengan
 *   lowongan "Analis Data" di Jakarta, bukan semua lowongan yang memuat salah satu kata.
 * Nanti bisa diganti query ke Supabase (ilike / full-text search) tanpa mengubah tampilan.
 */

export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesQuery(fields, query) {
  const words = normalizeText(query).split(" ").filter(Boolean);
  if (words.length === 0) return true;
  const haystack = normalizeText(fields.flat().filter(Boolean).join(" "));
  return words.every((word) => haystack.includes(word));
}

/** Kolom lowongan yang ikut dicari (bentuk data lib/mock-jobs.js). */
export const jobSearchFields = (job) => [job.title, job.company, job.sector, job.city, job.mode, job.skills, job.benefits];

/** Kolom pelatihan yang ikut dicari (bentuk data jalur belajar). */
export const courseSearchFields = (course) => [course.title, course.provider, course.skillTag, course.level, course.format];

/** Tulis ?q= ke URL tanpa memuat ulang halaman (Next.js menyinkronkan useSearchParams). */
export function replaceQueryParam(value, param = "q") {
  const params = new URLSearchParams(window.location.search);
  const trimmed = value.trim();
  if (trimmed) params.set(param, trimmed);
  else params.delete(param);
  const qs = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}
