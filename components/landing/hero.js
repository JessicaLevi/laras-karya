import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sun,
  TreePine,
  Sprout,
  Building2,
  Recycle,
  Users,
  RefreshCw,
} from "lucide-react";

const sectors = [
  { icon: Sun, label: "Energi Terbarukan" },
  { icon: TreePine, label: "Konservasi" },
  { icon: Sprout, label: "Agroforestri" },
  { icon: Building2, label: "Bangunan Hijau" },
  { icon: Recycle, label: "Ekonomi Hijau" },
];

// Angka dari Bappenas, Peta Jalan Pengembangan Tenaga Kerja Hijau Indonesia (proyeksi).
const stats = [
  {
    icon: Users,
    label: "Tenaga kerja hijau di Indonesia",
    value: "5,3 juta+",
    text: "Proyeksi 2029, naik dari 4 juta pada 2025.",
  },
  {
    icon: RefreshCw,
    label: "Pekerjaan yang berpotensi menjadi hijau",
    value: "72 juta",
    text: "Proyeksi 2029, naik dari 56 juta pada 2025.",
  },
];

export default function Hero() {
  return (
    <>
      <section id="tentang" className="overflow-clip bg-surface">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 md:grid-cols-[7fr_5fr] md:px-6 md:py-12 xl:px-8">
          <div>
            <span className="inline-block rounded-full bg-brand-light px-3 py-1.5 text-xs font-semibold text-brand">
              Platform Karier Hijau untuk Perempuan
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-balance text-brand md:text-5xl">
              Wujudkan Karier Bermakna di Sektor Hijau
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-800">
              Jawab beberapa pertanyaan, lalu dapatkan lowongan hijau yang cocok
              beserta penjelasan dan pelatihannya.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/assessment"
                className="cta-shine group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white transition hover:bg-brand/90"
              >
                Mulai Asesmen Gratis{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-brand underline underline-offset-4"
              >
                Sudah punya akun? Masuk
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
              {["5 menit", "Rekomendasi AI personal"].map((t) => (
                <li key={t} className="flex items-center gap-1">
                  <Check className="h-3 w-3" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md md:ml-auto md:mr-0 md:max-w-[400px] xl:max-w-[440px]">
            {/* Lingkaran dekoratif di belakang foto; dipotong di batas section oleh overflow-clip */}
            <div
              className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand-light"
              aria-hidden
            />
            <div
              className="absolute -bottom-10 -left-12 h-72 w-72 rounded-full bg-secondary-light"
              aria-hidden
            />

            {/* Bingkai persegi 1:1; fotonya juga 1:1 (public/images/hero-green-jobs.jpg) */}
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-200 to-emerald-500">
              <Image
                src="/images/hero-green-jobs.jpg"
                alt="Tiga perempuan profesional di sektor hijau: menanam bibit, membawa laptop, dan memegang tablet"
                fill
                sizes="(min-width: 1280px) 440px, (min-width: 768px) 400px, 100vw"
                className="object-cover object-center"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-6 text-center md:px-6 xl:px-8">
          <p className="text-sm font-medium text-slate-700">
            Sesuai untuk Anda yang berpindah karier, belajar dari pengalaman praktik, atau
            baru memulai
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 text-slate-600">
            {sectors.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <Icon className="h-4 w-4" aria-hidden /> {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-14 md:px-6 xl:px-8">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-slate-200">
            {stats.map(({ icon: Icon, label, value, text }) => (
              <div
                key={label}
                className="flex flex-col items-center px-4 text-center md:px-10"
              >
                <Icon className="h-6 w-6 text-brand" aria-hidden />
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  {label}
                </p>
                <p className="mt-1 text-4xl font-bold leading-tight text-brand md:text-5xl">
                  {value}
                </p>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-slate-600">
            Sumber: Bappenas, Peta Jalan Pengembangan Tenaga Kerja Hijau
            Indonesia. Angka 5,3 juta berlaku untuk skenario pertumbuhan ekonomi
            tinggi.
          </p>
        </div>
      </section>
    </>
  );
}
