import Image from "next/image";
import Link from "next/link";

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

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6 xl:px-8">
        <Logo />
        <nav aria-label="Navigasi landing" className="flex items-center gap-4 text-sm font-medium text-slate-800 sm:gap-6">
          <Link href="#tentang" className="hidden hover:text-brand md:inline">Tentang</Link>
          <Link href="/jobs" className="hidden hover:text-brand md:inline">Karier Hijau</Link>
          <Link href="/employer" className="hidden hover:text-brand md:inline">Employer</Link>
          <Link href="/login" className="px-2 text-brand hover:underline">Masuk</Link>
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
