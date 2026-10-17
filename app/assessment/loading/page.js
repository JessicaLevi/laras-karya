"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Sparkles } from "lucide-react";

import { useAssessment } from "@/context/assessment-store";
import { MOCK_SKILL_OPTIONS } from "@/lib/assessment-options";
import { isValid, validateStep1, validateStep2, validateStep3 } from "@/lib/assessment-validation";
import { cn } from "@/lib/utils";

/**
 * Tahapan sama dengan alur server di dokumen bagian 5.1.
 * FASE FRONT-END: setiap tahap hanya disimulasikan dengan jeda waktu.
 * Nanti diganti: tahap 1–2 = panggilan AI + simpan profiles.skills, tahap 3 = recommended_jobs().
 */
const STAGES = [
  "Membaca cerita pengalaman Anda",
  "Memperbarui keahlian di profil Anda",
  "Menghitung kecocokan dengan lowongan",
];
const STAGE_DURATION_MS = 1800;
const RESULT_PAGE = "/jobs";

const subscribeNothing = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribeNothing, () => true, () => false);

/** Layar proses AI (dokumen bagian 2.5). */
export default function AssessmentLoadingPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { answers } = useAssessment();
  const [doneCount, setDoneCount] = useState(0);

  const isComplete =
    isValid(validateStep1(answers.step_1)) &&
    isValid(validateStep2(answers.step_2)) &&
    isValid(validateStep3(answers.step_3, MOCK_SKILL_OPTIONS));
  const ready = hydrated && isComplete;

  useEffect(() => {
    if (!ready) return undefined;
    const timers = STAGES.map((_, i) => setTimeout(() => setDoneCount(i + 1), STAGE_DURATION_MS * (i + 1)));
    // replace, bukan push: tombol Back di browser tidak kembali ke layar loading
    timers.push(setTimeout(() => router.replace(RESULT_PAGE), STAGE_DURATION_MS * STAGES.length + 500));
    return () => timers.forEach(clearTimeout);
  }, [ready, router]);

  if (hydrated && !isComplete) {
    return (
      <section className="rounded-[22px] border border-black/5 bg-white px-6 py-10 text-center shadow-sm sm:px-11">
        <h1 className="text-2xl font-bold text-brand">Jawaban asesmen belum lengkap</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/85">
          Rekomendasi baru bisa diproses setelah semua langkah asesmen diisi. Periksa ringkasan jawaban Anda terlebih dahulu.
        </p>
        <Link href="/assessment/4" className="mt-6 inline-flex h-12 items-center rounded-full bg-brand px-7 text-[15px] font-bold text-white hover:bg-brand/90">
          Buka ringkasan jawaban
        </Link>
      </section>
    );
  }

  const progress = Math.round((doneCount / STAGES.length) * 100);

  return (
    <section className="rounded-[22px] bg-white/60 px-5 py-12 text-center sm:px-10">
      <div className="mx-auto mb-7 flex size-44 items-center justify-center rounded-full bg-pink-100/70" aria-hidden="true">
        <div className="flex size-36 items-center justify-center rounded-full bg-pink-200/70 motion-safe:animate-pulse">
          <div className="flex size-28 items-center justify-center rounded-full bg-ai text-white">
            <Sparkles className="size-10" />
          </div>
        </div>
      </div>

      <h1 className="text-[22px] font-bold leading-snug text-brand sm:text-[25px]">AI Laras Karya Sedang Menganalisis Profil…</h1>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/85">
        Mencocokkan pengalaman, minat sektor, dan preferensi Anda dengan lowongan green jobs yang masih dibuka.
      </p>

      <div
        className="mx-auto mt-6 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-black/10"
        role="progressbar"
        aria-label="Kemajuan proses"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="h-full rounded-full bg-ai transition-[width] duration-700 ease-out motion-reduce:transition-none" style={{ width: `${Math.max(progress, 8)}%` }} />
      </div>

      <ol className="mx-auto mt-6 max-w-sm rounded-2xl border border-black/10 bg-white px-5 py-3 text-left">
        {STAGES.map((label, i) => {
          const status = i < doneCount ? "done" : i === doneCount ? "running" : "waiting";
          return (
            <li key={label} className="flex items-center justify-between gap-3 py-2">
              <span
                className={cn(
                  "flex items-center gap-3 text-sm",
                  status === "done" && "text-ink",
                  status === "running" && "font-semibold text-ai",
                  status === "waiting" && "text-ink/50",
                )}
              >
                {status === "done" ? (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white" aria-hidden="true">
                    <Check className="size-3" />
                  </span>
                ) : (
                  <span
                    className={cn(
                      "size-5 shrink-0 rounded-full border-2 border-dashed",
                      status === "running" ? "border-ai motion-safe:animate-spin" : "border-black/20",
                    )}
                    aria-hidden="true"
                  />
                )}
                {label}
                {status === "running" ? "…" : ""}
              </span>
              {status === "done" ? (
                <span className="rounded-md bg-brand-light px-2 py-0.5 text-[11px] font-bold text-brand">Selesai</span>
              ) : null}
            </li>
          );
        })}
      </ol>

      <p className="sr-only" aria-live="polite">
        {doneCount < STAGES.length ? `Sedang ${STAGES[doneCount].toLowerCase()}` : "Selesai. Membuka rekomendasi karier."}
      </p>
      <p className="mt-5 text-[13px] text-ink/60">Proses ini biasanya membutuhkan 5–10 detik</p>
    </section>
  );
}
