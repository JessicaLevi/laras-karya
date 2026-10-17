import Link from "next/link";
import { Sparkles } from "lucide-react";

/**
 * Halaman "Segera Hadir" yang bisa dipakai ulang (Employer sekarang, Blog atau fitur lain nanti).
 * icon = komponen ikon dari lucide-react, mis. icon={Building2}
 */
export default function ComingSoon({
  icon: Icon,
  title,
  description,
  badge = "Segera Hadir",
  ctaHref = "/",
  ctaLabel = "Kembali ke Beranda",
}) {
  return (
    <main className="flex flex-1 items-center justify-center bg-surface px-4 py-16">
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-light text-brand" aria-hidden>
          <Icon className="h-10 w-10" />
        </span>

        <span className="mt-5 inline-flex items-center gap-1 rounded-full bg-ai/10 px-3.5 py-1.5 text-sm font-semibold text-ai">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> {badge}
        </span>

        <h1 className="mt-5 text-balance text-3xl font-bold leading-tight text-brand md:text-4xl">{title}</h1>
        <p className="mt-4 leading-relaxed text-slate-600">{description}</p>

        <Link
          href={ctaHref}
          className="mt-7 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand/90"
        >
          {ctaLabel}
        </Link>
      </div>
    </main>
  );
}
