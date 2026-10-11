"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, ClipboardList, GraduationCap, Home, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Beranda", href: "/home", icon: Home },
  { label: "Lowongan", href: "/jobs", icon: Briefcase },
  { label: "Pelatihan", href: "/learning-path", icon: GraduationCap },
  { label: "Lamaran", href: "/applications", icon: ClipboardList },
];

// Mock pengguna (nanti dari Supabase Auth + profiles)
const MOCK_USER = { name: "Aisyah Putri", initials: "AP" };

/**
 * Tampilan navbar (tanpa hook URL). Dipakai oleh versi final dan oleh fallback Suspense.
 * @param {{ user: { name: string, initials: string }, pathname: string, open: boolean, onToggle: () => void }} props
 */
function NavbarView({ user, pathname, open, onToggle }) {
  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6 xl:px-8"
      >
        <Link href="/home" className="flex min-h-11 items-center" aria-label="Laras Karya, ke Beranda">
          <Image src="/logo-laras-karya.png" alt="Laras Karya" width={462} height={138} priority className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <ul className="hidden items-center gap-1 md:flex xl:gap-4">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center border-b-2 px-2.5 text-sm transition-colors xl:px-3",
                    isActive(href)
                      ? "border-brand font-bold text-brand"
                      : "border-transparent font-medium text-ink/80 hover:text-brand"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/profile"
            aria-label={`Profil ${user.name}`}
            className="grid size-9 place-items-center rounded-full bg-brand-light text-xs font-bold text-brand"
          >
            {user.initials}
          </Link>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg text-ink md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={onToggle}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="menu-mobile" className="border-t border-line bg-white px-4 py-2 md:hidden">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm",
                  isActive(href) ? "bg-brand-light font-bold text-brand" : "font-medium text-ink/80"
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

/** Bagian yang membaca URL (usePathname). Harus berada di dalam <Suspense>. */
function NavbarContent({ user }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return <NavbarView user={user} pathname={pathname} open={open} onToggle={() => setOpen((v) => !v)} />;
}

/**
 * ≥1280 desktop · 768–1279 tablet (lebih rapat) · <768 hamburger (belum didesain di Figma)
 * Dibungkus Suspense karena Next.js 16 (Cache Components) mewajibkannya untuk usePathname().
 * Fallback = navbar yang sama tanpa penanda menu aktif, jadi tidak ada loncatan tampilan.
 * @param {{ user?: { name: string, initials: string } }} props
 */
export function Navbar({ user = MOCK_USER }) {
  return (
    <Suspense fallback={<NavbarView user={user} pathname="" open={false} onToggle={() => {}} />}>
      <NavbarContent user={user} />
    </Suspense>
  );
}
