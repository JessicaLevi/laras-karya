import { Briefcase, ClipboardList, GraduationCap, Home } from "lucide-react";

/**
 * Menu utama, disesuaikan dengan rute yang sudah ada di repo.
 * Label tampilan tetap Bahasa Indonesia (sesuai Figma).
 */
export const NAV_ITEMS = [
  { label: "Beranda", href: "/home", icon: Home },
  { label: "Lowongan", href: "/jobs", icon: Briefcase },
  { label: "Pelatihan", href: "/learning-path", icon: GraduationCap },
  { label: "Lamaran", href: "/applications", icon: ClipboardList },
];

/** Navbar tidak ditampilkan di rute ini (landing, auth, asesmen, employer). */
export const NAVBAR_HIDDEN_ROUTES = ["/", "/login", "/register", "/assessment", "/employer"];

/** Mock pengguna (nanti dari Supabase Auth + tabel profiles). */
export const MOCK_USER = { name: "Aisyah Putri", initials: "AP" };
