import Link from "next/link";
import { Leaf } from "lucide-react";

export function Logo({ light = false }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Laras Karya - Beranda">
      <Leaf className={`h-7 w-7 ${light ? "text-emerald-200" : "text-brand"}`} aria-hidden />
      <span className="leading-none">
        <span className={`block text-lg font-semibold ${light ? "text-white" : "text-brand"}`}>
          Laras Karya
        </span>
        <span className={`block text-[9px] ${light ? "text-emerald-100" : "text-slate-500"}`}>
          Karier Hijau, Masa Depan Perempuan
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-800 sm:gap-6">
          <Link href="#tentang" className="hidden hover:text-brand md:inline">Tentang</Link>
          <Link href="/jobs" className="hidden hover:text-brand md:inline">Karier Hijau</Link>
          <Link href="/employer" className="hidden hover:text-brand md:inline">Employer</Link>
          <Link href="/login" className="px-2 text-brand hover:underline">Masuk</Link>
          <Link
            href="/login?mode=daftar"
            className="rounded-full bg-brand px-5 py-2.5 text-white transition hover:bg-brand/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Daftar Gratis
          </Link>
        </nav>
      </div>
    </header>
  );
}
