import Link from "next/link";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/** @param {{ job: import("@/lib/home-data").JobItem }} props */
export function JobCard({ job }) {
  const { id, title, company, sector, matchPercent, workMode, salary, isOpen } = job;

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-mint px-2.5 py-0.5 text-[11px] font-semibold text-brand">{sector}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2 py-0.5 text-[11px] font-semibold text-ai">
          <Star className="size-3 fill-current" aria-hidden="true" />
          {matchPercent}% Cocok
        </span>
      </div>

      <div>
        <h3 className={cn("text-[15px] font-bold", isOpen ? "text-ink" : "text-ink/70")}>{title}</h3>
        <p className="text-xs text-ink/70">{company}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-ink/75">{workMode}</span>
        <span className="rounded-full bg-mint px-2.5 py-0.5 text-[11px] font-semibold text-brand">{salary}</span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        {isOpen ? (
          <>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">Masih Dibuka</span>
            <Link href={`/jobs/${id}`} className="inline-flex min-h-11 items-center text-xs font-bold text-brand hover:underline md:min-h-0">
              Lamar Sekarang
            </Link>
          </>
        ) : (
          <>
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-700">Ditutup</span>
            <span className="text-xs font-medium text-ink/70">Lowongan Ditutup</span>
          </>
        )}
      </div>
    </article>
  );
}
