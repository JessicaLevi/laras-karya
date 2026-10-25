import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CourseCard } from "@/components/home/course-card";
import { RecentApplications } from "@/components/home/recent-applications";
import { RecommendedJobs } from "@/components/home/recommended-jobs";
import { WelcomeBanner } from "@/components/home/welcome-banner";
import { Footer } from "@/components/layout/footer";
import {
  HOME_ALERT,
  HOME_USER,
  MOCK_COURSES,
  MOCK_JOBS,
} from "@/lib/home-data";

export const metadata = {
  title: "Beranda | Laras Karya",
};

/* Beranda / dashboard. Server component; hanya RecommendedJobs yang client (tombol perbarui). */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1200px] space-y-10 px-4 py-6 md:space-y-12 md:px-6 md:py-8 xl:px-8">
          <WelcomeBanner {...HOME_USER} />
          <RecommendedJobs jobs={MOCK_JOBS} />
          <RecentApplications />
        </div>

        {/* Pita hijau lembut selebar layar */}
        <section aria-labelledby="courses-title" className="mt-4 bg-mint">
          <div className="mx-auto w-full max-w-[1200px] space-y-5 px-4 py-10 md:px-6 xl:px-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  id="courses-title"
                  className="text-base font-bold text-ink md:text-lg"
                >
                  Pelatihan untuk Menutup Skill Gap Anda
                </h2>
                <p className="mt-0.5 text-xs text-ink/75">
                  <span className="font-bold text-ai">Saran AI:</span>{" "}
                  selesaikan{" "}
                  <strong className="font-bold text-ai">
                    {HOME_ALERT.skill}
                  </strong>{" "}
                  untuk menaikkan kecocokan di lowongan teratas hingga{" "}
                  <strong className="font-bold text-ai">
                    {HOME_ALERT.targetMatch}
                  </strong>
                  .
                </p>
              </div>
              <Link
                href="/learning-path"
                className="inline-flex min-h-11 items-center gap-1 text-xs font-bold text-brand hover:underline md:min-h-0"
              >
                Lihat Semua Pelatihan{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {MOCK_COURSES.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
