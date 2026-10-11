/**
 * Type definition via JSDoc (repo ini JavaScript, VS Code tetap memberi autocomplete).
 *
 * @typedef {"terpenuhi"|"peningkatan"|"belum"} SkillStatus
 *
 * @typedef {Object} SkillItem
 * @property {string} id
 * @property {string} name
 * @property {SkillStatus} status   terpenuhi = sudah punya · peningkatan = perlu ditingkatkan · belum = belum dimiliki
 *
 * @typedef {Object} BenefitItem
 * @property {string} id
 * @property {string} label
 *
 * @typedef {Object} JobDetail
 * @property {string} id
 * @property {string} title
 * @property {string} company
 * @property {string} city              contoh "Jakarta"
 * @property {"Hybrid"|"Remote"|"On-site"} workMode
 * @property {string} address
 * @property {string} employmentType    contoh "Full-time"
 * @property {string} sector
 * @property {boolean} isOpen
 * @property {string} source
 * @property {string} updatedAt         tanggal tampil, contoh "28 Sep 2026"
 * @property {number} matchPercent      0–100
 * @property {string} salary
 * @property {string} description
 * @property {string[]} requirements
 * @property {BenefitItem[]} benefits
 * @property {SkillItem[]} skills
 */

/** @type {string[]} */
const REQUIREMENTS = [
  "Minimal lulusan S1 ilmu lingkungan, teknik lingkungan, atau bidang sosial terkait",
  "Pengalaman minimal 2 tahun dalam penyusunan laporan ESG atau audit keberlanjutan",
  "Memahami regulasi keberlanjutan lokal dan kerangka kerja internasional (GRI, TCFD)",
  "Mampu berkomunikasi dengan baik dalam bahasa Indonesia dan Inggris",
  "Bersedia bekerja sesuai pola kerja yang ditawarkan",
];

/** @type {BenefitItem[]} */
const BENEFITS = [
  { id: "b1", label: "BPJS Kesehatan & Ketenagakerjaan" },
  { id: "b2", label: "Tunjangan transportasi dan makan harian" },
  { id: "b3", label: "Fleksibilitas kerja hybrid" },
  { id: "b4", label: "Pelatihan dan sertifikasi keberlanjutan" },
  { id: "b5", label: "Bonus kinerja tahunan" },
  { id: "b6", label: "Jenjang karier hingga Sustainability Manager" },
];

/** @type {SkillItem[]} */
const SKILLS = [
  { id: "s1", name: "Pelaporan ESG", status: "peningkatan" },
  { id: "s2", name: "Analisis Data ESG", status: "terpenuhi" },
  { id: "s3", name: "Manajemen Proyek Hijau", status: "peningkatan" },
  { id: "s4", name: "Sertifikasi LEED", status: "belum" },
  { id: "s5", name: "Regulasi Keberlanjutan", status: "terpenuhi" },
];

const COMMON = {
  employmentType: "Full-time",
  source: "situs perusahaan",
  updatedAt: "28 Sep 2026",
  requirements: REQUIREMENTS,
  benefits: BENEFITS,
  skills: SKILLS,
};

/**
 * MOCK detail lowongan (nanti diganti query Supabase berdasarkan id).
 * id 1–3 sesuai kartu di Beranda.
 * @type {Record<string, JobDetail>}
 */
export const MOCK_JOB_DETAILS = {
  1: {
    ...COMMON,
    id: "1",
    title: "Sustainability Officer",
    company: "PT Hijau Lestari",
    city: "Jakarta",
    workMode: "Hybrid",
    address: "Jakarta, DKI Jakarta",
    sector: "Energi Terbarukan",
    isOpen: true,
    matchPercent: 95,
    salary: "Rp 10.000.000 - Rp 12.000.000 per bulan",
    description:
      "PT Hijau Lestari sedang mencari Sustainability Officer untuk memimpin inisiatif keberlanjutan, menyusun laporan keberlanjutan tahunan, dan memastikan kepatuhan terhadap standar ESG nasional.",
  },
  2: {
    ...COMMON,
    id: "2",
    title: "Green Building Consultant",
    company: "EcoVerde Indonesia",
    city: "Seluruh Indonesia",
    workMode: "Remote",
    address: "Jakarta Selatan, DKI Jakarta",
    sector: "Bangunan Hijau",
    isOpen: true,
    matchPercent: 89,
    salary: "Rp 8.000.000 - Rp 11.000.000 per bulan",
    description:
      "EcoVerde Indonesia mencari Green Building Consultant untuk mendampingi klien dalam perencanaan bangunan hijau, penilaian sertifikasi, dan efisiensi energi gedung.",
  },
  3: {
    ...COMMON,
    id: "3",
    title: "Environmental Analyst",
    company: "Yayasan Bumi Kita",
    city: "Bandung",
    workMode: "On-site",
    address: "Bandung, Jawa Barat",
    sector: "Konservasi",
    isOpen: false,
    matchPercent: 82,
    salary: "Rp 7.000.000 - Rp 9.000.000 per bulan",
    description:
      "Yayasan Bumi Kita mencari Environmental Analyst untuk menganalisis data lingkungan, memantau program konservasi, dan menyusun rekomendasi kebijakan berbasis data.",
  },
};

/**
 * Ambil detail lowongan. Id yang belum punya data mock memakai data lowongan 1
 * (sementara, sampai back-end tersedia).
 * @param {string} id
 * @returns {JobDetail}
 */
export function getJobDetail(id) {
  return MOCK_JOB_DETAILS[id] ?? MOCK_JOB_DETAILS[1];
}

/** Jumlah keterampilan yang belum terpenuhi. @param {SkillItem[]} skills */
export function countMissingSkills(skills) {
  return skills.filter((s) => s.status !== "terpenuhi").length;
}
