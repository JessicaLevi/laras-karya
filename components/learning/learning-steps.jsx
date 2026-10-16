import Link from "next/link";
import { ArrowRight, Compass, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

const CARD = {
  active: "border-2 border-brand bg-brand-light",
  locked: "border-2 border-brand bg-white",
  future: "border-2 border-dashed border-line bg-white",
};

/** Tiga langkah jalur belajar. */
export function LearningSteps({ steps }) {
  return (
    <section aria-labelledby="jalur-title" className="rounded-3xl border border-line bg-white p-6 md:p-10">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-light text-brand">
          <Compass className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 id="jalur-title" className="text-xl font-bold text-brand">
            Jalur Belajar Anda
          </h2>
          <p className="mt-0.5 text-sm text-ink/70">
            Ikuti langkah-langkah berikut untuk menutup skill gap dan meningkatkan kecocokan Anda.
          </p>
        </div>
      </div>

      <ol className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <li
            key={step.n}
            aria-current={step.state === "active" ? "step" : undefined}
            className={cn("flex flex-col rounded-2xl p-5", CARD[step.state])}
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-full text-sm font-bold",
                  step.state === "active" ? "bg-brand text-white" : "bg-brand-light text-brand"
                )}
              >
                {step.n}
              </span>
              {step.badge && (
                <span className="rounded-md bg-brand-light px-2.5 py-1 text-xs font-semibold text-brand">
                  {step.badge}
                </span>
              )}
            </div>

            <h3 className="mt-4 text-lg font-bold text-brand">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink/80">{step.description}</p>

            <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
              <span className="text-ink/70">{step.duration}</span>
              {step.state === "active" ? (
                <Link href="#pelatihan" className="inline-flex items-center gap-1 font-bold text-brand hover:underline">
                  {step.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-ink/60">
                  <Lock className="size-3.5" aria-hidden="true" />
                  {step.lockedLabel}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
