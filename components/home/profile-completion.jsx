import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Pengingat kelengkapan profil di bawah hero, satu baris di layar sm ke atas.
 * Hilang sendiri kalau profil sudah 100%.
 * @param {{ value: number }} props  persen kelengkapan, 0 sampai 100
 */
export function ProfileCompletion({ value }) {
  if (value >= 100) return null;

  return (
    <section
      aria-label="Kelengkapan profil"
      className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-line bg-white px-4 py-2 md:px-5"
    >
      <p className="text-sm font-semibold text-ink">Profil Anda {value}% lengkap</p>
      <div
        role="progressbar"
        aria-label="Kelengkapan profil"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className="order-last h-2 basis-full overflow-hidden rounded-full bg-brand-light sm:order-none sm:max-w-xs sm:flex-1 sm:basis-auto"
      >
        <div className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
      </div>
      <Link
        href="/profile"
        className="ml-auto inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-bold text-brand hover:underline md:min-h-9"
      >
        Lengkapi Profil
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </section>
  );
}
