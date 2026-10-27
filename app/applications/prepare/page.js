import { Suspense } from "react";
import PrepareApplication from "@/components/applications/prepare-application";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Persiapan Lamaran | Laras Karya",
  description: "Lengkapi dan periksa dokumen Anda sebelum sebelum mengirim Lamaran.",
};

export default function PrepareApplicationPage() {
  return (
    <main className="flex-1 bg-surface">
      {/* Suspense diwajibkan karena komponen membaca parameter URL (?job=...) di Next.js 16 */}
      <Suspense
        fallback={
          <div role="status" className="mx-auto max-w-[1200px] px-4 py-16 text-slate-600 md:px-6 xl:px-8">
            Memuat persiapan lamaran…
          </div>
        }
      >
        <PrepareApplication />
      </Suspense>
      <Footer />
    </main>
  );
}
