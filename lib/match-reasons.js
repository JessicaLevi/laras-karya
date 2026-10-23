/**
 * Menyusun alasan "Mengapa Cocok untuk Anda" dari template.
 * `fit` nanti diisi dari breakdown skor database (sector > 0, work_style = 100, dst.).
 * Selama masih data tiruan, semuanya dianggap cocok.
 */
export function buildReasons(job, owned = [], fit = {}) {
  const { sector = true, workStyle = true, location = true } = fit;
  const reasons = [];

  if (owned.length) {
    reasons.push(`Keahlian ${owned.slice(0, 2).join(" dan ")} sesuai kebutuhan posisi`);
  }
  if (sector && job.sector) {
    reasons.push(`Sesuai minat Anda di sektor ${job.sector}`);
  }
  if (workStyle && location && job.mode) {
    const place = job.mode === "Remote" ? "Remote" : `${job.mode} di ${job.city}`;
    reasons.push(`Pola kerja ${place}, sesuai preferensi dan domisili Anda`);
  }
  if (job.benefits?.length) {
    reasons.push(`Perusahaan memiliki ${job.benefits.join(", ")}`);
  }
  return reasons;
}