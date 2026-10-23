"use client";

import { useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { JOBS } from "@/lib/mock-jobs";
import { FeaturedJobCard, JobCard } from "./job-card";
import Pagination from "./pagination";

const PAGE_SIZE = 6; // jumlah kartu "Rekomendasi lainnya" per halaman

const MODES = [
  { label: "Semua", value: "semua" },
  { label: "WFO", value: "On-site" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Remote", value: "Remote" },
];

// Sementara. Nanti recommended_jobs() di database yang menyaring ini.
const OPEN_JOBS = JOBS.filter((j) => j.status === "dibuka");

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="mr-1 text-sm font-semibold text-ink">{label}</span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
            value === o.value
              ? "border-brand bg-brand text-white"
              : "border-slate-200 bg-white text-ink hover:border-brand"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function SectionTitle({ children, titleRef }) {
  return (
    <h2
      ref={titleRef}
      className="flex scroll-mt-24 items-center gap-2 text-xl font-bold text-ink"
    >
      <Sparkles className="h-5 w-5 text-brand" aria-hidden /> {children}
    </h2>
  );
}

export default function JobList() {
  const [mode, setMode] = useState("semua");
  const [page, setPage] = useState(1);
  const othersRef = useRef(null);

  const filtered = useMemo(
    () => OPEN_JOBS.filter((j) => mode === "semua" || j.mode === mode),
    [mode],
  );

  const [top, ...rest] = filtered;
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = rest.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const shown = (top ? 1 : 0) + visible.length;

  function changeMode(v) {
    setMode(v);
    setPage(1);
  }
  function resetFilters() {
    setMode("semua");
    setPage(1);
  }
  function changePage(p) {
    setPage(p);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    othersRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <div className="mt-10">
      <SectionTitle>Rekomendasi Teratas untuk Anda</SectionTitle>

      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
        <FilterGroup
          label="Pola kerja"
          options={MODES}
          value={mode}
          onChange={changeMode}
        />
        <p className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
          <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
          Hanya menampilkan lowongan yang masih dibuka
        </p>
        <p aria-live="polite" className="text-sm text-slate-500">
          Menampilkan {shown} dari {filtered.length} rekomendasi
        </p>
      </div>

      {top ? (
        <>
          <div className="mt-6">
            <FeaturedJobCard job={top} />
          </div>

          {visible.length > 0 && (
            <div className="mt-10">
              <SectionTitle titleRef={othersRef}>
                Rekomendasi lainnya
              </SectionTitle>
              <div className="mt-4 grid items-stretch gap-5 md:grid-cols-2">
                {visible.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <Pagination
                page={current}
                totalPages={totalPages}
                onChange={changePage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-bold text-ink">
            Belum ada lowongan yang cocok dengan filter ini
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Coba ganti pola kerja untuk melihat rekomendasi lain.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
}
