"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info, Pencil } from "lucide-react";

import { AssessmentCard } from "@/components/assessment/assessment-card";
import { StepNav } from "@/components/assessment/step-nav";
import { useAssessment } from "@/context/assessment-store";
import { EDUCATION_LEVELS, EXPERIENCE_LEVELS, MOCK_SKILL_OPTIONS, SECTORS } from "@/lib/assessment-options";
import { isValid, validateStep1, validateStep2, validateStep3 } from "@/lib/assessment-validation";

const WORK_LABELS = { onsite: "WFO (kerja di kantor)", remote: "Remote", hybrid: "Hybrid (WFO & Remote)" };
const STORY_PREVIEW_LENGTH = 160;

const labelOf = (list, value) => list.find((item) => item.value === value)?.label ?? value;

function careerProfileLabel({ career_situation, career_break }) {
  if (career_situation === "switch_or_return") {
    return career_break === "yes" ? "Kembali bekerja setelah jeda karier" : "Berpindah karier";
  }
  if (career_situation === "practical_experience") return "Belajar dari pengalaman praktik";
  if (career_situation === "fresh_start") return "Lulusan baru atau mulai dari nol";
  return "–";
}

// true setelah halaman berjalan di browser; mencegah ringkasan kosong sesaat sebelum jawaban dari sessionStorage terbaca
const subscribeNothing = () => () => {};
const useHydrated = () => useSyncExternalStore(subscribeNothing, () => true, () => false);

