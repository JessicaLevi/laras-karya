/*export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Beranda</h1>
    </main>
  );
}*/

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AlertBanner } from "@/components/home/alert-banner";
import { CourseCard } from "@/components/home/course-card";
import { RecommendedJobs } from "@/components/home/recommended-jobs";
import { WelcomeBanner } from "@/components/home/welcome-banner";
//import { Navbar } from "@/components/layout/navbar";
import { StatCard } from "@/components/ui/stat-card";
import { HOME_ALERT, HOME_STATS, HOME_USER, MOCK_COURSES, MOCK_JOBS } from "@/lib/home-data";

export const metadata = {
  title: "Beranda | Laras Karya",
};

/* Beranda / dashboard. Server component; hanya RecommendedJobs yang client (tombol update). */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* <Navbar /> */}

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1200px] space-y-6 px-4 py-6 md:px-6 md:py-8 xl:px-8">
          <WelcomeBanner {...HOME_USER} />

          {/* Mobile: 2 kolom · Tablet & desktop: 4 kolom */}
          <section aria-label="Ringkasan" className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {HOME_STATS.map(({ id, ...stat }) => (
              <StatCard key={id} {...stat} />
            ))}
          </section>

          <RecommendedJobs jobs={MOCK_JOBS} />
        </div>

        {/* Pita hijau lembut selebar layar */}
        <section aria-labelledby="courses-title" className="mt-4 bg-mint">
          <div className="mx-auto w-full max-w-[1200px] space-y-4 px-4 py-8 md:px-6 xl:px-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="courses-title" className="text-base font-bold text-ink md:text-lg">
                  Pelatihan untuk Menutup Skill Gap Anda
                </h2>
                <p className="mt-0.5 text-xs text-ink/75">
                  Rekomendasi program pelatihan terkurasi AI untuk meningkatkan peluang lolos lamaran impian.
                </p>
              </div>
              <Link href="/learning-path" className="inline-flex min-h-11 items-center gap-1 text-xs font-bold text-brand hover:underline md:min-h-0">
                Lihat Semua <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {MOCK_COURSES.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6 xl:px-8">
          <AlertBanner {...HOME_ALERT} />
        </div>
      </main>

      <footer className="border-t border-line bg-white">
        <p className="mx-auto max-w-[1200px] px-4 py-5 text-center text-[11px] text-ink/70 md:px-6 xl:px-8">
          © 2026 Laras Karya. Platform Karir Sektor Hijau untuk Perempuan Indonesia.
        </p>
      </footer>
    </div>
  );
}

