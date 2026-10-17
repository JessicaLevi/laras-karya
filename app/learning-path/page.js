import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { LearningSteps } from "@/components/learning/learning-steps";
import { SkillGapHero } from "@/components/learning/skill-gap-hero";
import { TrainingList } from "@/components/learning/training-list";
import { Footer } from "@/components/layout/footer";
import { LEARNING_STEPS, LEARNING_TARGET, TRAININGS, TRAINING_FILTERS } from "@/lib/learning-data";

export const metadata = { title: "Jalur Belajar & Pelatihan" };

export default function LearningPathPage() {
  return (
    <main className="flex-1 bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10 xl:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-ink/70">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/home" className="hover:text-brand">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/learning-path" className="hover:text-brand">
              Pelatihan
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Jalur Belajar</li>
        </ol>
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand">Jalur Belajar &amp; Pelatihan untuk Menutup Skill Gap</h1>
      <p className="mt-1 text-base text-ink">Rekomendasi pelatihan yang dipersonalisasi berdasarkan analisis AI terhadap profil Anda.</p>

      <div className="mt-8 space-y-8">
        <SkillGapHero {...LEARNING_TARGET} />
        <LearningSteps steps={LEARNING_STEPS} />
        <TrainingList trainings={TRAININGS} filters={TRAINING_FILTERS} />

        <aside className="flex flex-col gap-3 rounded-2xl border border-brand/15 bg-brand-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-4 text-sm text-ink">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-accent">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            Setelah menyelesaikan pelatihan, profil dan tingkat kecocokan lamaran Anda akan diperbarui secara otomatis.
          </p>
          <Link href="#" className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-brand hover:underline">
            Pelajari Selengkapnya
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </div>
    <Footer />
  </main>
);
}
