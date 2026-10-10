import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ApplicationHistory } from "@/components/applications/application-history";
import { DocumentPrepBanner } from "@/components/applications/document-prep-banner";
//import { Navbar } from "@/components/layout/navbar";
import { StatCard } from "@/components/ui/stat-card";
import {
  MOCK_APPLICATIONS,
  MOCK_DOCUMENT_CHECKLIST,
  MOCK_PROFILE_COMPLETENESS,
  STAT_CARDS,
} from "@/lib/applications-data";

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

        {/* Mobile: Total selebar penuh + 2×2 · Tablet: 3 kolom · Desktop: 5 kolom */}
        <section aria-label="Ringkasan lamaran" className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-5">
          {STAT_CARDS.map((card, i) => (
            <StatCard
              key={card.id}
              label={card.label}
              icon={card.icon}
              tone={card.tone}
              value={card.status ? MOCK_APPLICATIONS.filter((a) => a.status === card.status).length : MOCK_APPLICATIONS.length}
              className={i === 0 ? "col-span-2 md:col-span-1" : undefined}
            />
          ))}
        </section>

        <DocumentPrepBanner checklist={MOCK_DOCUMENT_CHECKLIST} profileCompleteness={MOCK_PROFILE_COMPLETENESS} />
        <ApplicationHistory applications={MOCK_APPLICATIONS} />
      </main>

      <footer className="border-t border-line bg-white">
        <p className="mx-auto max-w-[1200px] px-4 py-5 text-center text-[11px] text-ink/70 md:px-6 xl:px-8">
          © 2026 Laras Karya. Platform Karir Sektor Hijau untuk Perempuan Indonesia.
        </p>
      </footer>
    </div>
  );
}
