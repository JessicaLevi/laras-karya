import PublicShell from "@/components/layout/public-shell";
import PublicJobList from "@/components/jobs/public-job-list";

export const metadata = {
  title: "Lowongan Karier Hijau | Laras Karya",
  description: "Jelajahi lowongan sektor hijau. Daftar untuk melihat detail dan rekomendasi yang cocok dengan profil Anda.",
};

export default function PublicJobsPage() {
  return (
    <PublicShell active="/jobs">
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 md:px-6 xl:px-8">
          <h1 className="text-3xl font-bold text-brand md:text-4xl">Lowongan Karier Hijau</h1>
          <p className="mt-3 max-w-3xl text-balance text-slate-800">
            Ini contoh satu rekomendasi. Daftar dan isi asesmen untuk melihat lowongan yang cocok dengan profil Anda.
          </p>
          <PublicJobList />
        </div>
      </main>
    </PublicShell>
  );
}