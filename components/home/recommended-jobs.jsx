"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

import { JobCard } from "@/components/home/job-card";
import { cn } from "@/lib/utils";

/** Seksi rekomendasi lowongan. Tombol "Update Rekomendasi" mensimulasikan refresh (loading 900 ms). */
export function RecommendedJobs({ jobs }) {
  const [isUpdating, setIsUpdating] = useState(false);

  function handleUpdate() {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 900); // ganti dengan fetch rekomendasi saat back-end siap
  }

  return (
    <section aria-labelledby="jobs-title" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="jobs-title" className="text-base font-bold text-ink md:text-lg">
          Rekomendasi Green Jobs untuk Anda
        </h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isUpdating}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-brand px-3.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-light disabled:opacity-70 md:min-h-8"
          >
            <RefreshCw className={cn("size-3.5", isUpdating && "animate-spin")} aria-hidden="true" />
            {isUpdating ? "Memperbarui…" : "Update Rekomendasi"}
          </button>
          <Link href="/jobs" className="inline-flex min-h-11 items-center gap-1 text-xs font-bold text-brand hover:underline md:min-h-0">
            Lihat Semua <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3" aria-busy={isUpdating}>
        {isUpdating
          ? jobs.map((j) => <div key={j.id} className="h-[190px] animate-pulse rounded-xl bg-white/80" />)
          : jobs.map((j) => <JobCard key={j.id} job={j} />)}
      </div>
    </section>
  );
}
