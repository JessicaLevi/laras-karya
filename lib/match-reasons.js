import { buildFitInsights } from "@/lib/fit-insights";

/**
 * Alasan singkat "Mengapa cocok untuk Anda" untuk kartu di /recommended-jobs.
 * Memakai sumber yang sama dengan halaman detail (lib/fit-insights.js), dan hanya
 * menampilkan poin yang benar-benar sesuai. Bila `job.reasons` terisi dari database,
 * MatchPanel memakai itu lebih dulu.
 */
export function buildReasons(job, owned = []) {
  const missing = (job.skills ?? []).filter((s) => !owned.includes(s));
  return buildFitInsights({
    sector: job.sector,
    mode: job.mode,
    city: job.city,
    perks: job.benefits ?? [],
    owned,
    missing,
  })
    .filter((i) => i.tone === "good")
    .map((i) => i.text);
}
