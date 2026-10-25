import { Suspense } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import JobList, { JobListFromUrl } from "@/components/jobs/job-list";
import { Footer } from "@/components/layout/footer";
import { PageBanner } from "@/components/ui/page-banner";

export const metadata = {
  title: "Rekomendasi Karier Hijau | Laras Karya",
  description:
    "Pekerjaan sektor hijau yang paling cocok dengan profil Anda, berdasarkan hasil asesmen.",
};

export default function RecommendedJobsPage() {
  return (
    <main className="flex-1 bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8 pb-16 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <Link href="/home" className="hover:underline">
            Beranda
          </Link>{" "}
          / <span>Rekomendasi Karier</span>
        </nav>

        <div className="mt-3">
          <PageBanner
            image="/images/banner-jobs.jpg"
            badge={
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ai">
                <Sparkles className="h-3 w-3" aria-hidden /> Berdasarkan hasil
                asesmen
              </span>
            }
            title="Rekomendasi Karier Hijau Anda"
          >
            Pekerjaan hijau yang paling cocok dengan profil Anda.
          </PageBanner>
        </div>

        {/* JobListFromUrl membaca ?q= dari URL; selama itu, daftar tanpa pencarian tampil lebih dulu */}
        <Suspense fallback={<JobList />}>
          <JobListFromUrl />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
