import {
  Briefcase,
  CalendarDays,
  GraduationCap,
  FileText,
  UserCheck,
} from "lucide-react";
import { JOBS } from "@/lib/mock-jobs";
import { getOpenJobsAppliedLast } from "@/lib/job-ordering";
import {
  MOCK_APPLICATIONS,
  MOCK_PROFILE_COMPLETENESS,
  hasApplied,
} from "@/lib/applications-data";

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
 * @property {string} [href]
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
 * @property {string|null} [benefit]
 * @property {string[]} [skills]
 *
 * @typedef {Object} CourseItem
 * @property {string} id
 * @property {string} provider
 * @property {string} title
 * @property {"Beginner"|"Intermediate"|"Advanced"} level
 * @property {string} duration
 * @property {string} mode
 * @property {string} [image]
 * @property {boolean} [isPopular]
 * @property {boolean} [isPrimary]
 */

// Sumber tunggal: daftar di /recommended-jobs. Hanya lowongan yang masih dibuka.
const OPEN_JOBS = getOpenJobsAppliedLast(JOBS);
const MATCHED_JOBS = OPEN_JOBS.length;

const NOT_APPLIED_JOBS = OPEN_JOBS.filter((j) => !hasApplied(j.id)).length;

/** @type {{ firstName: string, profileCompleteness: number, matchedJobs: number, notAppliedJobs: number }} */
export const HOME_USER = {
  firstName: "Aisyah",
  profileCompleteness: MOCK_PROFILE_COMPLETENESS,
  matchedJobs: MATCHED_JOBS,
  notAppliedJobs: NOT_APPLIED_JOBS,
};

/** @type {JobItem[]} */
export const MOCK_JOBS = OPEN_JOBS.slice(0, 3).map((j) => {
  const firstBenefit = j.benefits?.[0];
  return {
    id: String(j.id),
    title: j.title,
    company: j.company,
    sector: j.sector,
    matchPercent: j.match,
    workMode: j.mode === "Remote" ? "Remote" : `${j.mode} • ${j.city}`,
    salary: j.salary.replace("–", " - ").replace("/bulan", "/bln"),
    isOpen: true,
    skills: (j.skills ?? []).slice(0, 2),
    // Data mock menulis fasilitas dengan huruf kecil, jadi diawali huruf besar di sini.
    benefit: firstBenefit
      ? firstBenefit.charAt(0).toUpperCase() + firstBenefit.slice(1)
      : null,
  };
});

/** @type {CourseItem[]} */
export const MOCK_COURSES = [
  {
    // Dibuat utama karena sama dengan rekomendasi di HOME_ALERT.
    id: "c2",
    provider: "IDCAMP Sustainability",
    title: "Pelaporan ESG untuk Profesional",
    level: "Intermediate",
    duration: "8 minggu",
    mode: "Online",
    focusSkill: "Pelaporan ESG",
    image: "/images/courses/course-esg-reporting.jpg",
    isPrimary: true,
  },
  {
    id: "c1",
    provider: "Green Academy",
    title: "Dasar-Dasar Green Building & LEED",
    level: "Beginner",
    duration: "6 minggu",
    mode: "Online",
    focusSkill: "Sertifikasi LEED",
    image: "/images/courses/course-green-building.jpg",
  },
  {
    id: "c3",
    provider: "EcoSkills Academy",
    title: "Manajemen Proyek Keberlanjutan",
    level: "Intermediate",
    duration: "10 minggu",
    mode: "Hybrid",
    focusSkill: "Manajemen Proyek",
    image: "/images/courses/course-sustainable-pm.jpg",
    isPopular: true,
  },
];

// Diletakkan setelah MOCK_COURSES karena memakai MOCK_COURSES.length.
/** @type {StatItem[]} */
export const HOME_STATS = [
  {
    id: "interview",
    label: "Interview",
    value: MOCK_APPLICATIONS.filter((a) => a.status === "interview").length,
    icon: CalendarDays,
    tone: "green",
    href: "/applications",
  },
  {
    id: "profile",
    label: "Kelengkapan Profil",
    value: `${MOCK_PROFILE_COMPLETENESS}%`,
    icon: UserCheck,
    tone: "green",
    iconTone: "pink",
    href: "/profile",
  },
  {
    id: "training",
    label: "Pelatihan Disarankan",
    value: MOCK_COURSES.length,
    icon: GraduationCap,
    tone: "orange",
    href: "/learning-path",
  },
  {
    id: "applications",
    label: "Total Lamaran",
    value: MOCK_APPLICATIONS.length,
    icon: FileText,
    tone: "lime",
    href: "/applications",
  },
];

export const HOME_ALERT = {
  skill: "Pelaporan ESG",
  targetMatch: "98%",
};
