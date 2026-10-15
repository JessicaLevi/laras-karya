"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, MapPin, Star, Wallet } from "lucide-react";
import MatchPanel, { SkillGapList } from "./match-panel";

function TopRow({ job }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">{job.sector}</span>
      <span className="rounded-full bg-ai/10 px-3 py-1 text-xs font-semibold text-ai">{job.match}% Cocok</span>
    </div>
  );
}

function Meta({ job }) {
  const place = job.mode === "Remote" ? "Remote" : `${job.city} • ${job.mode}`;
  return (
    <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
      <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" aria-hidden /> {place}</li>
      <li className="flex items-center gap-2"><Wallet className="h-4 w-4 shrink-0" aria-hidden /> {job.salary}</li>
    </ul>
  );
}

function StatusChip({ status }) {
  const open = status === "dibuka";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${open ? "bg-brand-light text-brand" : "bg-red-50 text-red-700"}`}>
      {open ? "Masih Dibuka" : "Ditutup"}
    </span>
  );
}

export function FeaturedJobCard({ job }) {
  return (
    <section aria-label="Rekomendasi paling cocok" className="rounded-3xl border-2 border-brand bg-brand-light p-5 sm:p-7">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white">
        <Star className="h-3 w-3" aria-hidden /> Paling cocok untuk Anda
      </span>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <article className="flex flex-col rounded-2xl bg-white p-6">
          <TopRow job={job} />
          <h3 className="mt-5 text-3xl font-bold text-ink">{job.title}</h3>
          <p className="mt-1 text-slate-600">{job.company}</p>
          <p className="mt-4 leading-relaxed text-slate-700">{job.description}</p>
          <Meta job={job} />

          <p className="mt-5 text-sm font-semibold text-ink">Keterampilan yang dibutuhkan</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {job.skills.map((s) => (
              <li key={s} className="rounded-full bg-brand-light px-3.5 py-1.5 text-xs font-semibold text-brand">{s}</li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <StatusChip status={job.status} />
            <Link
              href={`/jobs/${job.id}`}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand/90"
            >
              Lihat Detail Lowongan <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </article>

        <MatchPanel job={job} />
      </div>
    </section>
  );
}

export function JobCard({ job }) {
  const [open, setOpen] = useState(false);
  const panelId = `skill-gap-${job.id}`;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6">
      <TopRow job={job} />
      <h3 className="mt-4 text-xl font-bold text-ink">{job.title}</h3>
      <p className="text-slate-600">{job.company}</p>
      <Meta job={job} />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <StatusChip status={job.status} />
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-full border border-brand px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand-light"
          >
            Skill Gap
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
          </button>
          <Link href={`/jobs/${job.id}`} className="text-xs font-semibold text-brand hover:underline">
            Lihat Detail
          </Link>
        </div>
      </div>

      {open && (
        <div id={panelId} className="mt-5 border-t border-slate-200 pt-5">
          <SkillGapList gaps={job.gaps} />
        </div>
      )}
    </article>
  );
}
