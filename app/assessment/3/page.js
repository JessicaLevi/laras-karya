"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, House, Repeat } from "lucide-react";

import { AiHint } from "@/components/assessment/ai-hint";
import { AssessmentCard } from "@/components/assessment/assessment-card";
import { ChipMultiSelect } from "@/components/assessment/chip-multi-select";
import { Field } from "@/components/assessment/field";
import { SelectInput } from "@/components/assessment/form-controls";
import { RadioTiles } from "@/components/assessment/radio-tiles";
import { SkillPicker } from "@/components/assessment/skill-picker";
import { StepNav } from "@/components/assessment/step-nav";
import { useAssessment } from "@/context/assessment-store";
import {
  EXPERIENCE_LEVELS,
  MOCK_SKILL_OPTIONS,
  MOCK_SUGGESTED_SKILLS_BY_SECTOR,
  SECTORS,
  WORK_ARRANGEMENTS,
} from "@/lib/assessment-options";
import { isValid, validateStep3 } from "@/lib/assessment-validation";

const WORK_ICONS = { onsite: Building2, remote: House, hybrid: Repeat };
const WORK_OPTIONS = WORK_ARRANGEMENTS.map((option) => ({ ...option, icon: WORK_ICONS[option.value] }));

// SEMENTARA (fase front-end). Nanti diganti getSkillOptions() dari dokumen bagian 4.
const SKILL_OPTIONS = MOCK_SKILL_OPTIONS;

/** Langkah 3 – Preferensi & Pengalaman Karier (dokumen bagian 2.3). */
export default function AssessmentStep3Page() {
  const router = useRouter();
  const { answers, updateStep, reachStep } = useAssessment();
  const step = answers.step_3;
  const errors = validateStep3(step, SKILL_OPTIONS);
  const canContinue = isValid(errors);

  const [touched, setTouched] = useState({});
  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));
  const errorFor = (field) => (touched[field] ? errors[field] : undefined);

  const update = (field, value) => {
    updateStep("step_3", { [field]: value });
    touch(field);
  };

  // Saran keahlian dari sektor yang dipilih, tanpa duplikat (nanti: getSuggestedSkills()).
  const suggestions = [...new Set(step.interest_sectors.flatMap((code) => MOCK_SUGGESTED_SKILLS_BY_SECTOR[code] ?? []))];

  const next = () => {
    reachStep(4);
    router.push("/assessment/4");
  };

  return (
    <AssessmentCard
      step={3}
      title="Preferensi & Pengalaman Karier"
      description="Bantu kami memahami pola kerja dan pengalaman Anda untuk rekomendasi yang lebih akurat."
    >
      <Field as="fieldset" label="Pola kerja yang Anda inginkan" required>
        <RadioTiles
          name="work_arrangement"
          options={WORK_OPTIONS}
          value={step.work_arrangement}
          onChange={(value) => update("work_arrangement", value)}
        />
      </Field>

      <Field
        as="fieldset"
        label={
          <>
            Bidang industri yang Anda minati <span className="text-[13px] font-medium text-ink/60">(pilih satu atau lebih)</span>
          </>
        }
        required
        error={errorFor("interest_sectors")}
      >
        <ChipMultiSelect
          name="interest_sectors"
          options={SECTORS}
          values={step.interest_sectors}
          onChange={(values) => update("interest_sectors", values)}
        />
      </Field>

      <Field as="fieldset" label="Keahlian utama Anda" required error={errorFor("skills") ?? errorFor("custom_skills")}>
        <SkillPicker
          options={SKILL_OPTIONS}
          values={step.skills}
          onChange={(values) => update("skills", values)}
          customValues={step.custom_skills}
          onCustomChange={(values) => {
            update("custom_skills", values);
            touch("skills");
          }}
          suggestions={suggestions}
        />
      </Field>

      <Field label="Tingkat pengalaman kerja" htmlFor="experience_level" required error={errorFor("experience_level")}>
        <SelectInput
          id="experience_level"
          placeholder="Pilih tingkat pengalaman"
          options={EXPERIENCE_LEVELS}
          value={step.experience_level}
          onChange={(e) => update("experience_level", e.target.value)}
          onBlur={() => touch("experience_level")}
          aria-invalid={Boolean(errorFor("experience_level"))}
        />
      </Field>

      <AiHint>AI mencocokkan preferensi dengan peluang green jobs</AiHint>
      <StepNav backHref="/assessment/2" onNext={next} disabled={!canContinue} />
    </AssessmentCard>
  );
}
