"use client";

import { useId, useState } from "react";
import { Plus, X } from "lucide-react";

import { LIMITS } from "@/lib/assessment-options";

/**
 * Pemilih keahlian: hanya bisa memilih dari `options` (lihat dokumen 2.3 & bagian 4),
 * dengan pencarian dan chip saran.
 */
export function SkillPicker({ options, values, onChange, suggestions = [] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const chosen = new Set(values.map((v) => v.toLowerCase()));
  const isFull = values.length >= LIMITS.maxSkills;

  const add = (skill) => {
    if (!chosen.has(skill.toLowerCase()) && !isFull) onChange([...values, skill]);
    setQuery("");
  };
  const remove = (skill) => onChange(values.filter((v) => v !== skill));

  const matches = query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()) && !chosen.has(o.toLowerCase())).slice(0, 6)
    : [];
  const freshSuggestions = suggestions.filter((s) => !chosen.has(s.toLowerCase())).slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-surface p-3">
        {values.map((skill) => (
          <span key={skill} className="inline-flex items-center gap-1 rounded-lg bg-brand px-2.5 py-1.5 text-[13px] font-semibold text-white">
            {skill}
            <button type="button" onClick={() => remove(skill)} className="rounded-full p-0.5 hover:bg-white/20" aria-label={`Hapus ${skill}`}>
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </span>
        ))}
        <label htmlFor={inputId} className="sr-only">Cari keahlian</label>
        <input
          id={inputId}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && matches[0]) {
              e.preventDefault();
              add(matches[0]);
            }
          }}
          disabled={isFull}
          placeholder={isFull ? `Maksimal ${LIMITS.maxSkills} keahlian` : "Cari keahlian dari daftar..."}
          className="min-w-40 flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-ink/50"
          autoComplete="off"
        />
      </div>

      {matches.length > 0 ? (
        <ul className="mt-2 overflow-hidden rounded-xl border border-black/10 bg-white" aria-label="Hasil pencarian keahlian">
          {matches.map((skill) => (
            <li key={skill}>
              <button type="button" onClick={() => add(skill)} className="w-full px-4 py-2.5 text-left text-sm hover:bg-brand-light">
                {skill}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {query.trim() && matches.length === 0 ? (
        <p className="mt-2 text-xs text-ink/70">Keahlian tidak ditemukan di daftar. Coba kata lain, misalnya &quot;data&quot; atau &quot;limbah&quot;.</p>
      ) : null}

      <p className="mt-1.5 text-xs text-ink/70">Pilih dari daftar agar nama keahlian sama dengan yang dipakai lowongan.</p>

      {freshSuggestions.length > 0 ? (
        <div className="mt-3">
          <p className="mb-2 text-xs font-semibold text-ink/70">Keahlian yang sering dicari di sektor pilihan Anda:</p>
          <div className="flex flex-wrap gap-2">
            {freshSuggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => add(skill)}
                disabled={isFull}
                className="inline-flex items-center gap-1 rounded-full border border-black/15 bg-white px-3 py-1.5 text-[13px] hover:border-brand/50 disabled:opacity-50"
              >
                <Plus className="size-3.5" aria-hidden="true" />
                {skill}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
