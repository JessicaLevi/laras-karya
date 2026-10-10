import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, FileText } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Lingkaran progres SVG murni.
 * @param {{ value: number, size?: number, strokeWidth?: number }} props value 0–100
 */
function ProgressRing({ value, size = 56, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`Kelengkapan profil ${value} persen`}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-mint-line" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-brand"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-xs font-bold text-brand">{value}%</span>
    </div>
  );
}

/** @param {{ action: import("@/lib/applications-data").ChecklistAction }} props */
function ChecklistAction({ action }) {
  if (action.type === "link") {
    return (
      <Link href={action.href} className="inline-flex min-h-11 items-center text-xs font-bold text-warn underline underline-offset-2 md:min-h-0">
        {action.label}
      </Link>
    );
  }
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full bg-white/70 px-2.5 py-0.5 text-[11px] font-semibold",
        action.tone === "green" ? "text-emerald-800" : "text-ai"
      )}
    >
      {action.label}
    </span>
  );
}

/**
 * Banner hijau lembut: checklist dokumen (kiri) + kelengkapan profil (kanan).
 * @param {{ checklist: import("@/lib/applications-data").DocumentChecklistItem[], profileCompleteness: number }} props
 */
export function DocumentPrepBanner({ checklist, profileCompleteness }) {
  return (
    <section
      aria-labelledby="doc-prep-title"
      className="flex flex-col gap-6 rounded-2xl bg-mint p-5 md:p-6 xl:flex-row xl:items-center xl:gap-10 xl:px-8"
    >
      <div className="xl:w-[52%]">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-white text-brand">
            <FileText className="size-4" aria-hidden="true" />
          </span>
          <h2 id="doc-prep-title" className="text-[15px] font-bold text-brand">
            Persiapan Dokumen Lamaran
          </h2>
        </div>

        <ul className="space-y-2.5">
          {checklist.map((item) => (
            <li key={item.id} className="flex items-center gap-2.5 text-[13px] text-ink">
              {item.state === "done" ? (
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-label="Selesai" />
              ) : (
                <AlertTriangle className="size-4 shrink-0 text-warn" aria-label="Perlu tindakan" />
              )}
              <span className="min-w-0 flex-1">{item.label}</span>
              <ChecklistAction action={item.action} />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4 border-t border-mint-line pt-5 xl:flex-1 xl:border-t-0 xl:pt-0">
        <ProgressRing value={profileCompleteness} />
        <div>
          <h3 className="text-sm font-bold text-ink">Kelengkapan Profil</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-ink/75">
            Lengkapi profil untuk meningkatkan peluang Anda dicocokkan dengan lowongan terbaik.
          </p>
          <Link href="/profile" className="mt-1 inline-flex min-h-11 items-center gap-1 text-xs font-bold text-brand hover:underline md:min-h-0">
            Lengkapi Profil <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
