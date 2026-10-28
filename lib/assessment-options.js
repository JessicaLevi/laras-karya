import { WORK_ARRANGEMENT_LABELS } from "@/lib/label";
import { JOBS } from "@/lib/mock-jobs";
import { SKILL_LABELS } from "@/lib/skills-catalog";

/**
 * Pilihan form asesmen. Nilai `value` SAMA PERSIS dengan nilai di schema_simple_HVN.sql,
 * jadi saat disambungkan ke Supabase cukup ganti sumber data, bukan logika form.
 * Acuan: Rev_FormAsesmen_Laras_Karya_v1.docx (bagian 3).
 */

export const TOTAL_STEPS = 4;

/** Langkah 1: situasi karier. Ikon dipetakan di komponen halaman. */
export const CAREER_SITUATIONS = [
  {
    value: "switch_or_return",
    title: "Berpindah atau kembali bekerja",
    description: "Sudah punya pengalaman kerja, ingin pindah ke sektor hijau atau kembali bekerja",
  },
  {
    value: "practical_experience",
    title: "Belajar dari pengalaman praktik",
    description: "Terbiasa bekerja langsung di lapangan atau usaha sendiri, tanpa jalur formal atau sertifikat",
  },
  {
    value: "fresh_start",
    title: "Lulusan baru atau mulai dari nol",
    description: "Mahasiswa tingkat akhir, lulusan baru, atau memulai karier dari awal",
  },
];

/** Pertanyaan lanjutan, hanya untuk switch_or_return. */
export const CAREER_BREAK_OPTIONS = [
  { value: "yes", label: "Ya, sempat jeda" },
  { value: "no", label: "Tidak, langsung pindah" },
  { value: "skip", label: "Lewati" },
];

/** Pemetaan ke profiles.career_path (lihat tabel pemetaan di dokumen). */
export function toCareerPath(careerSituation, careerBreak) {
  switch (careerSituation) {
    case "switch_or_return":
      return careerBreak === "yes" ? "returning_to_work" : "career_switcher";
    case "practical_experience":
      return "self_taught";
    case "fresh_start":
      return "fresh_graduate";
    default:
      return null;
  }
}

/** Kode sektor dari komentar di awal schema_simple_HVN.sql. */
export const SECTORS = [
  { value: "energi-terbarukan", label: "Energi Terbarukan" },
  { value: "konservasi-lingkungan", label: "Konservasi Lingkungan" },
  { value: "limbah-daur-ulang", label: "Limbah & Daur Ulang" },
  { value: "bangunan-hijau", label: "Bangunan Hijau" },
  { value: "pertanian-berkelanjutan", label: "Pertanian Berkelanjutan" },
  { value: "transportasi-bersih", label: "Transportasi Bersih" },
  { value: "keuangan-esg", label: "Keuangan ESG" },
  { value: "air-sanitasi", label: "Air & Sanitasi" },
];

export const WORK_ARRANGEMENTS = ["onsite", "remote", "hybrid"].map((value) => ({
  value,
  label: WORK_ARRANGEMENT_LABELS[value],
}));

export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry (kurang dari 1 tahun)" },
  { value: "junior", label: "Junior (1–3 tahun)" },
  { value: "mid", label: "Mid (3–6 tahun)" },
  { value: "senior", label: "Senior (lebih dari 6 tahun)" },
];

export const EDUCATION_LEVELS = [
  { value: "sma", label: "SMA/SMK" },
  { value: "d3", label: "D3" },
  { value: "s1", label: "S1" },
  { value: "s2", label: "S2" },
  { value: "s3", label: "S3" },
];

export const PROVINCES = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi", "Bengkulu",
  "Sumatera Selatan", "Kepulauan Bangka Belitung", "Lampung", "Banten", "DKI Jakarta", "Jawa Barat",
  "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan",
  "Sulawesi Tenggara", "Maluku", "Maluku Utara", "Papua", "Papua Barat", "Papua Barat Daya",
  "Papua Tengah", "Papua Pegunungan", "Papua Selatan",
];

/**
 * Daftar keahlian untuk dropdown = katalog (lib/skills-catalog.js, salinan tabel `skills`).
 * Pengguna hanya boleh memilih dari daftar ini. Nanti diganti query ke tabel `skills` di Supabase.
 */
export const SKILL_OPTIONS = SKILL_LABELS;

/** SEMENTARA: data tiruan lowongan masih memakai NAMA sektor; hanya nama yang jelas padanannya yang dipetakan. */
const MOCK_SECTOR_ALIASES = {
  "Energi Terbarukan": "energi-terbarukan",
  "Bangunan Hijau": "bangunan-hijau",
  Konservasi: "konservasi-lingkungan",
  Agroforestri: "pertanian-berkelanjutan",
  "Pertanian Berkelanjutan": "pertanian-berkelanjutan",
  "Pengelolaan Limbah": "limbah-daur-ulang",
};

/** SEMENTARA: skill yang sering diminta per kode sektor, dihitung dari data tiruan lowongan. */
export const MOCK_SUGGESTED_SKILLS_BY_SECTOR = JOBS.reduce((bySector, job) => {
  const code = MOCK_SECTOR_ALIASES[job.sector];
  if (code) bySector[code] = [...new Set([...(bySector[code] ?? []), ...(job.skills ?? [])])];
  return bySector;
}, {});

export const LIMITS = {
  storyMin: 50,
  storyMax: 600,
  maxSkills: 10,
  maxCertifications: 5,
};
