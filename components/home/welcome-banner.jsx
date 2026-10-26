import Link from "next/link";

import { HomeSearch } from "@/components/home/home-search";

/*
  Latar foto: taruh gambar di public/images/hero-home.jpg (export dari Figma).
  Jika file belum ada, banner tetap tampil dengan warna hijau.

  Cara menyetel posisi foto: ubah angka pada bg-[position:X%_Y%]
  - Y kecil = bagian atas foto lebih terlihat (kepala), Y besar = bagian bawah lebih terlihat
  - X besar = fokus ke sisi kanan foto
*/
export function WelcomeBanner({ firstName, profileCompleteness, matchedJobs }) {
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

      <div className="relative flex min-h-[240px] max-w-xl flex-col items-start justify-center gap-4 px-6 py-7 md:min-h-[280px] md:px-10 xl:min-h-[300px] xl:px-12">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand">
          Selamat datang kembali, {firstName}
        </span>
        <h1
          id="welcome-title"
          className="text-[26px] font-bold leading-tight text-white md:text-3xl"
        >
          {matchedJobs > 0
            ? `Ada ${matchedJobs} lowongan hijau yang cocok untuk Anda`
            : "Selesaikan asesmen untuk melihat lowongan yang cocok"}
        </h1>
        <HomeSearch />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link
            href="/recommended-jobs"
            className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-bold text-brand transition-colors hover:bg-brand-light md:min-h-10"
          >
            Lihat Lowongan Cocok
          </Link>
          <Link
            href="/profile"
            className="inline-flex min-h-11 items-center rounded-full border border-white/70 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:min-h-10"
          >
            Lengkapi Profil ({profileCompleteness}%)
          </Link>
        </div>
      </div>
    </section>
  );
}
