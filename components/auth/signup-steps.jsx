"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Brain, Check, FileText, Sparkles } from "lucide-react";

import { safeNextPath } from "@/lib/safe-next";
import { cn } from "@/lib/utils";

/*
  Panel "Alur Pendaftaran" di halaman daftar. Ada dua urutan yang sah:
    - daftar langsung (tombol Daftar di navbar)  : Daftar -> Asesmen -> Rekomendasi AI
    - dari pratinjau hasil asesmen (?next=...)    : Asesmen (selesai) -> Daftar -> Rekomendasi AI
  Saat ini satu-satunya yang mengirim ?next ke halaman daftar adalah pratinjau hasil asesmen
  (components/jobs/guest-preview.jsx). Jika nanti ada sumber lain, pakai penanda khusus
  (mis. ?from=assessment) supaya urutan di sini tetap benar.
  state: "done" = sudah selesai, "current" = langkah saat ini, "todo" = berikutnya.
*/
const DAFTAR = { key: "signup", icon: FileText, label: "Daftar", desc: "Mengisi formulir pendaftaran akun" };

const FROM_SCRATCH = [
  { ...DAFTAR, state: "current" },
  { key: "assessment", icon: Brain, label: "Asesmen", desc: "Mengerjakan asesmen singkat 5 menit", state: "todo" },
  { key: "recs", icon: Sparkles, label: "Rekomendasi AI", desc: "Dapatkan informasi lowongan yang cocok dengan profil Anda", state: "todo" },
];

const FROM_PREVIEW = [
  { key: "assessment", icon: Brain, label: "Asesmen", desc: "Asesmen singkat 5 menit sudah selesai", state: "done" },
  { ...DAFTAR, state: "current" },
  { key: "recs", icon: Sparkles, label: "Rekomendasi AI", desc: "Semua lowongan yang cocok terbuka setelah Anda mendaftar", state: "todo" },
];

function Panel({ steps }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-emerald-900/40 p-6 backdrop-blur-md">
      <p className="text-sm font-semibold uppercase tracking-wide">Alur Pendaftaran</p>
      <ol className="mt-4 flex items-stretch gap-2">
        {steps.map(({ key, icon: Icon, label, desc, state }, i) => (
          <li
            key={key}
            aria-current={state === "current" ? "step" : undefined}
            className="flex min-w-0 flex-1 items-center gap-2"
          >
            <div
              className={cn(
                "flex h-full min-w-0 flex-1 flex-col items-center rounded-xl border px-3 py-4 text-center",
                state === "current" ? "border-white/40 bg-white/20" : "border-white/10 bg-white/10",
              )}
            >
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full border text-sm",
                  state === "current" && "border-white bg-white font-semibold text-brand",
                  state === "done" && "border-emerald-300 bg-emerald-300 text-brand",
                  state === "todo" && "border-white/40",
                )}
              >
                {state === "done" ? <Check className="size-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
              </span>
              <Icon className="mt-3 size-10 text-emerald-300" strokeWidth={1.25} aria-hidden="true" />
              <span className="mt-3 text-sm font-semibold">
                {label}
                {state === "done" && <span className="sr-only"> (selesai)</span>}
                {state === "current" && <span className="sr-only"> (langkah saat ini)</span>}
              </span>
              <span className="mt-1 text-xs leading-snug text-white/75">{desc}</span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="size-4 shrink-0 text-white/60" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PanelByRoute() {
  const next = safeNextPath(useSearchParams().get("next"), "");
  return <Panel steps={next ? FROM_PREVIEW : FROM_SCRATCH} />;
}

/** Panel kiri halaman daftar. Urutannya menyesuaikan asal pengguna (lihat catatan di atas). */
export function SignupSteps() {
  return (
    <Suspense fallback={<Panel steps={FROM_SCRATCH} />}>
      <PanelByRoute />
    </Suspense>
  );
}
