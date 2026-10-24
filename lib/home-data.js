import { Briefcase, Circle, FileText, Star } from "lucide-react";
import { JOBS } from "@/lib/mock-jobs";
import { getOpenJobsAppliedLast } from "@/lib/job-ordering";

/**
 * Type definition via JSDoc (repo ini JavaScript, VS Code tetap memberi autocomplete).
 * @typedef {Object} StatItem
 * @property {string} id
 * @property {string} label
 * @property {number|string} value
 * @property {import("lucide-react").LucideIcon} icon
 * @property {string} tone
 * @property {string} [iconTone]
 * @property {string} [iconClassName]
 *
 * @typedef {Object} JobItem
 * @property {string} id
 * @property {string} title
 * @property {string} company
 * @property {string} sector
 * @property {number} matchPercent
 * @property {string} workMode
 * @property {string} salary
 * @property {boolean} isOpen
 *
 * @typedef {Object} CourseItem
 * @property {string} id
 * @property {string} provider
 * @property {string} title
 * @property {"Beginner"|"Intermediate"|"Advanced"} level
 * @property {string} duration
 * @property {string} mode
 * @property {string} focusSkill
 * @property {boolean} [isPopular]
 * @property {boolean} [isPrimary]
 */

// Sumber tunggal: daftar di /recommended-jobs. Hanya lowongan yang masih dibuka.
const OPEN_JOBS = getOpenJobsAppliedLast(JOBS);
const MATCHED_JOBS = OPEN_JOBS.length;

/** @type {{ firstName: string, profileCompleteness: number, matchedJobs: number }} */
export const HOME_USER = {
  firstName: "Aisyah",
  profileCompleteness: 85,
  matchedJobs: MATCHED_JOBS,
};

/** @type {StatItem[]} */
export const HOME_STATS = [
  {
    id: "jobs",
    label: "Lowongan Cocok",
    value: MATCHED_JOBS,
    icon: Briefcase,
    tone: "green",
  },
  {
    id: "match",
    label: "Kecocokan Profil",
    value: "85%",
    icon: Star,
    tone: "green",
    iconTone: "pink",
  },
  {
    id: "training",
    label: "Pelatihan Aktif",
    value: 3,
    icon: Circle,
    tone: "orange",
    iconClassName: "fill-current",
  },
  {
    id: "applications",
    label: "Lamaran Dicatat",
    value: 12,
    icon: FileText,
    tone: "lime",
  },
];

/** @type {JobItem[]} */
export const MOCK_JOBS = OPEN_JOBS.slice(0, 3).map((j) => ({
  id: String(j.id),
  title: j.title,
  company: j.company,
  sector: j.sector,
  matchPercent: j.match,
  workMode: j.mode === "Remote" ? "Remote" : `${j.mode} • ${j.city}`,
  salary: j.salary.replace("–", " - ").replace("/bulan", "/bln"),
  isOpen: true,
}));

/** @type {CourseItem[]} */
export const MOCK_COURSES = [
  {
    id: "c1",
    provider: "Green Academy",
    title: "Dasar-Dasar Green Building & LEED",
    level: "Beginner",
    duration: "6 minggu",
    mode: "Online",
    focusSkill: "Sertifikasi LEED",
    isPrimary: true,
  },
  {
    id: "c2",
    provider: "IDCAMP Sustainability",
    title: "Pelaporan ESG untuk Profesional",
    level: "Intermediate",
    duration: "8 minggu",
    mode: "Online",
    focusSkill: "Pelaporan ESG",
  },
  {
    id: "c3",
    provider: "EcoSkills Academy",
    title: "Manajemen Proyek Keberlanjutan",
    level: "Intermediate",
    duration: "10 minggu",
    mode: "Hybrid",
    focusSkill: "Manajemen Proyek",
    isPopular: true,
  },
];

export const HOME_ALERT = {
  skill: "Pelaporan ESG",
  targetMatch: "98%",
};
