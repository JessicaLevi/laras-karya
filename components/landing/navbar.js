import Image from "next/image";
import Link from "next/link";

// Menu navbar publik (landing, Employer, dan halaman publik lain).
export const PUBLIC_NAV_ITEMS = [
  { label: "Tentang", href: "/#tentang" },
  { label: "Karier Hijau", href: "/recommended_jobs" },
  { label: "Employer", href: "/employer" },
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
 * active = href menu yang sedang dibuka, mis. <Navbar active="/employer" />
 */
export default function Navbar({ active }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6 xl:px-8">
        <Logo />
        <nav aria-label="Navigasi publik" className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          {PUBLIC_NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={active === href ? "page" : undefined}
              className={`hidden md:inline ${active === href ? "font-semibold text-brand" : "text-slate-800 hover:text-brand"}`}
            >
              {label}
            </Link>
          ))}
          <Link href="/login" className="px-2 text-brand hover:underline md:ml-3">Masuk</Link>
          <Link
            href="/login?mode=daftar"
            className="rounded-full bg-brand px-5 py-2.5 text-white transition hover:bg-brand/90"
          >
            Daftar Gratis
          </Link>
        </nav>
      </div>
    </header>
  );
}