"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Lock, MapPin } from "lucide-react";
import { JOBS } from "@/lib/mock-jobs";
import { REGISTER_PATH, loginTo } from "@/lib/routes";

const PREVIEW_COUNT = 6;
const MODES = [
  { label: "Semua", value: "semua" },
  { label: "WFO", value: "On-site" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Remote", value: "Remote" },
];
const OPEN_JOBS = JOBS.filter((j) => j.status === "dibuka");

function PreviewCard({ job }) {
  const place = job.mode === "Remote" ? "Remote" : `${job.city} • ${job.mode}`;
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <span className="self-start rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">{job.sector}</span>
      <h3 className="mt-4 text-xl font-bold text-ink">{job.title}</h3>
      <p className="text-slate-600">{job.company}</p>
      <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden /> {place}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {job.skills.slice(0, 3).map((s) => (
          <li key={s} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{s}</li>
        ))}
      </ul>
      <div className="mt-auto flex justify-end pt-5">
        <Link
          href={loginTo(`/recommended_jobs/${job.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
        >
          <Lock className="h-3.5 w-3.5" aria-hidden /> Masuk untuk melihat detail
        </Link>
      </div>
    </article>
  );
}

export default function PublicJobList() {
  const [mode, setMode] = useState("semua");
  const filtered = useMemo(
    () => OPEN_JOBS.filter((j) => mode === "semua" || j.mode === mode),
    [mode]
  );
  const shown = filtered.slice(0, PREVIEW_COUNT);
  const hidden = filtered.length - shown.length;

  return (
    <div className="mt-8">
      <div role="group" aria-label="Pola kerja" className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-semibold text-ink">Pola kerja</span>
        {MODES.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={mode === o.value}
            onClick={() => setMode(o.value)}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
              mode === o.value ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-ink hover:border-brand"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {shown.length > 0 ? (
        <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((job) => <PreviewCard key={job.id} job={job} />)}
        </div>
      ) : (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          Belum ada lowongan dengan pola kerja ini.
        </p>
      )}

      {hidden > 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-brand bg-brand-light p-8 text-center">
          <p className="font-bold text-ink">Masih ada {hidden} lowongan lainnya</p>
          <p className="mt-1 text-sm text-slate-700">Daftar untuk melihat semuanya, lengkap dengan kecocokan dengan profil Anda.</p>
          <Link
            href={REGISTER_PATH}
            className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            Daftar sekarang
          </Link>
        </div>
      )}
    </div>
  );
}