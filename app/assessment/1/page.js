"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, GraduationCap, Wrench } from "lucide-react";

import { AiHint } from "@/components/assessment/ai-hint";
import { AssessmentCard } from "@/components/assessment/assessment-card";
import { ChoicePills } from "@/components/assessment/choice-pills";
import { OptionCard } from "@/components/assessment/option-card";
import { StepNav } from "@/components/assessment/step-nav";
import { useAssessment } from "@/context/assessment-store";
import { CAREER_BREAK_OPTIONS, CAREER_SITUATIONS } from "@/lib/assessment-options";
import { isValid, validateStep1 } from "@/lib/assessment-validation";
import { useDemoMode } from "@/lib/demo-mode";
import { DEMO_ASSESSMENT } from "@/lib/demo-persona";
import { PROFILE } from "@/lib/profile-data";

const ICONS = {
  switch_or_return: ArrowLeftRight,
  practical_experience: Wrench,
  fresh_start: GraduationCap,
};

/** Langkah 1 – Mulai Asesmen Karier (dokumen bagian 2.1). */
export default function AssessmentStep1Page() {
  const router = useRouter();
  const { answers, updateStep, reachStep } = useAssessment();
  const step = answers.step_1;
  const canContinue = isValid(validateStep1(step));
  const demo = useDemoMode();
  const [filled, setFilled] = useState(false);

  const fillDemo = () => {
    ["step_1", "step_2", "step_3"].forEach((key) => updateStep(key, DEMO_ASSESSMENT[key]));
    reachStep(4);
    setFilled(true);
  };

  const chooseSituation = (value) =>
    // Jawaban jeda karier hanya berlaku untuk opsi pertama; buang jika user pindah opsi.
    updateStep("step_1", { career_situation: value, career_break: value === "switch_or_return" ? step.career_break : null });

  const next = () => {
    reachStep(2);
    router.push("/assessment/2");
  };

  return (
    <AssessmentCard
      step={1}
      title="Mulai Asesmen Karier Anda"
      description="Jawab beberapa pertanyaan singkat agar kami dapat memberikan rekomendasi karier hijau yang tepat untuk Anda."
    >
      {demo ? (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-brand/40 bg-brand-light/60 px-4 py-3 text-[13px] leading-relaxed text-ink">
          <p aria-live="polite">
            {filled
              ? "Terisi. Pilih Lanjut untuk melihat setiap langkah."
              : `Mode demo: isi seluruh asesmen dengan data contoh (${PROFILE.name}).`}
          </p>
          <button
            type="button"
            onClick={fillDemo}
            className="min-h-10 shrink-0 rounded-full bg-brand px-4 text-[13px] font-bold text-white transition-colors hover:bg-brand/90"
          >
            {filled ? "Isi ulang" : "Isi data contoh"}
          </button>
        </div>
      ) : null}

      <fieldset className="mb-5">
        <legend className="mb-3 text-[15px] font-bold text-ink">
          Mana yang paling menggambarkan Anda saat ini?<span className="text-red-600"> *</span>
        </legend>
        <div className="flex flex-col gap-3">
          {CAREER_SITUATIONS.map((option) => (
            <div key={option.value} className="flex flex-col gap-3">
              <OptionCard
                name="career_situation"
                value={option.value}
                checked={step.career_situation === option.value}
                onChange={chooseSituation}
                icon={ICONS[option.value]}
                title={option.title}
                description={option.description}
              />
              {option.value === "switch_or_return" && step.career_situation === "switch_or_return" ? (
                <div className="rounded-2xl border border-brand/20 bg-brand-light/70 p-4 sm:px-5">
                  <ChoicePills
                    name="career_break"
                    legend={
                      <>
                        Apakah Anda sempat jeda bekerja sebelum ini?{" "}
                        <span className="font-medium text-ink/60">(opsional)</span>
                      </>
                    }
                    options={CAREER_BREAK_OPTIONS}
                    value={step.career_break}
                    onChange={(value) => updateStep("step_1", { career_break: value })}
                  >
                    <p className="mt-2.5 text-xs leading-relaxed text-ink/70">
                      Membantu kami menampilkan lowongan dengan program return-to-work atau jam kerja fleksibel. Informasi ini
                      digunakan khusus untuk mencocokkan preferensi benefit Anda.
                    </p>
                  </ChoicePills>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </fieldset>

      <label className="mb-5 flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink/85">
        <input
          type="checkbox"
          checked={step.consent}
          onChange={(e) => updateStep("step_1", { consent: e.target.checked })}
          className="mt-0.5 size-[18px] shrink-0 accent-brand"
        />
        <span>
          Saya setuju data asesmen ini diolah, termasuk dengan bantuan AI, untuk memberikan rekomendasi karier.{" "}
          {/* TODO: arahkan ke halaman kebijakan privasi setelah halamannya dibuat */}
          <span className="font-bold text-brand underline">Kebijakan privasi</span>
        </span>
      </label>

      <AiHint>Jawaban Anda dipakai untuk menyesuaikan rekomendasi</AiHint>
      <StepNav onNext={next} disabled={!canContinue} />
    </AssessmentCard>
  );
}
