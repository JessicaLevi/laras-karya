"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

/*
  Status tombol "Perbarui Rekomendasi" yang dibagi ke bagian lain di Beranda.
  Tombolnya ada di seksi lowongan, sedangkan saran pelatihan ada di bagian lain halaman, jadi keduanya
  dihubungkan lewat konteks ini. Tahap: "idle" (diam) -> "updating" (sedang memperbarui) -> "done" (selesai, sebentar).
  Tanpa provider (komponen dipakai di halaman lain) semuanya tidak melakukan apa-apa.
*/
const RefreshContext = createContext({ phase: "idle", setPhase: () => {} });

export function RecommendationRefreshProvider({ children }) {
  const [phase, setPhase] = useState("idle");
  const value = useMemo(() => ({ phase, setPhase }), [phase]);
  return <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>;
}

export const useRefreshPhase = () => useContext(RefreshContext);

/**
 * Pembungkus saran pelatihan: meredup dan menampilkan keterangan saat rekomendasi dihitung ulang,
 * lalu keterangan selesai beberapa detik. Daftar pelatihan hanya berubah bila profil atau skill berubah,
 * jadi keterangan selesai menjelaskannya supaya hasil yang sama tidak terkesan "tidak terjadi apa-apa".
 */
export function CoursesRefreshFeedback({ children }) {
  const { phase, setPhase } = useRefreshPhase();
  const updating = phase === "updating";
  const done = phase === "done";

  useEffect(() => {
    if (!done) return undefined;
    const timer = setTimeout(() => setPhase("idle"), 6000);
    return () => clearTimeout(timer);
  }, [done, setPhase]);

  return (
    <div>
      {/* aria-live: kotaknya selalu ada (tanpa jarak) supaya perubahan isinya diumumkan pembaca layar; jarak ada di teksnya */}
      <div role="status" aria-live="polite">
        {updating ? (
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold text-brand">
            <RefreshCw className="size-3.5 motion-safe:animate-spin" aria-hidden="true" />
            Memperbarui saran pelatihan…
          </p>
        ) : done ? (
          <p className="mb-5 text-xs font-semibold text-brand">
            Saran pelatihan sudah diperbarui.{" "}
            <span className="font-normal text-ink/75">
              Daftarnya hanya berubah bila profil atau skill Anda berubah.
            </span>
          </p>
        ) : null}
      </div>

      <div
        aria-busy={updating}
        className={cn(
          "space-y-5 transition-opacity duration-300",
          updating && "pointer-events-none opacity-50 motion-safe:animate-pulse",
        )}
      >
        {children}
      </div>
    </div>
  );
}
