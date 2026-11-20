// Daftar pilihan bersama untuk halaman profil (dipakai page.js dan actions.js).
// Letakkan di src/lib/profile-options.js (impor: "@/lib/profile-options").
// Nanti daftar ini bisa diganti data dari Supabase agar sama dengan istilah yang dipakai lowongan.

import { SECTORS } from "@/lib/assessment-options";
import { SKILL_LABELS } from "@/lib/skills-catalog";

export const WORK_ARRANGEMENTS = ["WFO", "Remote", "Hybrid"];

// export const INDUSTRIES = [
//   "Energi Terbarukan",
//   "Konservasi Lingkungan",
//   "Limbah & Daur Ulang",
//   "Bangunan Hijau",
//   "Pertanian Berkelanjutan",
//   "Transportasi Bersih",
//   "Keuangan ESG",
//   "Air & Sanitasi",
// ];

// Tingkat kemahiran bahasa. Nilai `level` ini juga yang disimpan di user_skills.level.
export const LANGUAGE_LEVELS = {
  Native: { percent: 100, tone: "brand" },
  Profesional: { percent: 80, tone: "blue" },
  Menengah: { percent: 55, tone: "neutral" },
  Dasar: { percent: 30, tone: "amber" },
};

// Nilai user_skills.level (constraint di database: Dasar, Menengah, Mahir atau kosong) untuk tiap level bahasa di halaman.
// Profesional dan Native sama-sama "Mahir"; level aslinya tetap tersimpan di profiles.languages.
export const LANGUAGE_SKILL_LEVEL = {
  Native: "Mahir",
  Profesional: "Mahir",
  Menengah: "Menengah",
  Dasar: "Dasar",
};

// Pilihan bahasa di dropdown (nama tanpa awalan "Bahasa", sama seperti yang tersimpan di profil).
export const LANGUAGE_OPTIONS = [
  "Indonesia",
  "Inggris",
  "Mandarin",
  "Jepang",
  "Korea",
  "Arab",
  "Jerman",
  "Prancis",
  "Belanda",
  "Spanyol",
  "Melayu",
  "Jawa",
  "Banjar",
];

export const EXPERIENCE_LEVELS = [
  "Fresh Graduate (0–1 tahun)",
  "Junior (1–3 tahun)",
  "Menengah (3–5 tahun)",
  "Senior (5–8 tahun)",
  "Ahli / Lead (8+ tahun)",
];

// Dropdown keahlian = katalog skills (hanya pilih dari daftar, tidak ada ketik bebas).
export const SKILL_OPTIONS = SKILL_LABELS;

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