import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

/**
 * Type definition via JSDoc (repo ini JavaScript, VS Code tetap memberi autocomplete).
 *
 * @typedef {"diproses"|"interview"|"diterima"|"ditolak"} ApplicationStatus
 *
 * @typedef {Object} Application
 * @property {string} id
 * @property {string} jobId        id lowongan, untuk tautan ke /jobs/[id]
 * @property {string} title
 * @property {string} company
 * @property {string} sector
 * @property {string} appliedAt    format ISO "YYYY-MM-DD"
 * @property {ApplicationStatus} status
 *
 * @typedef {{ type: "badge", label: string, tone: "green"|"ai" } | { type: "link", label: string, href: string }} ChecklistAction
 *
 * @typedef {Object} DocumentChecklistItem
 * @property {string} id
 * @property {string} label
 * @property {"done"|"warning"} state
 * @property {ChecklistAction} action
 *
 * @typedef {Object} StatCardConfig
 * @property {string} id
 * @property {string} label
 * @property {import("lucide-react").LucideIcon} icon
 * @property {"green"|"blue"|"purple"|"red"|"emerald"} tone
 * @property {ApplicationStatus|null} status   null = total semua lamaran
 *
 * @typedef {Object} FilterOption
 * @property {ApplicationStatus|"semua"} value
 * @property {string} label
 */

/* ========== Konfigurasi status ========== */
/** @type {Record<ApplicationStatus, { label: string, icon: import("lucide-react").LucideIcon }>} */
export const STATUS_CONFIG = {
  diproses: { label: "Diproses", icon: Clock },
  interview: { label: "Interview", icon: CalendarDays },
  diterima: { label: "Diterima", icon: CheckCircle2 },
  ditolak: { label: "Ditolak", icon: XCircle },
};

/**
 * Kartu statistik F05. `status: null` = total. Jumlah dihitung dari MOCK_APPLICATIONS.
 * @type {StatCardConfig[]}
 */
export const STAT_CARDS = [
  {
    id: "total",
    label: "Total Lamaran",
    icon: Briefcase,
    tone: "green",
    status: null,
  },
  {
    id: "diproses",
    label: "Dilamar / Diproses",
    icon: Clock,
    tone: "blue",
    status: "diproses",
  },
  {
    id: "interview",
    label: "Interview",
    icon: CalendarDays,
    tone: "purple",
    status: "interview",
  },
  {
    id: "ditolak",
    label: "Ditolak",
    icon: XCircle,
    tone: "red",
    status: "ditolak",
  },
  {
    id: "diterima",
    label: "Diterima",
    icon: CheckCircle2,
    tone: "emerald",
    status: "diterima",
  },
];

/** @type {FilterOption[]} */
export const FILTER_OPTIONS = [
  { value: "semua", label: "Semua Status" },
  { value: "diproses", label: "Diproses" },
  { value: "interview", label: "Interview" },
  { value: "diterima", label: "Diterima" },
  { value: "ditolak", label: "Ditolak" },
];

/* ========== Mock data (nanti diganti query Supabase) ========== */
/**
 * jobId 1–3 cocok dengan lowongan di lib/mock-jobs.js.
 * jobId 13–15 cocok dengan lowongan di lib/mock-saved-jobs.js.
 * jobId 16–21 sengaja di luar daftar lowongan yang ada, supaya label
 * "Sudah Dilamar" tidak muncul di semua kartu.
 * @type {Application[]}
 */
export const MOCK_APPLICATIONS = [
  {
    id: "a1",
    jobId: "1",
    title: "Sustainability Officer",
    company: "PT Hijau Lestari",
    sector: "Energi Terbarukan",
    appliedAt: "2026-09-15",
    status: "diproses",
  },
  {
    id: "a2",
    jobId: "2",
    title: "Green Building Consultant",
    company: "EcoVerde Indonesia",
    sector: "Bangunan Hijau",
    appliedAt: "2026-09-12",
    status: "interview",
  },
  {
    id: "a3",
    jobId: "3",
    title: "Environmental Analyst",
    company: "Yayasan Bumi Kita",
    sector: "Konservasi",
    appliedAt: "2026-09-10",
    status: "interview",
  },
  {
    id: "a4",
    jobId: "13",
    title: "Waste Management Specialist",
    company: "PT Daur Hijau",
    sector: "Pengelolaan Limbah",
    appliedAt: "2026-09-08",
    status: "diterima",
  },
  {
    id: "a5",
    jobId: "15",
    title: "Carbon Accounting Analyst",
    company: "GreenMetrics Co.",
    sector: "Emisi Karbon",
    appliedAt: "2026-09-05",
    status: "ditolak",
  },
  {
    id: "a6",
    jobId: "14",
    title: "Agroforestry Field Coordinator",
    company: "Lembaga Tani Lestari",
    sector: "Pertanian",
    appliedAt: "2026-09-01",
    status: "ditolak",
  },
  {
    id: "a7",
    jobId: "16",
    title: "Solar Project Coordinator",
    company: "PT Surya Nusantara",
    sector: "Energi Terbarukan",
    appliedAt: "2026-08-28",
    status: "diproses",
  },
  {
    id: "a8",
    jobId: "17",
    title: "ESG Reporting Analyst",
    company: "Mitra Berkelanjutan",
    sector: "Emisi Karbon",
    appliedAt: "2026-08-25",
    status: "diproses",
  },
  {
    id: "a9",
    jobId: "18",
    title: "Marine Conservation Officer",
    company: "Yayasan Laut Lestari",
    sector: "Konservasi",
    appliedAt: "2026-08-20",
    status: "diproses",
  },
  {
    id: "a10",
    jobId: "19",
    title: "Recycling Operations Lead",
    company: "PT Kita Daur Ulang",
    sector: "Pengelolaan Limbah",
    appliedAt: "2026-08-15",
    status: "interview",
  },
  {
    id: "a11",
    jobId: "20",
    title: "Urban Farming Specialist",
    company: "Kebun Kota Indonesia",
    sector: "Pertanian",
    appliedAt: "2026-08-10",
    status: "diproses",
  },
  {
    id: "a12",
    jobId: "21",
    title: "Energy Efficiency Auditor",
    company: "PT Hemat Daya",
    sector: "Bangunan Hijau",
    appliedAt: "2026-08-05",
    status: "diterima",
  },
];

const APPLIED_JOB_IDS = new Set(MOCK_APPLICATIONS.map((a) => String(a.jobId)));

/**
 * Apakah user sudah melamar lowongan ini?
 * @param {string|number} jobId
 * @returns {boolean}
 */
export function hasApplied(jobId) {
  return APPLIED_JOB_IDS.has(String(jobId));
}

/** @type {DocumentChecklistItem[]} */
export const MOCK_DOCUMENT_CHECKLIST = [
  {
    id: "cv",
    label: "Data CV diambil dari profil Anda",
    state: "done",
    action: { type: "badge", label: "Terhubung otomatis", tone: "green" },
  },
  {
    id: "cover-letter",
    label: "Surat Lamaran tersedia",
    state: "done",
    action: { type: "badge", label: "Template AI", tone: "ai" },
  },
  {
    id: "portfolio",
    label: "Portfolio diperlukan untuk lowongan ini",
    state: "warning",
    action: { type: "link", label: "Unggah", href: "/applications/prepare" },
  },
];

export const MOCK_PROFILE_COMPLETENESS = 85;

/* ========== Helper ========== */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

/**
 * "2026-09-15" → "15 Sep 2026"
 * @param {string} iso tanggal format YYYY-MM-DD
 * @returns {string}
 */
export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
