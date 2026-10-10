import Link from "next/link";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

const LEVEL_STYLES = {
  Beginner: "bg-emerald-100 text-emerald-800",
  Intermediate: "bg-amber-100 text-amber-800",
  Advanced: "bg-rose-100 text-rose-800",
};

/** @param {{ course: import("@/lib/home-data").CourseItem }} props */
export function CourseCard({ course }) {
  const { provider, title, level, duration, mode, focusSkill, isPopular, isPrimary } = course;

  return (
    <article className="relative flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-sm">
      {isPopular && (
        <span className="absolute right-0 top-0 rounded-bl-lg rounded-tr-xl bg-ai px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
          PALING POPULER
        </span>
      )}

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-brand">{provider}</p>
        <h3 className="mt-1 pr-16 text-[15px] font-bold leading-snug text-ink">{title}</h3>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", LEVEL_STYLES[level])}>{level}</span>
        <span className="text-[11px] text-ink/75">
          {duration} • {mode}
        </span>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-ink/70">Fokus skill gampang dikejar:</p>
        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-pink-50 px-2.5 py-0.5 text-[11px] font-semibold text-ai">
          <Star className="size-3 fill-current" aria-hidden="true" />
          {focusSkill}
        </span>
      </div>

      <Link
        href="/learning-path"
        className={cn(
          "mt-auto inline-flex min-h-11 items-center justify-center rounded-full border text-sm font-bold transition-colors md:min-h-10",
          isPrimary
            ? "border-brand bg-brand text-white hover:bg-brand/90"
            : "border-brand bg-white text-brand hover:bg-brand-light"
        )}
      >
        {isPrimary ? "Mulai Belajar" : "Lihat Pelatihan"}
      </Link>
    </article>
  );
}
