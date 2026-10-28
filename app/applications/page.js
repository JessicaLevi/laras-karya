import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { ChevronRight } from "lucide-react";

// ⬇️ DIUBAH: ApplicationHistory sekarang dipakai lewat ApplicationsView (kartu statistik + riwayat berbagi filter)
import { ApplicationsView } from "@/components/applications/applications-view";
import { DocumentPrepBanner } from "@/components/applications/document-prep-banner";
//import { Navbar } from "@/components/layout/navbar";
// ⬇️ DIHAPUS: import StatCard dan STAT_CARDS (dipindah ke ApplicationsView)
import { MOCK_APPLICATIONS } from "@/lib/applications-data";

export const metadata = {
  title: "Lamaran Saya & Status Tracker | Laras Karya",
};

/* F05 · application-tracker. Server component; hanya riwayat yang client (filter & pagination). */
export default function ApplicationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* <Navbar /> */}

      <main className="mx-auto w-full max-w-[1200px] flex-1 space-y-6 px-4 py-6 md:px-6 md:py-8 xl:px-8">
        <header className="space-y-2">
          <nav aria-label="Breadcrumb" className="text-xs text-ink/70">
            <ol className="flex items-center gap-1">
              <li>
                <Link href="/home" className="hover:text-brand hover:underline">Beranda</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3" />
              </li>
              <li aria-current="page">Lamaran Saya</li>
            </ol>
          </nav>
          <h1 className="text-2xl font-bold text-brand md:text-[26px]">Lamaran Saya &amp; Status Tracker</h1>
          <p className="text-sm text-ink/80">Pantau status lamaran dan persiapan dokumen Anda di satu tempat.</p>
        </header>

        {/* ⬇️ DIUBAH: blok kartu statistik (STAT_CARDS.map) dan <ApplicationHistory /> digabung menjadi satu komponen */}
        <ApplicationsView applications={MOCK_APPLICATIONS} />

        {/* Catatan: jika banner dokumen diaktifkan lagi, letakkan di bawah ApplicationsView
            (atau pindahkan ke dalam applications-view.jsx bila ingin berada di antara kartu dan riwayat). */}
        {/*<DocumentPrepBanner checklist={MOCK_DOCUMENT_CHECKLIST} profileCompleteness={MOCK_PROFILE_COMPLETENESS} />*/}
      </main>

      <Footer />
    </div>
  );
}
