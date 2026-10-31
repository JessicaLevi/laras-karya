"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkle } from "lucide-react";

import { safeNextPath } from "@/lib/safe-next";

/** Tujuan setelah masuk/daftar dari ?next=, kosong jika tidak ada atau tidak aman. */
function useNext() {
  return safeNextPath(useSearchParams().get("next"), "");
}

function NextFieldInner() {
  const next = useNext();
  return next ? <input type="hidden" name="next" value={next} /> : null;
}

/** Meneruskan ?next= ke server action lewat input tersembunyi. Taruh di dalam <form>. */
export function NextField() {
  return (
    <Suspense fallback={null}>
      <NextFieldInner />
    </Suspense>
  );
}

function NextLinkInner({ href, ...props }) {
  const next = useNext();
  return <Link href={next ? `${href}?next=${encodeURIComponent(next)}` : href} {...props} />;
}

/** Tautan antar Masuk dan Daftar yang membawa ?next= agar tujuan tidak hilang. */
export function NextLink({ href, ...props }) {
  return (
    <Suspense fallback={<Link href={href} {...props} />}>
      <NextLinkInner href={href} {...props} />
    </Suspense>
  );
}

const DEFAULT_HINT = "Setelah daftar, lanjut ke asesmen 5 menit";
const PREVIEW_HINT = "Setelah daftar, hasil rekomendasi Anda langsung terbuka";

function HintPill({ text }) {
  return (
    <p className="flex items-center justify-center gap-2 rounded-xl bg-accent-light py-2 text-sm font-bold text-accent">
      <Sparkle className="size-3.5 fill-current" aria-hidden="true" />
      {text}
    </p>
  );
}

function AfterSignupHintInner() {
  return <HintPill text={useNext() ? PREVIEW_HINT : DEFAULT_HINT} />;
}

/** Teks di bawah tombol Daftar. Berbeda jika pengguna datang dari pratinjau hasil (sudah asesmen). */
export function AfterSignupHint() {
  return (
    <Suspense fallback={<HintPill text={DEFAULT_HINT} />}>
      <AfterSignupHintInner />
    </Suspense>
  );
}
