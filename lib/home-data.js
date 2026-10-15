import { Briefcase, Circle, FileText, Star } from "lucide-react";

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

/** @type {{ firstName: string, profileCompleteness: number, matchedJobs: number }} */
export const HOME_USER = { firstName: "Aisyah", profileCompleteness: 85, matchedJobs: 12 };

/** @type {StatItem[]} */
export const HOME_STATS = [
  { id: "jobs", label: "Lowongan Cocok", value: 12, icon: Briefcase, tone: "green" },
  { id: "match", label: "Kecocokan Profil", value: "85%", icon: Star, tone: "green", iconTone: "pink" },
  { id: "training", label: "Pelatihan Aktif", value: 3, icon: Circle, tone: "orange", iconClassName: "fill-current" },
  { id: "applications", label: "Lamaran Dicatat", value: 12, icon: FileText, tone: "lime" },
];

/** @type {JobItem[]} */
export const MOCK_JOBS = [
  { id: "1", title: "Sustainability Officer", company: "PT Hijau Lestari", sector: "Energi Terbarukan", matchPercent: 95, workMode: "Hybrid • Jakarta", salary: "Rp 10 - 12 juta/bln", isOpen: true },
  { id: "2", title: "Green Building Consultant", company: "EcoVerde Indonesia", sector: "Bangunan Hijau", matchPercent: 89, workMode: "Remote", salary: "Rp 8 - 11 juta/bln", isOpen: true },
  { id: "3", title: "Environmental Analyst", company: "Yayasan Bumi Kita", sector: "Konservasi", matchPercent: 82, workMode: "On-site • Bandung", salary: "Rp 7 - 9 juta/bln", isOpen: false },
];

/** @type {CourseItem[]} */
export const MOCK_COURSES = [
  { id: "c1", provider: "Green Academy", title: "Dasar-Dasar Green Building & LEED", level: "Beginner", duration: "6 minggu", mode: "Online", focusSkill: "Sertifikasi LEED", isPrimary: true },
  { id: "c2", provider: "IDCAMP Sustainability", title: "Pelaporan ESG untuk Profesional", level: "Intermediate", duration: "8 minggu", mode: "Online", focusSkill: "Pelaporan ESG" },
  { id: "c3", provider: "EcoSkills Academy", title: "Manajemen Proyek Keberlanjutan", level: "Intermediate", duration: "10 minggu", mode: "Hybrid", focusSkill: "Manajemen Proyek", isPopular: true },
];

export const HOME_ALERT = {
  skill: "Sertifikasi LEED",
  targetMatch: "95%+",
};
