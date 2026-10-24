import PublicShell from "@/components/layout/public-shell";
import PublicJobList from "@/components/jobs/public-job-list";
import { PageBanner } from "@/components/ui/page-banner";

export const metadata = {
  title: "Lowongan Karier Hijau | Laras Karya",
  description:
    "Jelajahi lowongan sektor hijau. Daftar untuk melihat detail dan rekomendasi yang cocok dengan profil Anda.",
};

export default function PublicJobsPage() {
  return (
    <PublicShell active="/jobs">
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 md:px-6 xl:px-8">
          <PageBanner
            image="/images/banner-jobs.jpg"
            title="Lowongan Karier Hijau"
          >
            Ini contoh satu rekomendasi. Daftar dan isi asesmen untuk melihat
            lowongan yang cocok dengan profil Anda.
          </PageBanner>
          <PublicJobList />
        </div>
      </main>
    </PublicShell>
  );
}
