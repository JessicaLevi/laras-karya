import { Briefcase, ClipboardList, GraduationCap, Home } from "lucide-react";

import { PROFILE } from "@/lib/profile-data";

/**
 * Menu utama, disesuaikan dengan rute yang sudah ada di repo.
 * Label tampilan tetap Bahasa Indonesia (sesuai Figma).
 *
 * activeFor (opsional): daftar rute yang membuat menu ini tampil aktif.
 * Kalau tidak diisi, hanya href-nya sendiri yang dihitung.
 */
export const NAV_ITEMS = [
  { label: "Beranda", href: "/home", icon: Home },
  { label: "Lowongan", href: "/recommended-jobs", icon: Briefcase, activeFor: ["/recommended-jobs", "/bookmarks"] },
  { label: "Pelatihan", href: "/learning-path", icon: GraduationCap },
  { label: "Lamaran", href: "/applications", icon: ClipboardList },
];

/** Dipakai navbar untuk menentukan menu mana yang aktif di rute sekarang. */
export function isNavItemActive(item, pathname) {
  return (item.activeFor ?? [item.href]).some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

/** Navbar tidak ditampilkan di rute ini (landing, auth, asesmen, employer, about, dll). */
export const NAVBAR_HIDDEN_ROUTES = [
  "/",
  "/about",
  "/login",
  "/register",
  "/assessment",
  "/employer",
  "/jobs",
  "/privacy",
  "/terms",
];

/** Mock pengguna (nanti dari Supabase Auth + tabel profiles). Nama diambil dari PROFILE agar sama di semua halaman. */
export const MOCK_USER = { name: PROFILE.name, initials: PROFILE.initials };
