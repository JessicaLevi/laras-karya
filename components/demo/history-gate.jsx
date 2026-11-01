"use client";

import { History } from "lucide-react";

import { startHistory, useHistoryStage } from "@/lib/demo-history";
import { PROFILE } from "@/lib/profile-data";

/*
  Pembungkus halaman yang isinya bergantung pada riwayat pengguna (Beranda, Lamaran Saya, Bookmark).
  Pada akun BARU (mode demo), halaman ini menampilkan catatan "Beberapa minggu kemudian" lebih dulu;
  setelah "Lanjutkan", isi halaman tampil seperti biasa. Di luar mode demo, children langsung tampil.
  SEMENTARA: hapus pembungkus ini dari tiga halaman itu saat backend tersambung.
*/
export function HistoryGate({ children }) {
  const stage = useHistoryStage();

  if (stage === "baru") return <TimeJumpNote />;

  // "pending": isi tetap dirender tetapi disembunyikan sampai tahap diketahui (tanpa pergeseran tata letak).
  return (
    <div className="flex flex-1 flex-col" style={stage === "pending" ? { visibility: "hidden" } : undefined}>
      {children}
    </div>
  );
}

function TimeJumpNote() {
  const firstName = PROFILE.name.split(" ")[0];
  return (
    <main className="grid flex-1 place-items-center bg-surface px-4 py-10">
      <section
        aria-labelledby="demo-note-title"
        className="w-full max-w-lg rounded-2xl border border-dashed border-brand/40 bg-white p-8 text-center shadow-sm"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-brand-light text-brand">
          <History className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-brand">Catatan demo</p>
        <h1 id="demo-note-title" className="mt-1 text-2xl font-bold text-ink">
          Beberapa minggu kemudian
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
          {firstName} sudah beberapa waktu memakai Laras Karya. Ia sudah melamar beberapa lowongan,
          menyimpan beberapa lainnya, dan punya riwayat aktivitas.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/80">
          Halaman ini kini menampilkan riwayat tersebut, dan lowongan yang sudah ia lamar berada di bagian
          bawah daftar rekomendasi.
        </p>
        <button
          type="button"
          onClick={startHistory}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-brand px-6 text-base font-bold text-white transition-colors hover:bg-brand/90"
        >
          Lanjutkan
        </button>
      </section>
    </main>
  );
}
