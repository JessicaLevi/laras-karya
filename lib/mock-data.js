// Temporary data until the Supabase tables are ready
export const jobs = [
  {
    id: 1,
    title: 'Sustainability Officer',
    company: 'PT Hijau Lestari',
    location: 'Jakarta',
    work_arrangement: 'hybrid',
    salary_min: 10000000,
    salary_max: 12000000,
    status: 'open',
    source: 'Company website',
    updated_at: '2026-09-28',
  },
];

// TEMPEL (merge) ke lib/mock-data.js. Jika nama sudah dipakai, ganti namanya.

/** Statistik F05 (nanti dihitung dari tabel applications). */
export const MOCK_APPLICATION_STATS = [
  { id: "total", label: "Total Lamaran", value: 12, tone: "green", filter: null },
  { id: "diproses", label: "Dilamar / Diproses", value: 5, tone: "blue", filter: "diproses" },
  { id: "interview", label: "Interview", value: 3, tone: "purple", filter: "interview" },
  { id: "ditolak", label: "Ditolak", value: 2, tone: "red", filter: "ditolak" },
  { id: "diterima", label: "Diterima", value: 2, tone: "teal", filter: "diterima" },
];

/** Riwayat lamaran (6 dari 12, seperti di F05). */
export const MOCK_APPLICATIONS = [
  { id: "1", title: "Sustainability Officer", company: "PT Hijau Lestari", field: "Energi Terbarukan", date: "15 Sep 2026", status: "diproses" },
  { id: "2", title: "Green Building Consultant", company: "EcoVerde Indonesia", field: "Bangunan Hijau", date: "12 Sep 2026", status: "interview" },
  { id: "3", title: "Environmental Analyst", company: "Yayasan Bumi Kita", field: "Konservasi", date: "10 Sep 2026", status: "interview" },
  { id: "4", title: "Waste Management Specialist", company: "PT Daur Hijau", field: "Pengelolaan Limbah", date: "8 Sep 2026", status: "diterima" },
  { id: "5", title: "Carbon Accounting Analyst", company: "GreenMetrics Co.", field: "Emisi Karbon", date: "5 Sep 2026", status: "ditolak" },
  { id: "6", title: "Agroforestry Field Coordinator", company: "Lembaga Tani Lestari", field: "Pertanian", date: "1 Sep 2026", status: "ditolak" },
];
