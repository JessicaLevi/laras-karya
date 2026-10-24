import Link from "next/link";
import { Check } from "lucide-react";

/*
  Latar foto: taruh gambar di public/images/hero-home.jpg (export dari Figma).
  Jika file belum ada, banner tetap tampil dengan warna hijau.

  Cara menyetel posisi foto: ubah angka pada bg-[position:X%_Y%]
  - Y kecil = bagian atas foto lebih terlihat (kepala), Y besar = bagian bawah lebih terlihat
  - X besar = fokus ke sisi kanan foto
*/
export function WelcomeBanner({ firstName, profileCompleteness, matchedJobs }) {
  const summary = [
    `Profil ${profileCompleteness}% lengkap`,
    `${matchedJobs} lowongan cocok`,
    "Rekomendasi diperbarui otomatis",
  ];

  return (
    <section
      aria-labelledby="welcome-title"
      className="relative overflow-hidden rounded-2xl bg-brand"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-[position:75%_35%] md:bg-[position:65%_32%]"
        style={{ backgroundImage: "url('/images/hero-home.jpg')" }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/85 to-brand/60 md:from-brand/95 md:via-brand/75 md:via-45% md:to-brand/0 md:to-75%"
      />

      <div className="relative flex min-h-[260px] max-w-xl flex-col items-start justify-center gap-3 px-6 py-8 md:min-h-[300px] md:px-10 xl:min-h-[340px] xl:px-12">
        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-brand">
          Halo, {firstName}
        </span>
        <h1
          id="welcome-title"
          className="text-[26px] font-bold leading-tight text-white md:text-3xl"
        >
          Selamat datang kembali, {firstName}!
        </h1>
        <p className="max-w-md text-sm text-white/90">
          Temukan peluang kerja hijau yang paling sesuai dengan profil dan minat
          terbaru Anda.
        </p>
        <Link
          href="/profile"
          className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-bold text-brand transition-colors hover:bg-brand-light md:min-h-10"
        >
          Lengkapi Profil
        </Link>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/90">
          {summary.map((s) => (
            <li key={s} className="flex items-center gap-1">
              <Check className="size-3" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
