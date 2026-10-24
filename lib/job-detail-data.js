import { JOBS } from "./mock-jobs";

/**
 * Type definition via JSDoc (repo ini JavaScript, VS Code tetap memberi autocomplete).
 *
 * @typedef {"dimiliki"|"belum"} SkillStatus
 *
 * @typedef {Object} SkillItem
 * @property {string} id
 * @property {string} name
 * @property {SkillStatus} status   dimiliki = sudah dimiliki · belum = belum dimiliki *
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
  { id: "s1", name: "Pelaporan ESG", status: "belum" },
  { id: "s2", name: "Analisis Data ESG", status: "dimiliki" },
  { id: "s3", name: "Manajemen Proyek Hijau", status: "belum" },
  { id: "s4", name: "Sertifikasi LEED", status: "belum" },
  { id: "s5", name: "Regulasi Keberlanjutan", status: "dimiliki" },
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
  13: {
    ...COMMON,
    id: "13",
    title: "Waste Management Specialist",
    company: "PT Daur Hijau",
    city: "Surabaya",
    workMode: "On-site",
    address: "Surabaya, Jawa Timur",
    sector: "Pengelolaan Limbah",
    isOpen: true,
    matchPercent: 78,
    salary: "Rp 8.000.000 - Rp 10.000.000 per bulan",
    description:
      "PT Daur Hijau mencari Waste Management Specialist untuk mengelola program pengurangan dan daur ulang limbah.",
  },
  14: {
    ...COMMON,
    id: "14",
    title: "Agroforestry Field Coordinator",
    company: "Lembaga Tani Lestari",
    city: "Bogor",
    workMode: "On-site",
    address: "Bogor, Jawa Barat",
    sector: "Pertanian Berkelanjutan",
    isOpen: true,
    matchPercent: 75,
    salary: "Rp 6.000.000 - Rp 8.000.000 per bulan",
    description:
      "Lembaga Tani Lestari mencari Agroforestry Field Coordinator untuk mendampingi petani dalam praktik wanatani.",
  },
  15: {
    ...COMMON,
    id: "15",
    title: "Carbon Accounting Analyst",
    company: "GreenMetrics Co.",
    city: "Seluruh Indonesia",
    workMode: "Remote",
    address: "Jakarta, DKI Jakarta",
    sector: "Emisi Karbon",
    isOpen: false,
    matchPercent: 71,
    salary: "Rp 9.000.000 - Rp 13.000.000 per bulan",
    description:
      "GreenMetrics Co. mencari Carbon Accounting Analyst untuk menghitung dan melaporkan emisi karbon perusahaan klien.",
  },
};

// "Rp 6–8 juta/bulan" → "Rp 6.000.000 - Rp 8.000.000 per bulan"
function formatSalary(text) {
  const m = text.match(/Rp\s*(\d+)\s*[–-]\s*(\d+)\s*juta/);
  return m ? `Rp ${m[1]}.000.000 - Rp ${m[2]}.000.000 per bulan` : text;
}

// Menyusun detail lowongan dari satu entri di lib/mock-jobs.js
function buildDetailFromJob(job) {
  const gapLevel = Object.fromEntries(job.gaps ?? []); // contoh: { AMDAL: "sedang" }
  const ownBenefits = (job.benefits ?? []).map((b, i) => ({
    id: `jb${i}`,
    label: b.charAt(0).toUpperCase() + b.slice(1),
  }));

  return {
    ...COMMON,
    id: String(job.id),
    title: job.title,
    company: job.company,
    city: job.city,
    workMode: job.mode,
    address: job.city,
    sector: job.sector,
    isOpen: job.status === "dibuka",
    matchPercent: job.match,
    salary: formatSalary(job.salary),
    description: job.description,
    requirements: [
      ...job.skills.map((s) => `Menguasai ${s}`),
      "Mampu berkomunikasi dengan baik dalam bahasa Indonesia dan Inggris",
      "Bersedia bekerja sesuai pola kerja yang ditawarkan",
    ],
    benefits: [...ownBenefits, ...BENEFITS],
    skills: job.skills.map((name, i) => ({
      id: `js${i}`,
      name,
      // ada di daftar gaps = belum dimiliki; selain itu sudah dimiliki
      status: gapLevel[name] ? "belum" : "dimiliki",
    })),
  };
}

/**
 * Ambil detail lowongan. Prioritas: data detail yang ditulis manual
 * (MOCK_JOB_DETAILS). Jika tidak ada, susun dari lib/mock-jobs.js.
 * Id yang sama sekali tidak dikenal memakai lowongan 1 (sementara).
 * @param {string} id
 * @returns {JobDetail}
 */
export function getJobDetail(id) {
  if (MOCK_JOB_DETAILS[id]) return MOCK_JOB_DETAILS[id];
  const job = JOBS.find((j) => String(j.id) === String(id));
  return job ? buildDetailFromJob(job) : MOCK_JOB_DETAILS[1];
}

/** Jumlah keterampilan yang belum dimiliki. @param {SkillItem[]} skills */
export function countMissingSkills(skills) {
  return skills.filter((s) => s.status !== "dimiliki").length;
}
