"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, ClipboardCheck, X } from "lucide-react";

import { cn } from "@/lib/utils";

const SKILL_STATUS = {
  terpenuhi: { label: "Terpenuhi", pill: "bg-emerald-400/20 text-emerald-200", ok: true },
  peningkatan: { label: "Perlu peningkatan", pill: "bg-red-400/20 text-red-200", ok: false },
  belum: { label: "Belum dimiliki", pill: "bg-red-400/20 text-red-200", ok: false },
};

/**
 * Kartu hijau tua "Kecocokan Profil" (sticky di desktop).
 * - Toggle buka/tutup breakdown Skill Gap (F04b ↔ F04c)
 * - "Lamar Sekarang" mensimulasikan kirim lamaran (idle → loading → done)
 *
 * @param {{ job: import("@/lib/job-detail-data").JobDetail, defaultOpen?: boolean }} props
 */
export function MatchSkillGapCard({ job, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [applyState, setApplyState] = useState("idle");

  const missing = job.skills.filter((s) => s.status !== "terpenuhi");

  function handleApply() {
    setApplyState("loading");
    setTimeout(() => setApplyState("done"), 1000); // ganti dengan request ke back-end nanti
  }

  const applyLabel = !job.isOpen
    ? "Lowongan Ditutup"
    : applyState === "loading"
      ? "Mengirim…"
      : applyState === "done"
        ? "Lamaran Terkirim"
        : "Lamar Sekarang";

  return (
    <section aria-labelledby="match-title" className="rounded-xl bg-brand p-5 text-white shadow-sm lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <h2 id="match-title" className="text-[13px] font-bold">
          Kecocokan Profil
        </h2>
        <span className="text-[13px] font-bold">{job.matchPercent}%</span>
      </div>

      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/25"
        role="progressbar"
        aria-valuenow={job.matchPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Kecocokan profil"
      >
        <div className="h-full rounded-full bg-white" style={{ width: `${job.matchPercent}%` }} />
      </div>
      <p className="mt-2 text-[11px] text-white/80">Profil Anda cocok dengan {job.matchPercent}% persyaratan posisi ini.</p>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="skill-gap-panel"
        className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/60 text-[13px] font-semibold transition-colors hover:bg-white/10"
      >
        <ClipboardCheck className="size-4" aria-hidden="true" />
        {isOpen ? "Sembunyikan Skill Gap" : "Cek Skill Gap"}
      </button>

      {isOpen && (
        <div id="skill-gap-panel" className="mt-3 rounded-lg bg-white/10 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-white/80">
            {missing.length} keterampilan perlu dilengkapi
          </p>

          <ul className="mt-2.5 space-y-2">
            {job.skills.map((s) => {
              const st = SKILL_STATUS[s.status];
              return (
                <li key={s.id} className="flex items-center gap-2 text-[12px]">
                  <span
                    className={cn("grid size-4 shrink-0 place-items-center rounded-full", st.ok ? "bg-emerald-500" : "bg-red-500")}
                  >
                    {st.ok ? <Check className="size-2.5" aria-hidden="true" /> : <X className="size-2.5" aria-hidden="true" />}
                  </span>
                  <span className="min-w-0 flex-1">{s.name}</span>
                  <span className={cn("whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold", st.pill)}>{st.label}</span>
                </li>
              );
            })}
          </ul>

          <Link
            href="/learning-path"
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-[12px] font-bold text-brand transition-colors hover:bg-brand-light"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Lihat Pelatihan ({missing.length} keterampilan)
          </Link>
        </div>
      )}

      <button
        type="button"
        onClick={handleApply}
        disabled={!job.isOpen || applyState !== "idle"}
        className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-[13px] font-bold text-brand transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-80"
      >
        {applyState === "done" ? <Check className="size-4" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
        {applyLabel}
      </button>
    </section>
  );
}
