import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Kolom input dengan ikon di kiri, elemen opsional di kanan, petunjuk, dan pesan galat.
 * Dipakai oleh form Daftar dan Masuk.
 */
export function Field({ label, icon: Icon, error, hint, trailing, footerAside, id, ...inputProps }) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div
        className={cn(
          "flex h-12 items-center gap-3 rounded-xl border bg-white px-4 transition-colors focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/20",
          error ? "border-red-500" : "border-line"
        )}
      >
        <Icon className="size-5 shrink-0 text-ink/60" aria-hidden="true" />
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle/80"
          {...inputProps}
        />
        {trailing}
      </div>
      {(error || hint || footerAside) && (
        <div className="mt-1.5 flex items-start justify-between gap-3 text-sm">
          {error ? (
            <p id={errorId} role="alert" className="text-red-600">
              {error}
            </p>
          ) : hint ? (
            <p id={hintId} className="text-subtle">
              {hint}
            </p>
          ) : (
            <span />
          )}
          {footerAside}
        </div>
      )}
    </div>
  );
}

/** Tombol lihat/sembunyikan kata sandi untuk `trailing` pada Field. */
export function PasswordToggle({ shown, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
      aria-pressed={shown}
      className="grid size-8 shrink-0 place-items-center rounded-md text-ink/60 hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/30 focus-visible:outline-none"
    >
      {shown ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
    </button>
  );
}
