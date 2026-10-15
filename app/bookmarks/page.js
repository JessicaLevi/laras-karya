import Link from "next/link";
import SavedJobs from "@/components/bookmarks/saved-jobs";

export const metadata = {
  title: "Lowongan Tersimpan | Laras Karya",
  description: "Daftar pekerjaan hijau yang Anda tandai untuk dilamar nanti.",
};

export default function BookmarksPage() {
  return (
    <main className="flex-1 bg-surface">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <Link href="/home" className="hover:underline">Beranda</Link> /{" "}
          <Link href="/jobs" className="hover:underline">Lowongan</Link> /{" "}
          <span aria-current="page">Tersimpan</span>
        </nav>

        <SavedJobs />
      </div>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © 2026 Laras Karya. Platform Karier Sektor Hijau untuk Perempuan Indonesia.
      </footer>
    </main>
  );
}
