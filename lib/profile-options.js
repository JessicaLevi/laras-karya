// Daftar pilihan bersama untuk halaman profil (dipakai page.js dan actions.js).
// Letakkan di src/lib/profile-options.js (impor: "@/lib/profile-options").
// Nanti daftar ini bisa diganti data dari Supabase agar sama dengan istilah yang dipakai lowongan.

export const WORK_ARRANGEMENTS = ["WFO", "Remote", "Hybrid"];

export const INDUSTRIES = [
  "Energi Terbarukan",
  "Konservasi Lingkungan",
  "Limbah & Daur Ulang",
  "Bangunan Hijau",
  "Pertanian Berkelanjutan",
  "Transportasi Bersih",
  "Keuangan ESG",
  "Air & Sanitasi",
];

export const EXPERIENCE_LEVELS = [
  "Fresh Graduate (0–1 tahun)",
  "Junior (1–3 tahun)",
  "Menengah (3–5 tahun)",
  "Senior (5–8 tahun)",
  "Ahli / Lead (8+ tahun)",
];

// Opsi khusus di dropdown skill untuk skill yang tidak ada di daftar.
export const OTHER_SKILL = "__other__";

export const SKILL_OPTIONS = [
  "Agroforestri",
  "Analisis Dampak Lingkungan (AMDAL)",
  "Audit Energi",
  "Daur Ulang & Pengelolaan Limbah",
  "Edukasi Lingkungan",
  "Fasilitasi Pelatihan",
  "Inventarisasi Emisi Karbon",
  "Komunikasi Lapangan",
  "Konservasi Keanekaragaman Hayati",
  "Manajemen Proyek",
  "Pelaporan ESG & Keberlanjutan",
  "Pemberdayaan Petani",
  "Pemetaan Lahan",
  "Pengelolaan Air & Sanitasi",
  "Pengolahan Data (Excel / SQL)",
  "Penulisan Proposal & Laporan",
  "Pertanian Berkelanjutan",
  "Restorasi Ekosistem",
  "Sistem Informasi Geografis (GIS)",
  "Studi Kelayakan Energi Terbarukan",
  "Sertifikasi Bangunan Hijau (GBCI / EDGE)",
];

export const PROVINCES = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Kepulauan Bangka Belitung",
  "Bengkulu",
  "Lampung",
  "DKI Jakarta",
  "Banten",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Barat Daya",
  "Papua Tengah",
  "Papua Pegunungan",
  "Papua Selatan",
];