import Link from "next/link";
import SavedJobs from "@/components/bookmarks/saved-jobs";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Lowongan Tersimpan | Laras Karya",
  description: "Daftar pekerjaan hijau yang Anda tandai untuk dilamar nanti.",
};

export default function BookmarksPage() {
  return (
    <main className="flex-1 bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8 pb-16 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <Link href="/home" className="hover:underline">Beranda</Link> /{" "}
          <Link href="/jobs" className="hover:underline">Lowongan</Link> /{" "}
          <span aria-current="page">Tersimpan</span>
        </nav>

        <SavedJobs />
      </div>

      <Footer />
    </main>
  );
}
