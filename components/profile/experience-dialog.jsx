"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2, X } from "lucide-react";

function Field({ id, label, value, onChange, placeholder, error }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={100}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1.5 h-[42px] w-full rounded-xl border bg-white px-4 text-sm text-ink placeholder:text-slate-500 ${
          error ? "border-red-600" : "border-slate-300"
        }`}
      />
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}

function ExperienceForm({ mode, initial, onSubmit, onDelete }) {
  const [values, setValues] = useState({
    role: initial?.role ?? "",
    company: initial?.company ?? "",
    period: initial?.period ?? "",
  });
  const [errors, setErrors] = useState({});
  const set = (key) => (v) => setValues((s) => ({ ...s, [key]: v }));

  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!values.role.trim()) next.role = "Posisi / jabatan wajib diisi.";
    if (!values.company.trim()) next.company = "Nama perusahaan wajib diisi.";
    if (!values.period.trim()) next.period = "Durasi bekerja wajib diisi.";
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      document.getElementById(`exp-${firstInvalid}`)?.focus();
      return;
    }
    onSubmit({ role: values.role.trim(), company: values.company.trim(), period: values.period.trim() });
  }

  const primary = "h-12 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand/90";

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
      <Field id="exp-role" label="Posisi / Jabatan" value={values.role} onChange={set("role")} placeholder="contoh: Analis Lingkungan" error={errors.role} />
      <Field id="exp-company" label="Nama Perusahaan" value={values.company} onChange={set("company")} placeholder="contoh: PT Hijau Lestari" error={errors.company} />
      <Field id="exp-period" label="Durasi Bekerja" value={values.period} onChange={set("period")} placeholder="contoh: Jan 2022 – Des 2026" error={errors.period} />

      {mode === "edit" ? (
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-red-600 px-5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" aria-hidden /> Hapus
          </button>
          <button type="submit" className={`${primary} flex-1`}>Simpan Perubahan</button>
        </div>
      ) : (
        <button type="submit" className={`${primary} mt-2 w-full`}>Tambahkan</button>
      )}
    </form>
  );
}

/**
 * Satu dialog untuk dua keadaan: mode "add" (Tambah) dan "edit" (Edit + Hapus).
 * Memakai elemen <dialog> bawaan browser: fokus terkunci, Esc menutup, latar tidak bisa diklik.
 */
export default function ExperienceDialog({ open, mode, initial, onClose, onSubmit, onDelete }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      d.querySelector("input")?.focus(); // fokus awal ke isian pertama
    }
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="exp-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // klik area gelap menutup
      }}
      className="fixed inset-0 z-50 m-auto h-fit w-[calc(100%-2rem)] max-w-[520px] rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/60"
    >
      <div className="p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 id="exp-dialog-title" className="text-xl font-bold">
            {mode === "edit" ? "Edit Pengalaman Kerja" : "Tambah Pengalaman Kerja"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition hover:bg-brand-light"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {open && (
          <ExperienceForm
            key={`${mode}-${initial?.id ?? "baru"}`}
            mode={mode}
            initial={initial}
            onSubmit={onSubmit}
            onDelete={onDelete}
          />
        )}
      </div>
    </dialog>
  );
}
