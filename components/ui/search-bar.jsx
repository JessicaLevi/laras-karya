"use client";

import { useId } from "react";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Kotak pencarian yang dipakai di Beranda, Lowongan, dan Pelatihan.
 * - onChange dipanggil setiap ketikan (untuk menyaring langsung);
 *   onSubmit dipanggil saat Enter / tombol Cari (untuk pindah halaman, mis. di Beranda).
 * - submitLabel: tampilkan tombol Cari di dalam kotak (dipakai di Beranda).
 */
export function SearchBar({ label, placeholder, value, onChange, onSubmit, submitLabel, className }) {
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
      <Search className="size-[18px] shrink-0 text-ink/50" aria-hidden="true" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        enterKeyHint="search"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-ink/50 [&::-webkit-search-cancel-button]:appearance-none"
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
          className="min-h-9 shrink-0 rounded-full bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-brand/90"
        >
          {submitLabel}
        </button>
      ) : null}
    </form>
  );
}
