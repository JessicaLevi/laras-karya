import Link from "next/link";
import { CheckCircle2, Heart, Laptop, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { hasApplied } from "@/lib/applications-data";
import { CompanyAvatar } from "@/components/ui/company-avatar";

/** @param {{ job: import("@/lib/home-data").JobItem }} props */
export function JobCard({ job }) {
  const {
    id,
    title,
    company,
    sector,
    matchPercent,
    workMode,
    salary,
    isOpen,
    benefit,
  } = job;

  // Cek apakah lowongan ini sudah dilamar oleh user
  const applied = hasApplied(id);
  const MetaIcon = workMode.startsWith("Remote") ? Laptop : MapPin;

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <CompanyAvatar
          company={company}
          sector={sector}
          className="h-10 w-10 text-sm"
        />
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "text-[15px] font-bold leading-snug",
              isOpen ? "text-ink" : "text-ink/70",
            )}
          >
            {title}
          </h3>
          <p className="text-xs text-ink/70">{company}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-bold leading-none text-ai">
            {matchPercent}%
          </p>
          <p className="mt-0.5 text-[10px] font-semibold text-ai">Cocok</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1 text-xs text-ink/75">
          <MetaIcon className="size-3.5 shrink-0" aria-hidden="true" />
          {workMode}
        </span>
        <span className="text-sm font-bold text-brand">{salary}</span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2">
        {isOpen ? (
          <>
            {benefit ? (
              <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                <Heart className="size-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{benefit}</span>
              </span>
            ) : (
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                Masih Dibuka
              </span>
            )}

            {applied ? (
              <Link
                href="/applications"
                className="inline-flex min-h-11 shrink-0 items-center gap-1 text-xs font-bold text-emerald-700 hover:underline md:min-h-9"
              >
                <CheckCircle2 className="size-3.5" aria-hidden="true" /> Sudah
                Dilamar
              </Link>
            ) : (
              <Link
                href={`/recommended-jobs/${id}`}
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-brand bg-brand px-4 text-xs font-bold text-white transition-colors hover:bg-brand/90 md:min-h-9"
              >
                Lamar Sekarang
              </Link>
            )}
          </>
        ) : (
          <>
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-700">
              Ditutup
            </span>
            <span className="text-xs font-medium text-ink/70">
              Lowongan Ditutup
            </span>
          </>
        )}
      </div>
    </article>
  );
}
