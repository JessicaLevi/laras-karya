// Pilihan yang dipakai bersama oleh halaman dan Server Action admin (file "use server" tidak boleh mengekspor konstanta).

export const JOB_STATUSES = [
  { value: "draft", label: "Draf" },
  { value: "published", label: "Dipublikasi" },
  { value: "closed", label: "Ditutup" },
];

export const EMPLOYMENT_TYPES = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Kontrak" },
  { value: "internship", label: "Magang" },
];

export const WORK_MODES = [
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
];

export const APPLICATION_STATUSES = [
  { value: "diproses", label: "Dilamar" },
  { value: "interview", label: "Interview" },
  { value: "diterima", label: "Diterima" },
  { value: "ditolak", label: "Ditolak" },
];

export const USER_ROLES = [
  { value: "seeker", label: "Pencari kerja" },
  { value: "admin", label: "Admin" },
];
