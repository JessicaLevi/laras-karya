import { formatSize } from "@/lib/documents";

/**
 * Dokumen profil (tabel `documents`, bentuk hasil listDocuments) -> daftar untuk halaman Persiapan Lamaran.
 * kind "portfolio"   -> portfolios:     { id, name, sizeLabel, uploadedAt, filePath }
 * kind "certificate" -> certifications: { id, name, issuer, year, sizeLabel, filePath }
 * filePath = lokasi di bucket privat "Documents"; tautan "Lihat" dibuat saat diklik (createDocumentUrl).
 * @param {{ id: string, kind: string, title: string, issuer?: string, year?: string, filePath: string, fileSize?: number, createdAt?: string }[]} docs
 */
export function documentsToFiles(docs = []) {
  const sizeLabel = (d) => (Number.isFinite(d.fileSize) ? formatSize(d.fileSize) : "");
  const dateLabel = (iso) => {
    const date = iso ? new Date(iso) : null;
    return date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta" })
      : "";
  };

  return {
    portfolios: docs
      .filter((d) => d.kind === "portfolio")
      .map((d) => ({ id: d.id, name: d.title, sizeLabel: sizeLabel(d), uploadedAt: dateLabel(d.createdAt), filePath: d.filePath })),
    certifications: docs
      .filter((d) => d.kind === "certificate")
      .map((d) => ({ id: d.id, name: d.title, issuer: d.issuer ?? "", year: d.year ?? "", sizeLabel: sizeLabel(d), filePath: d.filePath })),
  };
}
