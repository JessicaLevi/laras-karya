import { Award, FileText, UploadCloud } from "lucide-react";

import { ItemActions, PillButton, SectionCard } from "@/components/profile/section-card";

export function CertificationSection({ items }) {
  return (
    <SectionCard
      id="sertifikasi-title"
      title="Sertifikasi & Portofolio"
      icon={Award}
      action={<PillButton>Tambah Sertifikasi</PillButton>}
    >
      <ul className="divide-y divide-line">
        {items.map((c) => (
          <li key={c.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 first:pt-0">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-ink">{c.name}</h3>
              <p className="text-sm text-ink/70">
                {c.issuer} • {c.year}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-brand underline underline-offset-2"
              >
                <FileText className="size-4" aria-hidden="true" />
                Lihat Sertifikat
              </a>
              <ItemActions label={c.name} />
            </div>
          </li>
        ))}
      </ul>

      <label className="mt-4 flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-brand bg-white px-6 py-8 text-center text-sm text-ink/80 transition-colors hover:bg-brand-light/50 focus-within:ring-3 focus-within:ring-brand/30">
        <UploadCloud className="size-6 text-brand" aria-hidden="true" />
        <span>Seret file PDF atau klik untuk mengunggah portofolio</span>
        <input type="file" accept="application/pdf" className="sr-only" />
      </label>
    </SectionCard>
  );
}
