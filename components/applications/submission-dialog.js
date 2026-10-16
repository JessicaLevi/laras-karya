"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, ExternalLink, Mail, Sparkles } from "lucide-react";

/**
 * Dialog konfirmasi memakai elemen <dialog> bawaan browser:
 * fokus terkunci di dalam dialog, tombol Esc menutup, dan latar belakang otomatis tidak bisa diklik.
 */
export default function SubmissionDialog({ open, onClose, job, applyUrl }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-desc"
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

        <h2 id="dialog-title" className="mt-4 text-2xl font-bold text-brand">
          Lamaran Dicatat di Laras Karya
        </h2>
        <p id="dialog-desc" className="mt-3 leading-relaxed text-slate-800">
          Lanjutkan melamar posisi {job.title} di {job.company} melalui situs perusahaan. Statusnya bisa Anda pantau di
          halaman Lamaran.
        </p>

        <p className="mt-6 flex items-center gap-3 rounded-xl bg-brand-light px-4 py-3 text-left text-sm font-medium text-brand">
          <Mail className="h-5 w-5 shrink-0" aria-hidden />
          Laras Karya tidak mengirim lamaran Anda ke perusahaan.
        </p>

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

        {/* Cadangan kalau tab baru diblokir browser */}
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          Situs perusahaan belum terbuka? Buka di sini <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </dialog>
  );
}
