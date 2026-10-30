// Data contoh untuk tahap front-end. Nanti diganti data dari Supabase (profiles, trainings, dst.).

export const LEARNING_TARGET = {
  position: "Sustainability Officer",
  company: "PT Hijau Lestari — Energi Terbarukan",
  skillGaps: [
    { skill: "LEED Certification", status: "Belum dimiliki", tone: "red" },
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
    skillTag: "LEED Certification",
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
    skillTag: "LEED Certification",
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

// Satu sumber: lib/profile-data.js (dulu ada salinan identik di sini).
export { PROFILE } from "@/lib/profile-data";
