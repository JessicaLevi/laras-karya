import { toCareerLabel } from "@/lib/career-label";

/**
 * Jawaban asesmen langkah 1 untuk tokoh contoh. Dipakai dua tempat: label status di bawah
 * dan tombol "Isi data contoh" di asesmen (lib/demo-persona.js), jadi keduanya selalu sama.
 */
export const PROFILE_CAREER = { career_situation: "switch_or_return", career_break: "no" };

export const PROFILE = {
  name: "Aisyah Putri Ramadhani",
  initials: "AP",
  headline: "Environmental Coordinator",
  status: toCareerLabel(PROFILE_CAREER.career_situation, PROFILE_CAREER.career_break),
  completeness: 85,
  contact: {
    email: "aisyah.putri@email.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    linkedin: "linkedin.com/in/aisyahputri",
  },
  experiences: [
    {
      id: "exp-1",
      role: "Environmental Coordinator",
      company: "PT EcoSolutions",
      period: "Jan 2022 — Sekarang (2 tahun)",
      description: "Mengelola program keberlanjutan perusahaan, audit ESG internal, dan koordinasi proyek lingkungan.",
    },
    {
      id: "exp-2",
      role: "Junior Sustainability Analyst",
      company: "Green Consulting Indonesia",
      period: "Mar 2020 — Des 2021 (1 tahun 10 bulan)",
      description: "Analisis data lingkungan dan pendampingan audit ESG untuk klien korporat.",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "S1 Ilmu Lingkungan",
      school: "Universitas Indonesia",
      period: "2016 — 2020",
      gpa: "IPK: 3.72 / 4.00",
    },
  ],
  certifications: [
    { id: "cert-1", name: "Environmental Management System (ISO 14001)", issuer: "BSI Group", year: "2023" },
    { id: "cert-2", name: "TOEFL ITP", issuer: "ETS", year: "2021" },
  ],
  skills: [
    { id: "s1", label: "Analisis Data", highlight: true },
    { id: "s2", label: "Koordinasi Proyek", highlight: true },
    { id: "s3", label: "Pengelolaan Limbah", highlight: true },
    { id: "s4", label: "ESG Audit", highlight: true },
    { id: "s5", label: "Microsoft Excel", highlight: false },
    { id: "s6", label: "Presentasi", highlight: false },
    { id: "s7", label: "Manajemen Tim", highlight: false },
  ],
  languages: [
    { id: "l1", name: "Bahasa Indonesia", level: "Native", tone: "brand", percent: 100 },
    { id: "l2", name: "Bahasa Inggris", level: "Profesional", tone: "blue", percent: 80 },
    { id: "l3", name: "Bahasa Jepang", level: "Dasar", tone: "amber", percent: 30 },
  ],
};
