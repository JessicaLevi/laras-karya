"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";

import { SearchBar } from "@/components/ui/search-bar";
import { cn } from "@/lib/utils";

const SCOPES = [
  { value: "jobs", label: "Lowongan", href: "/recommended-jobs", placeholder: "Posisi atau skill" },
  { value: "courses", label: "Pelatihan", href: "/learning-path", placeholder: "Pelatihan atau skill" },
];

/**
 * Menu pilihan cakupan pencarian (Lowongan / Pelatihan).
 * Pola "menu button": Enter/Spasi/panah bawah membuka, panah atas-bawah/Home/End berpindah,
 * Enter memilih, Escape menutup dan fokus kembali ke tombol, klik di luar menutup.
 * Dibuat sendiri (bukan <select>) karena daftar <select> bawaan browser tidak bisa diberi gaya.
 */
function ScopeMenu({ scopes, value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const itemRefs = useRef([]);
  const menuId = useId();
  const current = scopes.find((s) => s.value === value);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  // Saat terbuka, fokus pindah ke pilihan yang sedang aktif.
  useEffect(() => {
    if (!open) return;
    const selected = scopes.findIndex((s) => s.value === value);
    itemRefs.current[Math.max(0, selected)]?.focus();
  }, [open, scopes, value]);

  // Klik atau sentuh di luar menu menutupnya.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onButtonKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKeyDown = (e) => {
    const items = itemRefs.current.filter(Boolean);
    const index = items.indexOf(document.activeElement);
    const move = (next) => {
      e.preventDefault();
      items[(next + items.length) % items.length]?.focus();
    };
    if (e.key === "ArrowDown") move(index + 1);
    else if (e.key === "ArrowUp") move(index - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(items.length - 1);
    else if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "Tab") close(false);
  };

  return (
    <div ref={rootRef} className="relative flex shrink-0 items-center">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`Cari di: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
        className={cn(
          "inline-flex h-10 items-center gap-1 rounded-full pl-3 pr-2.5 text-sm font-bold text-brand transition-colors hover:bg-brand-light",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand",
          open && "bg-brand-light",
        )}
      >
        {current.label}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <span aria-hidden="true" className="ml-1 h-5 w-px bg-line" />

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Cari di"
          onKeyDown={onMenuKeyDown}
          className="absolute -left-1.5 top-full z-30 mt-3 w-48 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-lg"
        >
          {scopes.map((s, i) => {
            const selected = s.value === value;
            return (
              <button
                key={s.value}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                tabIndex={-1}
                onClick={() => {
                  onChange(s.value);
                  close(true);
                }}
                className={cn(
                  "flex min-h-11 w-full items-center justify-between gap-3 px-4 text-left text-sm transition-colors md:min-h-10",
                  "hover:bg-brand-light hover:text-brand focus-visible:bg-brand-light focus-visible:text-brand focus-visible:outline-none",
                  selected ? "font-bold text-brand" : "text-ink/80",
                )}
              >
                {s.label}
                {selected && <Check className="size-4 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Pencarian di Beranda: pilih Lowongan atau Pelatihan di dalam kotak, lalu buka halamannya dengan ?q=. */
export function HomeSearch() {
  const router = useRouter();
  const [scope, setScope] = useState(SCOPES[0].value);
  const [query, setQuery] = useState("");
  const current = SCOPES.find((s) => s.value === scope);

  const submit = (value) => {
    const q = value.trim();
    router.push(q ? `${current.href}?q=${encodeURIComponent(q)}` : current.href);
  };

  return (
    <div className="w-full max-w-lg">
      <SearchBar
        label={`Cari ${current.label.toLowerCase()}`}
        placeholder={current.placeholder}
        value={query}
        onChange={setQuery}
        onSubmit={submit}
        submitLabel="Cari"
        leading={<ScopeMenu scopes={SCOPES} value={scope} onChange={setScope} />}
        className="border-transparent pl-1.5 shadow-sm"
      />
    </div>
  );
}
