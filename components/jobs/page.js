import Link from "next/link";
import { Sparkles } from "lucide-react";
import JobList from "@/components/jobs/job-list";

export const metadata = {
  title: "Rekomendasi Karier Hijau | Laras Karya",
  description: "Pekerjaan sektor hijau yang paling cocok dengan profil Anda, berdasarkan hasil asesmen.",
};

export default function JobsPage() {
  return (
    <main className="flex-1 bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8 pb-16 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <Link href="/home" className="hover:underline">Beranda</Link> / <span>Rekomendasi Karier</span>
        </nav>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-brand md:text-4xl">Rekomendasi Karier Hijau Anda</h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-ai/10 px-3 py-1 text-xs font-semibold text-ai">
            <Sparkles className="h-3 w-3" aria-hidden /> Dicocokkan oleh AI
          </span>
        </div>
        <p className="mt-3 text-slate-800">
          Berdasarkan hasil asesmen, berikut pekerjaan yang paling cocok dengan profil Anda.
        </p>

        <JobList />
      </div>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © 2026 Laras Karya. Platform Karier Sektor Hijau untuk Perempuan Indonesia.
      </footer>
    </main>
  );
}
