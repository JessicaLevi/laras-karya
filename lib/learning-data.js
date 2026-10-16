// Data contoh untuk tahap front-end. Nanti diganti data dari Supabase (profiles, trainings, dst.).

export const LEARNING_TARGET = {
  position: "Sustainability Officer",
  company: "PT Hijau Lestari — Energi Terbarukan",
  skillGaps: [
    { skill: "Sertifikasi LEED", status: "Belum dimiliki", tone: "red" },
    { skill: "Pelaporan ESG", status: "Perlu pengembangan", tone: "amber" },
    { skill: "Manajemen Proyek Hijau", status: "Perlu peningkatan", tone: "amber" },
  ],
};

export const LEARNING_STEPS = [
  {
    n: 1,
    title: "Dasar Teknis",
    description: "Pelajari dasar-dasar keberlanjutan, ESG, dan prinsip green building.",
    duration: "4–6 minggu",
    state: "active",
    cta: "Mulai dari sini",
  },
  {
    n: 2,
    title: "Sertifikasi Spesifik",
    description: "Dapatkan sertifikasi LEED dan keahlian pelaporan ESG yang diakui industri.",
    duration: "8–12 minggu",
    state: "locked",
    lockedLabel: "Selesaikan Langkah 1",
  },
  {
    n: 3,
    title: "Siap Melamar",
    description: "Profil diperbarui otomatis. Tingkat kecocokan meningkat, siap melamar posisi impian.",
    duration: "Setelah sertifikasi",
    state: "future",
    lockedLabel: "Selesaikan Langkah 2",
    badge: "Kecocokan naik ke 95%+",
  },
];
/** category: "kursus" | "sertifikasi" | "workshop" (dipakai oleh filter) */
export const TRAININGS = [
  {
    id: "green-building-leed",
    provider: "Green Academy",
    title: "Dasar-Dasar Green Building & LEED",
    level: "Beginner",
    format: "Online",
    duration: "6 minggu",
    skillTag: "Sertifikasi LEED",
    category: "kursus",
    cta: "Mulai Belajar",
    primary: true,
  },
  {
    id: "esg-profesional",
    provider: "IDCamp Sustainability",
    title: "Pelaporan ESG untuk Profesional",
    level: "Intermediate",
    format: "Online",
    duration: "8 minggu",
    skillTag: "Pelaporan ESG",
    category: "kursus",
    cta: "Lihat Pelatihan",
  },
  {
    id: "manajemen-proyek",
    provider: "Universitas Hijau Indonesia",
    title: "Manajemen Proyek Keberlanjutan",
    level: "Intermediate",
    format: "Hybrid",
    duration: "10 minggu",
    skillTag: "Manajemen Proyek Hijau",
    category: "kursus",
    cta: "Lihat Pelatihan",
  },
  {
    id: "leed-green-associate",
    provider: "EcoSkills Academy",
    title: "Sertifikasi LEED Green Associate",
    level: "Advanced",
    format: "Online + Ujian",
    duration: "12 minggu",
    skillTag: "Sertifikasi LEED",
    category: "sertifikasi",
    popular: true,
    cta: "Mulai Belajar",
    primary: true,
  },
  {
    id: "analisis-data",
    provider: "Green Skills Institute",
    title: "Analisis Data untuk Keberlanjutan",
    level: "Beginner",
    format: "Online",
    duration: "4 minggu",
    category: "kursus",
    cta: "Lihat Pelatihan",
  },
  {
    id: "audit-lingkungan",
    provider: "Kementerian LHK Academy",
    title: "Workshop Audit Lingkungan",
    level: "Intermediate",
    format: "Offline — Jakarta",
    duration: "3 hari",
    category: "workshop",
    cta: "Lihat Pelatihan",
  },
];

export const TRAINING_FILTERS = [
  { value: "semua", label: "Semua" },
  { value: "sertifikasi", label: "Sertifikasi" },
  { value: "kursus", label: "Kursus Online" },
  { value: "workshop", label: "Workshop" },
];

export const PROFILE = {
  name: "Aisyah Putri Ramadhani",
  initials: "AP",
  headline: "Environmental Coordinator",
  status: "Berpindah karier",
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
      description: "Mengelola program keberlanjutan perusahaan, pelaporan ESG, dan koordinasi proyek lingkungan.",
    },
    {
      id: "exp-2",
      role: "Junior Sustainability Analyst",
      company: "Green Consulting Indonesia",
      period: "Mar 2020 — Des 2021 (1 tahun 10 bulan)",
      description: "Analisis data lingkungan dan penyusunan laporan keberlanjutan untuk klien korporat.",
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
    { id: "cert-2", name: "Sustainability Reporting (GRI Standards)", issuer: "Global Reporting Initiative", year: "2022" },
  ],
  skills: [
    { id: "s1", label: "Analisis Data", highlight: true },
    { id: "s2", label: "Koordinasi Proyek", highlight: true },
    { id: "s3", label: "Pengelolaan Limbah", highlight: true },
    { id: "s4", label: "Pelaporan ESG", highlight: true },
    { id: "s5", label: "Microsoft Excel", highlight: false },
    { id: "s6", label: "Public Speaking", highlight: false },
    { id: "s7", label: "Manajemen Tim", highlight: false },
  ],
  languages: [
    { id: "l1", name: "Bahasa Indonesia", level: "Native", tone: "brand", percent: 100 },
    { id: "l2", name: "Bahasa Inggris", level: "Profesional", tone: "blue", percent: 80 },
    { id: "l3", name: "Bahasa Jepang", level: "Dasar", tone: "amber", percent: 30 },
  ],
};
