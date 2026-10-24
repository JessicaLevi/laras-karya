// Data & action untuk halaman Jalur Belajar.
// Saat ini masih mock (dummy). Ganti isi fungsi dengan fetch / Supabase saat backend siap.

const LEARNING_TARGET = {
  position: "Environmental Officer",
  company: "PT Hijau Lestari Energi",
  skillGaps: [
    { skill: "Pengelolaan Limbah B3", status: "Belum dikuasai", tone: "red" },
    { skill: "AMDAL & UKL-UPL", status: "Perlu ditingkatkan", tone: "amber" },
    { skill: "Audit ISO 14001", status: "Perlu ditingkatkan", tone: "amber" },
    { skill: "Pemantauan Kualitas Lingkungan", status: "Sudah baik", tone: "green" },
  ],
};

// Satu bidang (lingkungan), berjenjang: Dasar -> Menengah -> Lanjutan.
// Setiap langkah berisi course milik pihak ketiga (Udemy, Kemnaker, dll).
// Judul & `url` di bawah hanya contoh: ganti dengan link course asli.
const LEARNING_STEPS = [
  {
    n: 1,
    title: "Dasar Pengelolaan Lingkungan",
    description:
      "Pahami regulasi lingkungan hidup dan prinsip dasar pengelolaan limbah B3 di industri.",
    courses: [
      {
        id: "c1",
        provider: "Udemy",
        title: "Pengelolaan Limbah B3 untuk Pemula",
        level: "Beginner",
        format: "Kursus Online",
        duration: "4 minggu",
        skillTag: "Limbah B3",
        popular: true,
        url: "https://www.udemy.com",
      },
      {
        id: "c2",
        provider: "Udemy",
        title: "Dasar Regulasi Lingkungan Hidup di Indonesia",
        level: "Beginner",
        format: "Kursus Online",
        duration: "2 minggu",
        skillTag: "Regulasi",
        popular: false,
        url: "https://www.udemy.com",
      },
    ],
  },
  {
    n: 2,
    title: "Analisis Dampak Lingkungan",
    description:
      "Susun dokumen AMDAL dan UKL-UPL, serta lakukan pemantauan kualitas air dan udara.",
    courses: [
      {
        id: "c3",
        provider: "Kemnaker",
        title: "Penyusunan Dokumen AMDAL & UKL-UPL",
        level: "Intermediate",
        format: "Workshop",
        duration: "3 hari",
        skillTag: "AMDAL",
        popular: false,
        url: "https://kemnaker.go.id",
      },
      {
        id: "c4",
        provider: "Kemnaker",
        title: "Pemantauan Kualitas Air & Udara",
        level: "Intermediate",
        format: "Workshop",
        duration: "2 hari",
        skillTag: "Monitoring",
        popular: false,
        url: "https://kemnaker.go.id",
      },
    ],
  },
  {
    n: 3,
    title: "Auditor Sistem Manajemen Lingkungan",
    description:
      "Jadi auditor internal dan pimpin penerapan ISO 14001 untuk perbaikan kinerja lingkungan perusahaan.",
    courses: [
      {
        id: "c5",
        provider: "Udemy",
        title: "Auditor Internal ISO 14001",
        level: "Advanced",
        format: "Sertifikasi",
        duration: "5 hari",
        skillTag: "ISO 14001",
        popular: false,
        url: "https://www.udemy.com",
      },
      {
        id: "c6",
        provider: "Kemnaker",
        title: "Penanggung Jawab Pengendalian Pencemaran Air",
        level: "Advanced",
        format: "Sertifikasi",
        duration: "3 minggu",
        skillTag: "PPPA",
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