/** Langkah 4 – Ringkasan Profil & Asesmen (dokumen bagian 2.4). */
export default function AssessmentStep4Page() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { answers } = useAssessment();
  const { step_1: s1, step_2: s2, step_3: s3 } = answers;

  // Halaman ini bisa dibuka langsung lewat URL, jadi cek ulang semua langkah.
  const incompleteSteps = [
    !isValid(validateStep1(s1)) && 1,
    !isValid(validateStep2(s2)) && 2,
    !isValid(validateStep3(s3, MOCK_SKILL_OPTIONS)) && 3,
  ].filter(Boolean);

  const education = [labelOf(EDUCATION_LEVELS, s2.education.degree_level), s2.education.major].filter(Boolean).join(" ");
  const story = s2.experience_story.trim();
  const storyPreview = story.length > STORY_PREVIEW_LENGTH ? `${story.slice(0, STORY_PREVIEW_LENGTH).replace(/[\s,.;:]+$/, "")}…` : story;

  return (
    <AssessmentCard
      step={4}
      title="Ringkasan Profil & Asesmen Anda"
      description="Periksa kembali jawaban Anda sebelum kami memproses rekomendasi karier hijau."
    >
      {!hydrated ? (
        <div className="mb-5 h-80 animate-pulse rounded-2xl bg-brand-light motion-reduce:animate-none" aria-hidden="true" />
      ) : incompleteSteps.length > 0 ? (
        <div className="mb-5 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-ink" role="status">
          <p className="font-bold">Beberapa jawaban belum lengkap.</p>
          <p className="mt-1">Lengkapi dulu langkah berikut sebelum memproses rekomendasi:</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {incompleteSteps.map((n) => (
              <li key={n}>
                <Link href={`/assessment/${n}`} className="inline-block rounded-full border border-brand px-3.5 py-1.5 font-semibold text-brand hover:bg-brand-light">
                  Langkah {n}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mb-5 divide-y divide-brand/15 rounded-2xl bg-brand-light px-5 sm:px-6">
          <SummaryGroup editHref="/assessment/1" editLabel="situasi karier">
            <Item label="Profil Anda">
              <p className="text-[15px] font-bold text-ink">{careerProfileLabel(s1)}</p>
            </Item>
          </SummaryGroup>

          <SummaryGroup editHref="/assessment/2" editLabel="latar belakang">
            <Item label="Latar belakang">
              <p className="text-sm leading-relaxed text-ink">
                {education}, {s2.education.institution}
                <br />
                {s2.city}, {s2.province} · {s2.open_to_relocate ? "Bersedia pindah kota" : "Tidak bersedia pindah kota"}
              </p>
            </Item>
            {s2.certifications.length > 0 ? (
              <Item label="Sertifikat">
                <p className="text-sm text-ink">
                  {s2.certifications.map((c) => (c.issuer ? `${c.name} (${c.issuer})` : c.name)).join(", ")}
                </p>
              </Item>
            ) : null}
            <Item label="Cerita pengalaman">
              <p className="text-sm italic leading-relaxed text-ink/85">“{storyPreview}”</p>
            </Item>
          </SummaryGroup>

          <SummaryGroup editHref="/assessment/3" editLabel="preferensi dan keahlian">
            <Item label="Bidang industri">
              <ul className="flex flex-wrap gap-2">
                {s3.interest_sectors.map((code) => (
                  <li key={code} className="rounded-lg border border-brand/15 bg-white px-2.5 py-1.5 text-[13px] text-ink">
                    {labelOf(SECTORS, code)}
                  </li>
                ))}
              </ul>
            </Item>
            <Item label="Pola kerja">
              <p className="text-[15px] font-bold text-ink">{WORK_LABELS[s3.work_arrangement]}</p>
            </Item>
            <Item label="Keahlian utama">
              <ul className="flex flex-wrap gap-2">
                {s3.skills.map((skill) => (
                  <li key={skill} className="rounded-lg bg-brand px-2.5 py-1.5 text-[13px] font-semibold text-white">
                    {skill}
                  </li>
                ))}
                {s3.custom_skills.map((skill) => (
                  <li key={`custom-${skill}`} className="rounded-lg border-[1.5px] border-dashed border-brand bg-white px-2.5 py-1 text-[13px] font-semibold text-brand">
                    {skill} <span className="font-normal text-ink/60">· di luar daftar</span>
                  </li>
                ))}
              </ul>
              {s3.custom_skills.length > 0 ? (
                <p className="mt-2 text-xs leading-relaxed text-ink/70">
                  Keahlian di luar daftar tetap tercatat, tetapi belum dihitung dalam skor kecocokan karena namanya belum ada di data lowongan.
                </p>
              ) : null}
            </Item>
            <Item label="Tingkat pengalaman">
              <p className="text-[15px] font-bold text-ink">{labelOf(EXPERIENCE_LEVELS, s3.experience_level)}</p>
            </Item>
          </SummaryGroup>
        </div>
      )}

      <div className="mb-6 flex gap-3 rounded-2xl border border-black/10 bg-surface p-4 text-[13px] leading-relaxed text-ink/85 sm:px-5">
        <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
        <p>
          <span className="font-bold text-ink">Apa yang terjadi setelah ini?</span> Setelah Anda menekan tombol di bawah, AI akan
          membaca cerita pengalaman Anda untuk mengenali keahlian tambahan, lalu sistem menghitung kecocokan dengan lowongan yang
          masih dibuka. Proses ini butuh sekitar 5–10 detik.
        </p>
      </div>

      <StepNav
        backHref="/assessment/3"
        nextLabel="Proses Rekomendasi"
        onNext={() => router.push("/assessment/loading")}
        disabled={!hydrated || incompleteSteps.length > 0}
      />
    </AssessmentCard>
  );
}

/** Satu kelompok jawaban (satu langkah) dengan tautan untuk mengubahnya. */
function SummaryGroup({ editHref, editLabel, children }) {
  return (
    <section className="relative py-5">
      <Link
        href={editHref}
        className="absolute right-0 top-5 inline-flex items-center gap-1 text-[13px] font-bold text-brand underline-offset-2 hover:underline"
      >
        <Pencil className="size-3.5" aria-hidden="true" />
        Ubah<span className="sr-only"> {editLabel}</span>
      </Link>
      <div className="flex flex-col gap-4 pr-16">{children}</div>
    </section>
  );
}

function Item({ label, children }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-bold text-brand">{label}</p>
      {children}
    </div>
  );
}
