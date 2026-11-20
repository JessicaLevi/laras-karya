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

/**
 * Pemetaan ke profiles.career_path (ERD v3). Nilainya sama dengan `career_situation`:
 * switch_or_return | practical_experience | fresh_start. Jeda karier TIDAK lagi menjadi
 * nilai career_path, tapi disimpan terpisah (lihat toHasCareerBreak).
 */
export function toCareerPath(careerSituation) {
  return CAREER_SITUATIONS.some((o) => o.value === careerSituation) ? careerSituation : null;
}

/**
 * Jeda karier -> true / false / null, dibaca pipeline rekomendasi untuk komponen benefit:
 * jeda karier = ya berarti pengguna butuh "program return-to-work".
 * Jawaban mentahnya (yes/no/skip) tersimpan apa adanya di assessments.answers
 * (step_1.career_break), jadi TIDAK ada kolom baru di ERD v3; fungsi ini hanya
 * menormalkannya saat backend/pipeline membaca. "skip" atau belum diisi = null
 * (data kosong, dinilai netral oleh pipeline, bukan "tidak").
 * Hanya bermakna untuk switch_or_return. Belum dipanggil di UI; dipakai saat backend tersambung.
 */
export function toHasCareerBreak(careerSituation, careerBreak) {
  if (careerSituation !== "switch_or_return") return null;
  if (careerBreak === "yes") return true;
  if (careerBreak === "no") return false;
  return null;
}

/**
 * Sektor = salinan tabel `sectors` di Supabase (kolom code dan label, urut sort_order).
 * `value` HARUS sama persis dengan sectors.code, karena disimpan ke profiles.interest_sectors
 * dan dicocokkan dengan jobs.sector oleh match_breakdown(). Sektor "other" (Lainnya) sengaja
 * tidak ditawarkan sebagai minat. Jika tabel sectors berubah, ubah daftar ini juga.
 */
export const SECTORS = [
  { value: "renewable_energy", label: "Energi Terbarukan" },
  { value: "sustainable_agriculture_forestry", label: "Pertanian & Kehutanan Berkelanjutan" },
  { value: "waste_environment", label: "Pengelolaan Limbah & Lingkungan" },
  { value: "clean_transportation", label: "Clean Transportation" },
  { value: "climate_carbon_finance", label: "Iklim, Karbon & Keuangan Berkelanjutan" },
  { value: "oil_gas", label: "Minyak & Gas" },
  { value: "manufacturing_industrial", label: "Manufaktur & Teknologi Industri" },
  { value: "professional_services", label: "Jasa Profesional & Konsultasi" },
  { value: "agribusiness", label: "Pertanian & Agribisnis" },
  { value: "transport_logistics", label: "Transportasi & Logistik" },
  { value: "hospitality", label: "Perhotelan & Pariwisata" },
  { value: "finance_fintech", label: "Keuangan & Fintech" },
  { value: "ngo_development", label: "Organisasi Nirlaba & Pembangunan" },
  { value: "health_wellness", label: "Kesehatan & Kebugaran" },
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
  "Energi Terbarukan": "renewable_energy",
  Konservasi: "waste_environment",
  Agroforestri: "sustainable_agriculture_forestry",
  "Pertanian Berkelanjutan": "sustainable_agriculture_forestry",
  "Pengelolaan Limbah": "waste_environment",
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
