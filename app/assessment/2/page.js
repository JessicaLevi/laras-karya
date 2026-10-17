"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { AiHint } from "@/components/assessment/ai-hint";
import { AssessmentCard } from "@/components/assessment/assessment-card";
import { Field } from "@/components/assessment/field";
import { SelectInput, SubLabel, TextArea, TextInput, Toggle } from "@/components/assessment/form-controls";
import { StepNav } from "@/components/assessment/step-nav";
import { useAssessment } from "@/context/assessment-store";
import { EDUCATION_LEVELS, LIMITS, PROVINCES } from "@/lib/assessment-options";
import { isValid, validateStep2 } from "@/lib/assessment-validation";

/** Langkah 2 – Latar Belakang Anda (dokumen bagian 2.2). */
export default function AssessmentStep2Page() {
  const router = useRouter();
  const { answers, updateStep, reachStep } = useAssessment();
  const step = answers.step_2;
  const errors = validateStep2(step);
  const canContinue = isValid(errors);

  // Pesan error baru ditampilkan setelah user meninggalkan field, supaya form tidak langsung penuh warna merah.
  const [touched, setTouched] = useState({});
  const touch = (field) => () => setTouched((t) => ({ ...t, [field]: true }));
  const errorFor = (field) => (touched[field] ? errors[field] : undefined);

  const update = (patch) => updateStep("step_2", patch);
  const updateEducation = (patch) => update({ education: { ...step.education, ...patch } });

  const next = () => {
    reachStep(3);
    router.push("/assessment/3");
  };

  return (
    <AssessmentCard
      step={2}
      title="Latar Belakang Anda"
      description="Informasi ini membantu kami mencocokkan lokasi, pendidikan, dan pengalaman Anda dengan syarat lowongan."
    >
      <Field as="fieldset" label="Domisili saat ini" required error={errorFor("province") ?? errorFor("city")}>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <SubLabel htmlFor="province">Provinsi</SubLabel>
            <SelectInput
              id="province"
              placeholder="Pilih provinsi"
              options={PROVINCES}
              value={step.province}
              onChange={(e) => update({ province: e.target.value })}
              onBlur={touch("province")}
              aria-invalid={Boolean(errorFor("province"))}
            />
          </div>
          <div>
            <SubLabel htmlFor="city">Kota / Kabupaten</SubLabel>
            {/* Fase front-end: teks bebas. Nanti bisa diganti dropdown dari data wilayah. */}
            <TextInput
              id="city"
              placeholder="Contoh: Jakarta Selatan"
              value={step.city}
              onChange={(e) => update({ city: e.target.value })}
              onBlur={touch("city")}
              aria-invalid={Boolean(errorFor("city"))}
            />
          </div>
        </div>
        <div className="mt-3">
          <Toggle
            id="open_to_relocate"
            label="Bersedia pindah kota untuk pekerjaan"
            checked={step.open_to_relocate}
            onChange={(checked) => update({ open_to_relocate: checked })}
          />
        </div>
      </Field>

      <Field as="fieldset" label="Pendidikan terakhir" required error={errorFor("degree_level") ?? errorFor("institution")}>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <SubLabel htmlFor="degree_level">Jenjang</SubLabel>
            <SelectInput
              id="degree_level"
              placeholder="Pilih jenjang"
              options={EDUCATION_LEVELS}
              value={step.education.degree_level}
              onChange={(e) => updateEducation({ degree_level: e.target.value })}
              onBlur={touch("degree_level")}
              aria-invalid={Boolean(errorFor("degree_level"))}
            />
          </div>
          <div>
            <SubLabel htmlFor="major">Jurusan (opsional)</SubLabel>
            <TextInput
              id="major"
              placeholder="Contoh: Teknik Lingkungan"
              value={step.education.major}
              onChange={(e) => updateEducation({ major: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-3">
          <SubLabel htmlFor="institution">Nama kampus / sekolah</SubLabel>
          <TextInput
            id="institution"
            placeholder="Contoh: Universitas Indonesia"
            value={step.education.institution}
            onChange={(e) => updateEducation({ institution: e.target.value })}
            onBlur={touch("institution")}
            aria-invalid={Boolean(errorFor("institution"))}
          />
        </div>
      </Field>

      <Field as="fieldset" label="Sertifikat yang dimiliki" optional error={errors.certifications}>
        <CertificationInput values={step.certifications} onChange={(certifications) => update({ certifications })} />
      </Field>

      <Field
        label="Ceritakan singkat pengalaman atau proyek yang paling relevan"
        htmlFor="experience_story"
        required
        error={errorFor("experience_story")}
        hint="Tidak perlu menulis nama perusahaan, nama orang, atau kontak. AI membaca cerita ini untuk mengenali keahlian yang mungkin belum Anda tulis. Cerita ini juga tampil sebagai bio di profil Anda dan bisa diubah kapan saja."
      >
        <TextArea
          id="experience_story"
          placeholder="Contoh: Selama 3 tahun saya mengolah data proyek di Excel dan menyusun laporan limbah bulanan..."
          maxLength={LIMITS.storyMax}
          value={step.experience_story}
          onChange={(e) => update({ experience_story: e.target.value })}
          onBlur={touch("experience_story")}
          aria-invalid={Boolean(errorFor("experience_story"))}
        />
        <p className="mt-1.5 text-right text-xs text-ink/60" aria-live="polite">
          {step.experience_story.trim().length}/{LIMITS.storyMax} karakter
          {step.experience_story.trim().length < LIMITS.storyMin ? ` · minimal ${LIMITS.storyMin}` : ""}
        </p>
      </Field>

      <AiHint>AI mengenali keahlian dari cerita pengalaman Anda</AiHint>
      <StepNav backHref="/assessment/1" onNext={next} disabled={!canContinue} />
    </AssessmentCard>
  );
}

/** Tambah/hapus sertifikat. Disimpan sebagai [{ name, issuer }] sesuai profiles.certifications di HVN. */
function CertificationInput({ values, onChange }) {
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const isFull = values.length >= LIMITS.maxCertifications;

  const add = () => {
    if (!name.trim() || isFull) return;
    onChange([...values, { name: name.trim(), issuer: issuer.trim() }]);
    setName("");
    setIssuer("");
  };
  const remove = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div>
      {values.length > 0 ? (
        <ul className="mb-3 flex flex-wrap gap-2">
          {values.map((cert, index) => (
            <li key={`${cert.name}-${index}`} className="inline-flex items-center gap-1 rounded-lg bg-brand px-2.5 py-1.5 text-[13px] font-semibold text-white">
              {cert.name}
              {cert.issuer ? <span className="font-normal text-white/80">· {cert.issuer}</span> : null}
              <button type="button" onClick={() => remove(index)} className="rounded-full p-0.5 hover:bg-white/20" aria-label={`Hapus sertifikat ${cert.name}`}>
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {isFull ? (
        <p className="text-xs text-ink/70">Maksimal {LIMITS.maxCertifications} sertifikat.</p>
      ) : (
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <div className="flex-1">
            <SubLabel htmlFor="cert_name">Nama sertifikat</SubLabel>
            <TextInput
              id="cert_name"
              placeholder="Contoh: Ahli K3 Umum"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  add();
                }
              }}
            />
          </div>
          <div className="flex-1">
            <SubLabel htmlFor="cert_issuer">Penerbit (opsional)</SubLabel>
            <TextInput id="cert_issuer" placeholder="Contoh: Kemnaker" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
          </div>
          <button
            type="button"
            onClick={add}
            disabled={!name.trim()}
            className="h-[46px] self-end rounded-xl border-[1.5px] border-brand px-5 text-sm font-bold text-brand hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            Tambah
          </button>
        </div>
      )}
    </div>
  );
}
