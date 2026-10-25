import Link from "next/link";
import {
  ArrowRight,
  Search,
  Lightbulb,
  TrendingUp,
  CircleCheck,
  Star,
} from "lucide-react";

import { CompanyAvatar } from "@/components/ui/company-avatar";

const questions = [
  {
    icon: Search,
    title: "Apa yang cocok untuk saya?",
    text: "Kami carikan pekerjaan hijau yang sesuai dengan pengalaman Anda.",
  },
  {
    icon: Lightbulb,
    title: "Mengapa ini cocok?",
    text: "Setiap rekomendasi disertai alasan yang jelas.",
  },
  {
    icon: TrendingUp,
    title: "Apa yang masih kurang?",
    text: "Lihat keterampilan yang perlu dilengkapi.",
  },
  {
    icon: CircleCheck,
    title: "Apa langkah selanjutnya?",
    text: "Temukan pelatihan, siapkan CV, lalu lamar dan pantau statusnya.",
  },
];

const jobs = [
  {
    tag: "Energi Terbarukan",
    title: "Solar Panel Technician",
    company: "SuryaTerang Energi",
    place: "Surabaya · On-site",
    salary: "Rp 6–8 juta/bln",
  },
  {
    tag: "Konservasi",
    title: "Sustainability Officer",
    company: "Nusantara Hijau Group",
    place: "Jakarta · Hybrid",
    salary: "Rp 8–12 juta/bln",
  },
  {
    tag: "Ekonomi Hijau",
    title: "Waste Management Analyst",
    company: "Daur Ulang Nusantara",
    place: "Semarang · Hybrid",
    salary: "Rp 7–10 juta/bln",
  },
  {
    tag: "Ekonomi Hijau",
    title: "Bioeconomy Consultant",
    company: "Lestari Hijau Consult",
    place: "Remote",
    salary: "Rp 9–13 juta/bln",
  },
  {
    tag: "Agroforestri",
    title: "Agroforestry Specialist",
    company: "Rimba Karya",
    place: "Bogor · On-site",
    salary: "Rp 7–9 juta/bln",
  },
  {
    tag: "Bangunan Hijau",
    title: "Green Building Architect",
    company: "Arsitektur Lestari",
    place: "Bandung · Hybrid",
    salary: "Rp 9–14 juta/bln",
  },
];

export function Questions() {
  return (
    <section className="bg-brand-light">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 xl:px-8">
        <h2 className="text-3xl font-bold text-ink">
          Empat pertanyaan yang kami bantu jawab
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {questions.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mint-line transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-light text-brand">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug text-ink lg:min-h-[3.25rem]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Jobs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-6 xl:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <h2 className="text-3xl font-bold text-ink">
              Contoh Peluang Karier Hijau
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Selesaikan asesmen untuk melihat lowongan yang cocok dengan profil
              Anda.
            </p>
          </div>
          <Link
            href="/jobs"
            className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-brand hover:underline"
          >
            Lihat Semua <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <Link
              key={j.title}
              href="/jobs"
              className="flex items-start gap-3 rounded-2xl border border-slate-200 p-5 transition hover:border-brand"
            >
              <CompanyAvatar
                company={j.company}
                sector={j.tag}
                className="h-10 w-10 text-sm"
              />
              <div className="min-w-0">
                <h3 className="text-lg font-bold leading-snug text-ink">
                  {j.title}
                </h3>
                <p className="text-sm text-slate-600">{j.company}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="text-slate-600">{j.place}</span>
                  <span className="font-semibold text-brand">{j.salary}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 xl:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand p-8 md:flex-row md:items-center md:p-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-ai">
              <Star className="h-3 w-3" aria-hidden /> ASESMEN 5 MENIT
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Temukan Kecocokan Karier Anda
            </h2>
            <p className="mt-4 text-balance leading-relaxed text-emerald-100/80">
              Lima menit untuk rekomendasi karier hijau yang disusun dari
              pengalaman Anda.
            </p>
          </div>
          <Link
            href="/assessment"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand transition hover:bg-emerald-50"
          >
            Mulai Asesmen Gratis
          </Link>
        </div>
      </div>
    </section>
  );
}
