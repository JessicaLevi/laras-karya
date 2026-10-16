import { Pencil, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

/** Kartu identitas + progres kelengkapan profil + info pembaruan AI. */
export function ProfileHeader({ name, initials, headline, status, completeness }) {
  return (
    <>
      <section className="flex flex-col gap-6 rounded-3xl border border-line bg-white p-6 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex items-center gap-5 md:gap-6">
          <div
            aria-hidden="true"
            className="grid size-20 shrink-0 place-items-center rounded-full bg-brand text-3xl font-bold text-white md:size-[104px] md:text-4xl"
          >
            {initials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{name}</h1>
              <button
                type="button"
                className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-brand hover:underline focus-visible:ring-3 focus-visible:ring-brand/30 focus-visible:outline-none"
              >
                <Pencil className="size-4" aria-hidden="true" />
                Edit
              </button>
            </div>
            <p className="mt-1 text-base text-ink/70">{headline}</p>
            <Badge tone="brand" outline className="mt-2 border-brand px-3 py-1 text-sm font-semibold">
              {status}
            </Badge>
          </div>
        </div>

        <div className="md:w-[44%] md:max-w-[560px]">
          <div className="flex items-center justify-between text-base">
            <span id="kelengkapan-label" className="font-semibold text-brand">
              Kelengkapan Profil
            </span>
            <span className="font-bold text-brand">{completeness}%</span>
          </div>
          <div
            role="progressbar"
            aria-labelledby="kelengkapan-label"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={completeness}
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-line"
          >
            <div className="h-full rounded-full bg-brand" style={{ width: `${completeness}%` }} />
          </div>
          <p className="mt-2 text-sm text-ink/70">Lengkapi untuk meningkatkan rekomendasi AI</p>
        </div>
      </section>

      <p className="mt-6 flex items-center gap-4 rounded-2xl bg-brand-light px-5 py-3.5 text-sm text-ink">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-accent">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        Setiap perubahan pada profil Anda akan otomatis memperbarui rekomendasi karier dan tingkat kecocokan AI.
      </p>
    </>
  );
}
