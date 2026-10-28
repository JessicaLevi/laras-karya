"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

// Menu navbar publik (landing, Perusahaan, dan halaman publik lain).
export const PUBLIC_NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/about" },
  { label: "Karier Hijau", href: "/jobs" },
  { label: "Perusahaan", href: "/employer" },
];

// Logo yang sama dengan navbar global (public/logo-laras-karya.png)
export function Logo({ light = false }) {
  return (
    <Link href="/" aria-label="Laras Karya, ke Beranda" className="flex min-h-11 items-center">
      <Image
        src="/logo-laras-karya.png"
        alt="Laras Karya"
        width={462}
        height={138}
        priority
        // Di latar hijau gelap (footer), logo dibuat putih.
        className={`h-12 w-auto ${light ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}

/**
 * active = href menu yang sedang dibuka (opsional, jika tidak diisi akan otomatis membaca URL via usePathname).
 */
export default function Navbar({ active }) {
  const pathname = usePathname();
  const currentPath = active || pathname || "/";

  const isItemActive = (href) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath === href || currentPath.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6 xl:px-8">
        <Logo />
        <nav aria-label="Navigasi publik" className="flex h-16 items-center gap-4 text-sm font-medium sm:gap-6">
          {PUBLIC_NAV_ITEMS.map(({ label, href }) => {
            const activeMatch = isItemActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={activeMatch ? "page" : undefined}
                className={cn(
                  "hidden h-16 -mb-px items-center border-b-2 px-1 text-sm transition-colors md:inline-flex",
                  activeMatch
                    ? "border-brand font-bold text-brand"
                    : "border-transparent text-slate-800 hover:border-slate-300 hover:text-brand"
                )}
              >
                {label}
              </Link>
            );
          })}
          <Link href="/login" className="px-2 text-brand hover:underline md:ml-3">
            Masuk
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-brand px-5 py-2.5 text-white transition hover:bg-brand/90"
          >
            Daftar Gratis
          </Link>
        </nav>
      </div>
    </header>
  );
}
