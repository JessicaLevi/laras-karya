"use client";

import { useState } from "react";
import { Bookmark, Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

/** Cincin persentase kecil (sisi kanan header). */
function MatchRing({ value, size = 44, strokeWidth = 3 }) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`Kecocokan ${value} persen`}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={strokeWidth} className="stroke-mint-line" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          className="stroke-brand"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[11px] font-bold text-ink">{value}%</span>
    </div>
  );
}

/**
 * Kartu header lowongan. Tombol simpan (bookmark) bisa di-toggle.
 * @param {{ job: import("@/lib/job-detail-data").JobDetail }} props
 */
export function JobHeader({ job }) {
  const [saved, setSaved] = useState(false);

  return (
    <header className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-white md:size-14">
          <Leaf className="size-6" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold leading-tight text-ink md:text-[22px]">{job.title}</h1>
          <p className="mt-0.5 text-sm font-bold text-brand">{job.company}</p>
          <p className="text-xs text-ink/70">
            {job.city} · {job.workMode}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setSaved((v) => !v)}
            aria-pressed={saved}
            aria-label={saved ? "Hapus dari lowongan tersimpan" : "Simpan lowongan"}
            className={cn(
              "grid size-11 place-items-center rounded-lg border transition-colors md:size-9",
              saved ? "border-brand bg-brand-light text-brand" : "border-line text-ink/70 hover:bg-surface"
            )}
          >
            <Bookmark className={cn("size-4", saved && "fill-current")} aria-hidden="true" />
          </button>
          <MatchRing value={job.matchPercent} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-medium text-ink/75 ring-1 ring-inset ring-line">
          {job.employmentType}
        </span>
        <span className="rounded-full bg-mint px-2.5 py-0.5 text-[11px] font-semibold text-brand">{job.sector}</span>
      </div>

      <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink/70">
        <span className="text-xs font-bold text-ink">Status Lowongan:</span>
        {job.isOpen ? (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">Masih Dibuka</span>
        ) : (
          <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-700">Ditutup</span>
        )}
        <span>
          Sumber: {job.source} • diperbarui {job.updatedAt}
        </span>
      </p>
    </header>
  );
}
