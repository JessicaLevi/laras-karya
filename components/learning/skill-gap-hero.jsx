import { Sparkle } from "lucide-react";

import { cn } from "@/lib/utils";

const DOT = { red: "bg-red-500", amber: "bg-amber-400", green: "bg-lime-500" };
const TEXT = { red: "text-red-300", amber: "text-amber-300", green: "text-lime-300" };

/** Kartu hijau: posisi target + daftar skill gap hasil analisis AI. */
export function SkillGapHero({ position, company, skillGaps }) {
  return (
    <section
      aria-label="Target posisi dan skill gap"
      className="grid gap-8 rounded-3xl bg-brand px-6 py-8 text-white md:grid-cols-[1fr_auto_1fr] md:items-center md:px-10"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/90">Target Posisi</p>
        <h2 className="mt-2 text-3xl font-bold">{position}</h2>
        <p className="mt-1 text-base text-white/85">{company}</p>
      </div>

      <div className="hidden h-24 w-px bg-white/20 md:block" aria-hidden="true" />

      <div className="md:pr-2">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/90">Skill Gap Teridentifikasi</p>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-light px-3 py-1 text-xs font-bold text-accent">
            <Sparkle className="size-3 fill-current" aria-hidden="true" />
            Dianalisis oleh AI
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {skillGaps.map(({ skill, status, tone }) => (
            <li key={skill} className="flex items-center gap-3 text-sm">
              <span className={cn("size-2.5 shrink-0 rounded-full", DOT[tone])} aria-hidden="true" />
              <span>
                <span className="font-semibold">{skill}</span>
                <span className={cn("ml-1.5", TEXT[tone])}>— {status}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
