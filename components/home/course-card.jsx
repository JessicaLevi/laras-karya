import Image from "next/image";
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
  const {
    provider,
    title,
    level,
    duration,
    mode,
    focusSkill,
    image,
    isPopular,
    isPrimary,
  } = course;

  return (
    <article className="relative flex flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-sm">
      {image && (
        /* Rasio tetap 5:2 supaya bentuknya sama di semua lebar layar */
        <div className="relative -mx-5 -mt-5 aspect-[5/2] overflow-hidden rounded-t-xl bg-mint">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1200px) 370px, (min-width: 768px) 33vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      )}

      {isPopular && (
        <span className="absolute right-0 top-0 rounded-bl-lg rounded-tr-xl bg-ai px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
          PALING POPULER
        </span>
      )}

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-brand">
          {provider}
        </p>
        <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink">
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
            LEVEL_STYLES[level],
          )}
        >
          {level}
        </span>
        <span className="text-[11px] text-ink/75">
          {duration} • {mode}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-pink-50 px-2.5 py-0.5 text-[11px] font-semibold text-ai">
          <Star className="size-3 shrink-0 fill-current" aria-hidden="true" />
          <span className="truncate">{focusSkill}</span>
        </span>
        <Link
          href="/learning-path"
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border px-4 text-xs font-bold transition-colors md:min-h-9",
            isPrimary
              ? "border-brand bg-brand text-white hover:bg-brand/90"
              : "border-brand bg-white text-brand hover:bg-brand-light",
          )}
        >
          {isPrimary ? "Mulai Belajar" : "Lihat Pelatihan"}
        </Link>
      </div>
    </article>
  );
}
