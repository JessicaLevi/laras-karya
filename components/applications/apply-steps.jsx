import { Check } from "lucide-react";

const STEPS = ["Pilih lowongan", "Siapkan dokumen", "Kirim Lamaran"];

// current: 1–3. Di halaman persiapan, langkah aktifnya 2.
export default function ApplySteps({ current = 2 }) {
  return (
    <ol aria-label="Tahapan melamar" className="mt-6 flex items-center gap-2 sm:gap-3">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li
            key={label}
            aria-current={active ? "step" : undefined}
            className="flex flex-1 items-center gap-2 sm:gap-3"
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                done || active
                  ? "bg-brand text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-300"
              } ${active ? "ring-4 ring-brand/20" : ""}`}
            >
              {done ? <Check className="h-4 w-4" aria-hidden /> : n}
            </span>
            <span
              className={`text-xs sm:text-sm ${
                active ? "font-bold text-brand" : "font-medium text-slate-600"
              }`}
            >
              {label}
            </span>
            {n < STEPS.length && (
              <span
                aria-hidden
                className={`hidden h-px flex-1 sm:block ${done ? "bg-brand" : "bg-slate-300"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}