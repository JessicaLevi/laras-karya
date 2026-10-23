import Link from "next/link";
import { ArrowRight, Search, Lightbulb, TrendingUp, CircleCheck, Star } from "lucide-react";

const questions = [
  { icon: Search, title: "Apa yang cocok untuk saya?", text: "Jawab pertanyaan singkat tentang pengalaman dan minat Anda. Kami carikan pekerjaan hijau yang sesuai." },
  { icon: Lightbulb, title: "Mengapa ini cocok?", text: "Setiap rekomendasi disertai alasan: keterampilan Anda yang sudah sesuai dan yang belum." },
  { icon: TrendingUp, title: "Apa yang masih kurang?", text: "Lihat keterampilan yang perlu dilengkapi untuk pekerjaan yang Anda tuju." },
  { icon: CircleCheck, title: "Apa langkah selanjutnya?", text: "Temukan pelatihan yang tepat, siapkan CV, lalu lanjutkan melamar dan pantau statusnya." },
];

const steps = [
  { title: "Temukan", text: "Pekerjaan hijau yang cocok untuk Anda" },
  { title: "Siapkan", text: "Tutup kekurangan keterampilan dan lengkapi CV" },
  { title: "Melangkah", text: "Lamar di situs perusahaan dan pantau statusnya" },
];

const jobs = [
  { tag: "Energi Terbarukan", title: "Solar Panel Technician", company: "SuryaTerang Energi", mode: "Remote", open: true },
  { tag: "Konservasi", title: "Sustainability Officer", company: "Nusantara Hijau Group", mode: "Hybrid", open: true },
  { tag: "Pertanian Berkelanjutan", title: "Waste Management Analyst", company: "Daur Ulang Nusantara", mode: "On-site", open: true },
  { tag: "Ekonomi Hijau", title: "Bioeconomy Consultant", company: "Lestari Hijau Consult", mode: "Remote", open: true },
  { tag: "Pertanian Berkelanjutan", title: "Agroforestry Specialist", company: "Rimba Karya", mode: "On-site", open: true },
  { tag: "Konstruksi Hijau", title: "Green Building Architect", company: "Arsitektur Lestari", mode: "Hybrid", open: false },
];

export function Questions() {
  return (
    <section className="bg-brand-light">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8 py-16">
        <h2 className="text-center text-3xl font-bold text-brand">Empat pertanyaan yang kami bantu jawab</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {questions.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl bg-white p-6">
              <Icon className="h-5 w-5 text-brand" aria-hidden />
              <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-sm font-semibold text-slate-700">Perjalanan Anda bersama Laras Karya</p>
        <ol className="mx-auto mt-4 flex max-w-4xl flex-col items-stretch gap-3 md:flex-row md:items-center">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-1 items-center gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold text-brand">{s.title}</p>
                  <p className="text-xs text-slate-600">{s.text}</p>
                </div>
              </div>
              {i < steps.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-slate-500 md:block" aria-hidden />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Jobs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold text-ink">Peluang Karier Hijau untuk Anda</h2>
          <Link href="/recommended_jobs" className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            Lihat Semua <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <Link
              key={j.title}
              href="/recommended_jobs"
              className={`block rounded-2xl border border-slate-200 p-5 transition hover:border-brand ${j.open ? "" : "opacity-60"}`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">{j.tag}</span>
                <ArrowRight className="h-4 w-4 text-slate-500" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{j.title}</h3>
              <p className="text-sm text-slate-500">{j.company}</p>
              <div className="mt-4 flex gap-2 text-xs">
                <span className="rounded-full px-3 py-1 text-slate-500">{j.mode}</span>
                <span className={`rounded-full px-3 py-1 ${j.open ? "bg-brand-light text-brand" : "bg-slate-100 text-slate-600"}`}>
                  {j.open ? "Dibuka" : "Ditutup"}
                </span>
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
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8 py-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand p-8 md:flex-row md:items-center md:p-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-ai">
              <Star className="h-3 w-3" aria-hidden /> ASESMEN SINGKAT
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white">Temukan Kecocokan Karier Anda</h2>
            <p className="mt-4 leading-relaxed text-emerald-100/80">
              Jawab beberapa pertanyaan singkat dan dapatkan rekomendasi karier hijau yang sesuai dengan pengalaman Anda.
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
