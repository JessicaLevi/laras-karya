"use client";

import { useState, useTransition } from "react";

/**
 * Dropdown yang langsung menyimpan lewat Server Action: action(id, nilaiBaru) -> { ok, message? }.
 * Bila gagal, nilai dikembalikan dan pesan galat ditampilkan.
 */
export function ActionSelect({ id, value, options, action, label, disabled = false }) {
  const [current, setCurrent] = useState(value);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  function onChange(event) {
    const next = event.target.value;
    const previous = current;
    setCurrent(next);
    setError("");
    start(async () => {
      const res = await action(id, next);
      if (!res?.ok) {
        setCurrent(previous);
        setError(res?.message ?? "Gagal menyimpan.");
      }
    });
  }

  return (
    <div>
      <select
        aria-label={label}
        value={current}
        onChange={onChange}
        disabled={disabled || pending}
        className="h-8 rounded-lg border border-border bg-white px-2 text-sm disabled:opacity-60"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error ? <p role="alert" className="mt-1 max-w-48 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

/** Tombol hapus dengan konfirmasi: action(id) -> { ok, message? }. */
export function DeleteButton({ id, action, confirmText = "Hapus data ini? Tindakan ini tidak bisa dibatalkan." }) {
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  function onClick() {
    if (!window.confirm(confirmText)) return;
    setError("");
    start(async () => {
      const res = await action(id);
      if (!res?.ok) setError(res?.message ?? "Gagal menghapus.");
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="h-8 rounded-lg bg-destructive/10 px-2.5 text-sm font-medium text-destructive hover:bg-destructive/20 disabled:opacity-60"
      >
        {pending ? "Menghapus…" : "Hapus"}
      </button>
      {error ? <p role="alert" className="mt-1 max-w-48 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
