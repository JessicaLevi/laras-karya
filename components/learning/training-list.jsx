"use client";

import { useState } from "react";
import { Award } from "lucide-react";

import { TrainingCard } from "@/components/learning/training-card";
import { cn } from "@/lib/utils";

/**
 * Daftar pelatihan dengan filter kategori (Semua / Sertifikasi / Kursus Online / Workshop).
 * @param {{ trainings: Array<{ id: string, category: string }>, filters: Array<{ value: string, label: string }> }} props
 */
export function TrainingList({ trainings, filters }) {
  const [active, setActive] = useState("semua");
  const visible = active === "semua" ? trainings : trainings.filter((t) => t.category === active);

  return (
    <section id="pelatihan" aria-labelledby="rekomendasi-title" className="scroll-mt-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="rekomendasi-title" className="flex items-center gap-3 text-xl font-bold text-brand">
          <Award className="size-5" aria-hidden="true" />
          Pelatihan yang Direkomendasikan
        </h2>

        <div role="group" aria-label="Filter jenis pelatihan" className="flex flex-wrap gap-2">
          {filters.map(({ value, label }) => {
            const selected = active === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(value)}
                className={cn(
                  "min-h-9 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-brand/30 focus-visible:outline-none",
                  selected
                    ? "border-brand bg-brand font-bold text-white"
                    : "border-line bg-white text-ink/80 hover:border-brand hover:text-brand"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((t) => (
            <TrainingCard key={t.id} training={t} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-line bg-white p-8 text-center text-sm text-ink/70">
          Belum ada pelatihan untuk kategori ini.
        </p>
      )}
    </section>
  );
}
