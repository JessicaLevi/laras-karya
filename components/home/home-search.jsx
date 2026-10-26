"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SearchBar } from "@/components/ui/search-bar";
import { cn } from "@/lib/utils";

const SCOPES = [
  { value: "jobs", label: "Lowongan", href: "/recommended-jobs", placeholder: "Cari posisi, perusahaan, kota, atau skill" },
  { value: "courses", label: "Pelatihan", href: "/learning-path", placeholder: "Cari pelatihan, penyedia, atau skill" },
];

/** Pencarian di Beranda: pilih Lowongan atau Pelatihan, lalu buka halamannya dengan ?q=. */
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
      <div role="radiogroup" aria-label="Cari di" className="mb-2 inline-flex rounded-full bg-white/15 p-1">
        {SCOPES.map((s) => (
          <button
            key={s.value}
            type="button"
            role="radio"
            aria-checked={scope === s.value}
            onClick={() => setScope(s.value)}
            className={cn(
              "min-h-8 rounded-full px-4 text-xs font-bold transition-colors",
              scope === s.value ? "bg-white text-brand" : "text-white hover:bg-white/10",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      <SearchBar
        label={`Cari ${current.label.toLowerCase()}`}
        placeholder={current.placeholder}
        value={query}
        onChange={setQuery}
        onSubmit={submit}
        submitLabel="Cari"
        className="border-transparent shadow-sm"
      />
    </div>
  );
}
