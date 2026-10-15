import Link from "next/link";
import { ArrowRight, Check, Sun, TreePine, Sprout, Building2, Recycle } from "lucide-react";

const sectors = [
  { icon: Sun, label: "Energi Terbarukan" },
  { icon: TreePine, label: "Konservasi" },
  { icon: Sprout, label: "Agroforestri" },
  { icon: Building2, label: "Bangunan Hijau" },
  { icon: Recycle, label: "Ekonomi Hijau" },
];

export default function Hero() {
  return (
    <>
      <section id="tentang" className="bg-surface">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 md:px-6 xl:px-8 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-brand-light px-3 py-1.5 text-xs font-semibold text-brand">
              Platform Karier Hijau untuk Perempuan
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-brand md:text-5xl">
              Wujudkan Karier Bermakna di Sektor Green Jobs
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-800">
              Temukan peluang karier di sektor lingkungan dan keberlanjutan yang sesuai dengan
              keahlian Anda. Platform khusus perempuan yang ingin bertumbuh di ekonomi hijau.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
              >
                Mulai Asesmen Singkat <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/login" className="text-sm font-medium text-brand underline underline-offset-4">
                Sudah punya akun? Masuk
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              {["Gratis", "5 menit", "Rekomendasi AI personal"].map((t) => (
                <li key={t} className="flex items-center gap-1">
                  <Check className="h-3 w-3" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="absolute -right-6 -top-8 h-64 w-64 rounded-full bg-brand-light" aria-hidden />
            <div className="absolute -bottom-10 -left-8 h-72 w-72 rounded-full bg-secondary-light" aria-hidden />
            <div className="relative aspect-[1.09/1] overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-200 to-emerald-500">
              {/* Taruh foto di public/images/hero-green-jobs.jpg */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-green-jobs.jpg"
                alt="Perempuan profesional bekerja di bidang lingkungan dan energi hijau"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8 py-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            Peluang green jobs untuk perempuan yang berpindah karier, belajar dari pengalaman praktik, atau baru memulai
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 text-slate-500">
            {sectors.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-semibold">
                <Icon className="h-4 w-4" aria-hidden /> {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-12 text-center">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-3xl font-bold text-brand">4 juta → lebih dari 5,3 juta</p>
              <p className="mt-1 text-sm text-slate-700">Tenaga kerja hijau di Indonesia, 2025 ke 2029</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand">56 juta → 72 juta</p>
              <p className="mt-1 text-sm text-slate-700">Pekerjaan berpotensi ditransformasikan, hingga 2029</p>
            </div>
          </div>
          <p className="mt-8 text-xs text-slate-500">Sumber: Bappenas, Green Jobs Roadmap</p>
        </div>
      </section>
    </>
  );
}
