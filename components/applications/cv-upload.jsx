"use client";

import { useState } from "react";
import { Eye, FileText, RefreshCw, Trash2, Upload } from "lucide-react";

import { cn } from "@/lib/utils";

const ACCEPT = ".pdf,.doc,.docx";
const ALLOWED_EXT = ["pdf", "doc", "docx"];

/** "1,2 MB" / "350 KB" */
export function formatFileSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toLocaleString("id-ID", { maximumFractionDigits: 1 })} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** Pesan error untuk file CV, atau null bila boleh dipakai. */
export function cvFileProblem(file, maxMb) {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) return "Format CV harus PDF, DOC, atau DOCX.";
  if (file.size === 0) return "File CV kosong. Pilih file lain.";
  if (file.size > maxMb * 1024 * 1024) return `Ukuran CV maksimal ${maxMb} MB. File Anda ${formatFileSize(file.size)}.`;
  return null;
}

/**
 * Unggah CV: pilih file lewat tombol atau seret ke kotak, lalu tampilkan nama & ukurannya.
 * File hanya disimpan di state halaman (belum dikirim ke server).
 * BACKEND (nanti): unggah ke Supabase Storage, lalu simpan URL-nya ke applications.resume_url.
 *
 * Props:
 * - file: File | null, onChange(file | null)
 * - inputRef: ref <input type="file"> (dipakai juga oleh tombol di Checklist Kesiapan)
 */
export function CvUpload({ file, onChange, inputRef, maxMb = 5 }) {
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  function accept(picked) {
    if (!picked) return;
    const problem = cvFileProblem(picked, maxMb);
    setError(problem ?? "");
    if (!problem) onChange(picked);
  }

  function openPreview() {
    // PDF bisa dilihat langsung di tab baru; URL sementara dilepas setelah dibuka
    const url = URL.createObjectURL(file);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  const isPdf = file?.name.toLowerCase().endsWith(".pdf");

  return (
    <div className="mt-5">
      <p className="text-sm text-slate-600">File CV</p>
      <input
        ref={inputRef}
        id="cv-file"
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(e) => {
          accept(e.target.files?.[0]);
          e.target.value = ""; // agar file yang sama bisa dipilih ulang
        }}
      />

      {file ? (
        <div className="mt-1.5 flex flex-wrap items-center gap-3 rounded-xl border border-brand/30 bg-brand-light/60 px-4 py-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-brand">
            <FileText className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-ink">{file.name}</p>
            <p className="text-xs text-slate-600">{formatFileSize(file.size)} · siap dilampirkan</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {isPdf && (
              <button
                type="button"
                onClick={openPreview}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand px-3.5 text-xs font-semibold text-brand transition hover:bg-white"
              >
                <Eye className="size-3.5" aria-hidden /> Lihat
              </button>
            )}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand px-3.5 text-xs font-semibold text-brand transition hover:bg-white"
            >
              <RefreshCw className="size-3.5" aria-hidden /> Ganti
            </button>
            <button
              type="button"
              onClick={() => {
                onChange(null);
                setError("");
              }}
              aria-label={`Hapus CV ${file.name}`}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-red-700 transition hover:bg-red-50"
            >
              <Trash2 className="size-3.5" aria-hidden /> Hapus
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            accept(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "mt-1.5 flex flex-col items-center gap-3 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors",
            dragging ? "border-brand bg-brand-light" : "border-slate-300 bg-surface",
          )}
        >
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand/90"
          >
            <Upload className="size-4" aria-hidden /> Unggah CV
          </button>
          <p className="text-xs text-slate-600">
            atau seret file ke sini. PDF, DOC, atau DOCX, maksimal {maxMb} MB.
          </p>
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {file ? `CV ${file.name} siap dilampirkan` : ""}
      </p>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
