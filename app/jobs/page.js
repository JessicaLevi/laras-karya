import Link from "next/link";
import { Sparkles } from "lucide-react";
import PublicShell from "@/components/layout/public-shell";
import PublicJobList from "@/components/jobs/public-job-list";
import { LOGIN_PATH, REGISTER_PATH } from "@/lib/routes";

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
          <p className="mt-3 text-slate-800">
            Jelajahi pekerjaan di sektor hijau. Untuk melihat detail lowongan, masuk atau buat akun terlebih dahulu.
          </p>

          <section aria-label="Ajakan mendaftar" className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-light p-5">
            <p className="flex items-start gap-2 text-sm text-slate-800">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              Daftar dan isi asesmen untuk melihat rekomendasi yang cocok dengan profil Anda.
            </p>
            <div className="flex gap-3">
              <Link href={REGISTER_PATH} className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90">
                Daftar
              </Link>
              <Link href={LOGIN_PATH} className="rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-white">
                Masuk
              </Link>
            </div>
          </section>

          <PublicJobList />
        </div>
      </main>
    </PublicShell>
  );
}