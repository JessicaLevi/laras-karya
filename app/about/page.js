import Link from "next/link";
import { ArrowRight, Briefcase, ClipboardList, FileCheck, GraduationCap, Sparkles, Target, UserPlus } from "lucide-react";

import { VisionMissionTabs } from "@/components/about/vision-mission-tabs";
import PublicShell from "@/components/layout/public-shell";
//import Navbar from "@/components/landing/navbar";   // ← aktifkan sesuai komponen header landing page tim
//import Footer from "@/components/landing/footer";   // ← aktifkan sesuai komponen footer landing page tim

export const metadata = {
  title: "Tentang Kami | Laras Karya",
  description: "Laras Karya menghubungkan talenta perempuan Indonesia dengan peluang karier berkelanjutan di sektor ekonomi hijau.",
};

const STEPS = [
  { id: "s1", icon: ClipboardList, title: "Kenali diri Anda", text: "Asesmen singkat untuk memahami minat, keterampilan, pengalaman, dan preferensi kerja." },
  { id: "s2", icon: Briefcase, title: "Temukan green jobs", text: "Rekomendasi pekerjaan hijau lengkap dengan skor kecocokan dan alasannya." },
  { id: "s3", icon: Target, title: "Pahami skill gap", text: "Lihat keterampilan yang sudah Anda miliki dan yang masih perlu dikembangkan." },
  { id: "s4", icon: GraduationCap, title: "Kembangkan keterampilan", text: "Pelatihan relevan yang dipilih berdasarkan kesenjangan keterampilan Anda." },
  { id: "s5", icon: FileCheck, title: "Siap melamar", text: "Persiapkan CV dan pantau status lamaran di satu tempat." },
];

export default function AboutPage() {
  return (
    <PublicShell active="/about">
    <div className="bg-slate-50/50 text-slate-800 selection:bg-green-200 selection:text-green-900">
      {/*<Navbar />*/}

      <main>
        {/* HERO */}
        <section
          aria-labelledby="about-title"
          className="relative overflow-hidden py-16 sm:py-24 lg:py-28"
          style={{ backgroundImage: "linear-gradient(180deg, #e6f4ea 0%, #f4faf6 50%, #ffffff 100%)" }}
        >
          <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100/80 px-4 py-1.5 text-xs font-semibold text-green-800 shadow-sm sm:text-sm">
                <span aria-hidden="true" className="flex size-2 animate-ping rounded-full bg-green-500" />
                <Sparkles className="size-4 text-green-600" aria-hidden="true" />
                <span>Tentang Laras Karya</span>
              </div>

              <h1 id="about-title" className="text-4xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Membangun Masa Depan Hijau Bersama{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #064E3B 0%, #16A34A 100%)" }}
                >
                  Perempuan Indonesia
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
                Laras Karya menghubungkan talenta perempuan Indonesia dengan peluang karir berkelanjutan di sektor <i>green economy</i>, teknologi ramah lingkungan, dan keberlanjutan iklim.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/jobs"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-base font-bold text-slate-700 shadow-sm transition-all duration-200 hover:border-green-300 hover:bg-slate-50 sm:w-auto"
                >
                  <Briefcase className="size-5 text-green-600" aria-hidden="true" />
                  <span>Jelajahi Lowongan</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* VISI & MISI */}
        <section id="vision-mission" aria-labelledby="vm-title" className="bg-white py-20">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-pink-700">Landasan Kami</p>
              <h2 id="vm-title" className="mt-2 text-3xl font-bold text-brand sm:text-4xl">
                Visi &amp; Misi Laras Karya
              </h2>
              <p className="mt-4 text-slate-600">
                Komitmen kami dalam mentransformasi lanskap tenaga kerja Indonesia menuju era keberlanjutan lingkungan.
              </p>
            </div>
            <VisionMissionTabs />
          </div>
        </section>

        {/* CARA KERJA */}
        <section aria-labelledby="steps-title" className="border-y border-emerald-100/60 bg-emerald-50/40 py-20">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-pink-700">Cara kerja</p>
              <h2 id="steps-title" className="mt-2 text-3xl font-bold text-brand sm:text-4xl">
                Lima langkah menuju pekerjaan hijau
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Dari mengenali diri sendiri sampai melamar, setiap langkah terhubung dan memakai data profil Anda.
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
              {STEPS.map(({ id, icon: Icon, title, text }, i) => (
                <li
                  key={id}
                  className="group flex min-h-[220px] flex-col justify-between rounded-2xl border border-[#e2eae5] bg-[#f4f8f6] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-900/10 lg:p-6 sm:last:col-span-2 lg:last:col-span-1"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#055c43] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <span aria-hidden="true" className="text-2xl font-bold tracking-tight text-[#b5cdcf] transition-colors duration-300 group-hover:text-emerald-700">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-emerald-900">
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

        {/* CTA */}
        <section aria-labelledby="cta-title" className="bg-transparent py-20">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="cta-title" className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                Siap Memulai Perjalanan Karier Hijau Anda?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                “Temukan pekerjaan hijau yang selaras dengan dirimu, dan berkarya untuk lingkungan serta pembangunan berkelanjutan”
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-brand/90"
                >
                  <span>Daftar sebagai Talenta</span>
                  <UserPlus className="size-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/employer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-base font-bold text-slate-700 transition-all duration-200 hover:border-green-300  hover:bg-slate-50"
                >
                  <span>Mitra Perusahaan</span>
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/*<footer/>*/}
    </div>
    </PublicShell>
  );
}
