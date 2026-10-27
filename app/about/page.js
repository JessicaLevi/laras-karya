import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ClipboardList,
  FileCheck,
  GraduationCap,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { VisionMissionTabs } from "@/components/about/vision-mission-tabs";
import PublicShell from "@/components/layout/public-shell";

export const metadata = {
  title: "Tentang Kami | Laras Karya",
  description:
    "Laras Karya menjembatani talenta perempuan Indonesia dengan peluang karier berkelanjutan di sektor ekonomi hijau.",
};

const STEPS = [
  {
    id: "s1",
    icon: ClipboardList,
    title: "Kenali Potensi Diri",
    text: "Asesmen singkat untuk memetakan minat, keterampilan, dan preferensi kerja Anda di sektor hijau.",
  },
  {
    id: "s2",
    icon: Search,
    title: "Temukan Lowongan Hijau",
    text: "Rekomendasi pekerjaan yang relevan lengkap dengan skor kecocokan berbasis AI.",
  },
  {
    id: "s3",
    icon: TrendingUp,
    title: "Pahami Kesenjangan Skill",
    text: "Ketahui keterampilan yang sudah Anda kuasai serta aspek yang masih perlu dikembangkan.",
  },
  {
    id: "s4",
    icon: GraduationCap,
    title: "Kembangkan Keterampilan",
    text: "Akses rekomendasi pelatihan terkurasi yang disesuaikan dengan kebutuhan karier Anda.",
  },
  {
    id: "s5",
    icon: FileCheck,
    title: "Lamar & Pantau Status",
    text: "Persiapkan CV terbaik Anda, kirim lamaran langsung, dan pantau hasilnya dalam satu tempat.",
  },
];

export default function AboutPage() {
  return (
    <PublicShell active="/about">
      <main className="bg-surface text-ink">
        {/* HERO */}
        <section
          aria-labelledby="about-title"
          className="relative overflow-hidden bg-surface py-16 sm:py-20 lg:py-24"
        >
          {/* Subtle background decorative accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-light blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary-light blur-2xl"
          />

          <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-3.5 py-1.5 text-xs font-semibold text-brand">
                <Sparkles className="size-3.5 text-brand" aria-hidden="true" />
                <span>Tentang Laras Karya</span>
              </span>

              <h1
                id="about-title"
                className="mt-5 text-4xl font-bold leading-tight tracking-tight text-balance text-ink sm:text-5xl md:text-6xl"
              >
                Membangun Masa Depan Hijau Bersama{" "}
                <span className="text-brand">Perempuan Indonesia</span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg md:text-xl">
                Laras Karya menjembatani talenta perempuan Indonesia menuju peluang karier bermakna di sektor ekonomi hijau, teknologi ramah lingkungan, dan keberlanjutan iklim.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90"
                >
                  <span>Mulai Asesmen Gratis</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-brand hover:bg-brand-light/40"
                >
                  <Briefcase className="size-4 text-brand" aria-hidden="true" />
                  <span>Jelajahi Lowongan</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* VISI & MISI */}
        <section id="vision-mission" aria-labelledby="vm-title" className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="inline-block rounded-full bg-brand-light px-3.5 py-1 text-xs font-semibold text-brand">
                Landasan Kami
              </span>
              <h2 id="vm-title" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Visi &amp; Misi Laras Karya
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Komitmen kami dalam mentransformasi lanskap ketenagakerjaan Indonesia menuju era keberlanjutan lingkungan dan kesetaraan kesempatan.
              </p>
            </div>
            <VisionMissionTabs />
          </div>
        </section>

        {/* CARA KERJA */}
        <section aria-labelledby="steps-title" className="border-y border-line bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="inline-block rounded-full bg-brand-light px-3.5 py-1 text-xs font-semibold text-brand">
                Alur Platform
              </span>
              <h2 id="steps-title" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Lima langkah menuju karier hijau
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                Dari mengenali potensi diri sampai melamar pekerjaan, setiap langkah terintegrasi dan didukung rekomendasi personal Anda.
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
              {STEPS.map(({ id, icon: Icon, title, text }, i) => (
                <li
                  key={id}
                  className="group flex min-h-[220px] flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-sm ring-1 ring-mint-line/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md lg:p-6 sm:last:col-span-2 lg:last:col-span-1"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <span aria-hidden="true" className="text-2xl font-bold tracking-tight text-slate-300 transition-colors duration-300 group-hover:text-brand">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-brand">
                      <span className="sr-only">Langkah {i + 1}: </span>
                      {title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600 lg:text-sm">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA BANNER */}
        <section aria-labelledby="cta-title" className="bg-surface py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8">
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-brand p-8 md:flex-row md:items-center md:p-14">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-emerald-100 backdrop-blur">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Mulai Bersama Laras Karya
                </span>
                <h2 id="cta-title" className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Siap Memulai Perjalanan Karier Hijau Anda?
                </h2>
                <p className="mt-3 text-balance leading-relaxed text-emerald-100/90 sm:text-lg">
                  Temukan pekerjaan hijau yang selaras dengan potensi Anda, dan bersama-sama berkarya demi masa depan bumi yang berkelanjutan.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand shadow-sm transition hover:bg-emerald-50"
                >
                  <span>Mulai Asesmen Gratis</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/employer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <Building2 className="size-4" aria-hidden="true" />
                  <span>Mitra Perusahaan</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
