// Data & action untuk halaman Jalur Belajar.
// Saat ini masih mock (dummy). Ganti isi fungsi dengan fetch / Supabase saat backend siap.

// Target = lowongan demo "Sustainability Officer, PT Hijau Lestari" (lib/mock-jobs.js, id 1), supaya
// ceritanya nyambung dengan halaman rekomendasi. Skill gap sama dengan gap lowongan itu:
// Pelaporan ESG dan Regulasi Keberlanjutan belum dikuasai; Analisis Data dan Koordinasi Proyek sudah.
// Kalau kedua skill gap terpenuhi, skor kecocokan lowongan ini naik dari 83 ke 95.
const LEARNING_TARGET = {
  position: "Sustainability Officer",
  company: "PT Hijau Lestari",
  skillGaps: [
    { skill: "Pelaporan ESG", status: "Belum dikuasai", tone: "red" },
    { skill: "Regulasi Keberlanjutan", status: "Belum dikuasai", tone: "red" },
    { skill: "Analisis Data", status: "Sudah baik", tone: "green" },
    { skill: "Koordinasi Proyek", status: "Sudah baik", tone: "green" },
  ],
};

// Satu bidang (keberlanjutan), berjenjang: Dasar -> Menengah -> Lanjutan.
// Setiap langkah berisi course milik pihak ketiga (Udemy, Kemnaker, dll).
// Judul & `url` di bawah hanya contoh: ganti dengan link course asli.
const LEARNING_STEPS = [
  {
    n: 1,
    title: "Dasar Keberlanjutan & Regulasi",
    description:
      "Pahami kerangka ESG dan regulasi keberlanjutan yang berlaku di Indonesia.",
    courses: [
      {
        id: "c1",
        provider: "Udemy",
        title: "Pengantar ESG dan Keberlanjutan untuk Pemula",
        level: "Beginner",
        format: "Kursus Online",
        duration: "4 minggu",
        skillTag: "Pelaporan ESG",
        popular: true,
        url: "https://www.udemy.com",
      },
      {
        id: "c2",
        provider: "Udemy",
        title: "Dasar Regulasi Keberlanjutan di Indonesia",
        level: "Beginner",
        format: "Kursus Online",
        duration: "2 minggu",
        skillTag: "Regulasi Keberlanjutan",
        popular: false,
        url: "https://www.udemy.com",
      },
    ],
  },
  {
    n: 2,
    title: "Pelaporan Keberlanjutan",
    description:
      "Susun laporan keberlanjutan dengan standar GRI dan pantau kepatuhan terhadap regulasi.",
    courses: [
      {
        id: "c3",
        provider: "Kemnaker",
        title: "Penyusunan Laporan Keberlanjutan (GRI Standards)",
        level: "Intermediate",
        format: "Workshop",
        duration: "3 hari",
        skillTag: "Pelaporan ESG",
        popular: false,
        url: "https://kemnaker.go.id",
      },
      {
        id: "c4",
        provider: "Kemnaker",
        title: "Pemantauan Kepatuhan Regulasi Keberlanjutan",
        level: "Intermediate",
        format: "Workshop",
        duration: "2 hari",
        skillTag: "Regulasi Keberlanjutan",
        popular: false,
        url: "https://kemnaker.go.id",
      },
    ],
  },
  {
    n: 3,
    title: "Sertifikasi Profesional",
    description:
      "Perkuat kompetensi dengan sertifikasi pelaporan dan kepatuhan yang diakui industri.",
    courses: [
      {
        id: "c5",
        provider: "Udemy",
        title: "Sertifikasi Profesional Pelaporan ESG",
        level: "Advanced",
        format: "Sertifikasi",
        duration: "5 hari",
        skillTag: "Pelaporan ESG",
        popular: false,
        url: "https://www.udemy.com",
      },
      {
        id: "c6",
        provider: "Kemnaker",
        title: "Kepatuhan Regulasi Keberlanjutan untuk Perusahaan",
        level: "Advanced",
        format: "Sertifikasi",
        duration: "3 minggu",
        skillTag: "Regulasi Keberlanjutan",
        popular: false,
        url: "https://kemnaker.go.id",
      },
    ],
  },
];

// Course yang sudah dimulai user (klik "Daftar" lalu pindah ke situs provider).
// Mock: disimpan di memori (hilang saat refresh). Nanti ganti dengan tabel enrollments.
let startedIds = [];

// Course yang ditandai user "Sudah Selesai Diikuti".
// Mock: disimpan di memori. Nanti ganti dengan kolom status di tabel enrollments.
let completedIds = [];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Status tiap course milik user: { [courseId]: { status: "enrolled" | "completed" } }
 * - enrolled  : user sudah klik daftar / mulai di situs provider
 * - completed : user menekan "Sudah Selesai Diikuti" (menimpa "enrolled")
 * Course yang tidak ada di objek ini = belum dimulai.
 */
function buildProgress() {
  const progress = {};

  startedIds.forEach((id) => {
    progress[id] = { status: "enrolled" };
  });

  completedIds.forEach((id) => {
    progress[id] = { status: "completed" };
  });

  return progress;
}

/** Ambil target posisi, langkah + course, dan status course milik user. */
export async function getLearningPath() {
  await wait(600);

  return {
    target: LEARNING_TARGET,
    steps: LEARNING_STEPS,
    progress: buildProgress(),
  };
}

/** Catat bahwa user mulai mengikuti course (status "Sedang diikuti"). */
export async function startCourse(id) {
  await wait(300);

  if (!startedIds.includes(id)) {
    startedIds = [...startedIds, id];
  }

  return { id, status: "enrolled" };
}
/** Tandai course selesai ("Sudah Selesai Diikuti"). */
export async function completeCourse(id) {
  await wait(300);

  if (!completedIds.includes(id)) {
    completedIds = [...completedIds, id];
  }

  return { id, status: "completed" };
}