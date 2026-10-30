"use client";

import { useId } from "react";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Kotak pencarian yang dipakai di Beranda, Lowongan, dan Pelatihan.
 * - onChange dipanggil setiap ketikan (untuk menyaring langsung);
 *   onSubmit dipanggil saat Enter / tombol Cari (untuk pindah halaman, mis. di Beranda).
 * - submitLabel: tampilkan tombol Cari di dalam kotak (dipakai di Beranda).
 *   Di layar < sm tombolnya berubah jadi ikon saja supaya kolom input tidak sempit.
 * - leading: isi bagian kiri kotak sebagai ganti ikon kaca pembesar (mis. pilihan cakupan
 *   Lowongan/Pelatihan di Beranda). Atur jarak kirinya lewat className (mis. "pl-1.5").
 */
export function SearchBar({ label, placeholder, value, onChange, onSubmit, submitLabel, leading, className }) {
  const id = useId();

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className={cn(
        "flex min-h-12 items-center gap-2 rounded-full border border-slate-200 bg-white pl-4 pr-1.5 transition-colors",
        "focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20",
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {leading ?? (
        <Search className="size-[18px] shrink-0 text-ink/50" aria-hidden="true" />
      )}
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        enterKeyHint="search"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-ink/65 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="grid size-9 shrink-0 place-items-center rounded-full text-ink/60 hover:bg-slate-100 hover:text-ink"
          aria-label="Hapus pencarian"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
      {submitLabel ? (
        <button
          type="submit"
          aria-label={submitLabel}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white transition-colors hover:bg-brand/90 sm:inline-grid sm:size-auto sm:min-h-9 sm:px-5"
        >
          <Search className="size-[18px] sm:hidden" aria-hidden="true" />
          <span className="hidden sm:inline">{submitLabel}</span>
        </button>
      ) : null}
    </form>
  );
}
