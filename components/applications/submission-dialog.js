"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react"; // ⬇️ DIUBAH: ExternalLink dan Mail dihapus (tidak dipakai lagi)

/**
 * Dialog konfirmasi memakai elemen <dialog> bawaan browser:
 * fokus terkunci di dalam dialog, tombol Esc menutup, dan latar belakang otomatis tidak bisa diklik.
 */
// ⬇️ DIUBAH: prop applyUrl dihapus (tautan "Situs perusahaan belum terbuka?" sudah tidak ada)
export default function SubmissionDialog({ open, onClose, job }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && d.open) {
      d.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      // ⬇️ DIHAPUS: aria-describedby="dialog-desc" (paragraf deskripsi sudah dihapus)
      onClose={onClose}
      onClick={(e) => {
        // klik di area gelap (di luar kartu) menutup dialog
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-[520px] rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60"
    >
      <div className="p-8 text-center sm:p-10">
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center" aria-hidden>
          <span className="absolute left-2 top-0 h-2 w-2 rounded-full bg-teal" />
          <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-teal" />
          <Sparkles className="absolute -left-1 bottom-3 h-4 w-4 text-ai" />
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal text-white shadow-lg">
            <Check className="h-8 w-8" />
          </span>
        </div>

        {/* ⬇️ DIUBAH: judul pop-up (sebelumnya "Lamaran Dicatat di Laras Karya") */}
        <h2 id="dialog-title" className="mt-4 text-2xl font-bold text-brand">
          Lamaranmu berhasil dikirim ke {job.company}
        </h2>

        {/* ⬇️ DIHAPUS: paragraf "Lanjutkan melamar posisi ... melalui situs perusahaan." */}
        {/* ⬇️ DIHAPUS: kotak hijau "Laras Karya tidak mengirim lamaran Anda ke perusahaan." */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/home"
            className="flex-1 rounded-full border-2 border-brand px-5 py-3 text-sm font-semibold text-brand transition hover:bg-brand-light"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/applications"
            className="flex-1 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            Lihat Status Lamaran
          </Link>
        </div>

        {/* ⬇️ DIHAPUS: tautan "Situs perusahaan belum terbuka? Buka di sini" */}
      </div>
    </dialog>
  );
}
