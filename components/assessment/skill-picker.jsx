"use client";

import { useId, useState } from "react";
import { Plus, X } from "lucide-react";

import { LIMITS } from "@/lib/assessment-options";
import { customSkillProblem, findSimilarSkills, sameSkill, tidySkillName } from "@/lib/skill-matching";

/**
 * Pemilih keahlian.
 * - Cara utama: cari dan pilih dari `options` (nama sama dengan yang dipakai lowongan).
 * - Jika tidak ada di daftar: tampilkan saran yang mirip, lalu izinkan menambah sebagai
 *   "keahlian lain" (`customValues`). Saat diproses, AI mencoba memetakannya ke daftar.
 */
export function SkillPicker({ options, values, onChange, customValues = [], onCustomChange, suggestions = [] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const hintId = useId();

  const typed = tidySkillName(query);
  const chosen = new Set(values.map((v) => v.toLowerCase()));
  const isListFull = values.length >= LIMITS.maxSkills;
  const isCustomFull = customValues.length >= LIMITS.maxCustomSkills;

  const addFromList = (skill) => {
    if (!chosen.has(skill.toLowerCase()) && !isListFull) onChange([...values, skill]);
    setQuery("");
  };
  const addCustom = () => {
    if (isCustomFull || customSkillProblem(typed) || customValues.some((c) => sameSkill(c, typed))) return;
    onCustomChange([...customValues, typed]);
    setQuery("");
  };
  const removeFromList = (skill) => onChange(values.filter((v) => v !== skill));
  const removeCustom = (skill) => onCustomChange(customValues.filter((v) => v !== skill));

  const available = options.filter((o) => !chosen.has(o.toLowerCase()));
  const matches = typed ? available.filter((o) => o.toLowerCase().includes(typed.toLowerCase())).slice(0, 6) : [];
  const exactInList = typed && options.find((o) => sameSkill(o, typed));
  const similar = typed && matches.length === 0 && !exactInList ? findSimilarSkills(typed, available) : [];
  const alreadyCustom = typed && customValues.some((c) => sameSkill(c, typed));
  const problem = typed ? customSkillProblem(typed) : null;
  const canOfferCustom = Boolean(typed) && matches.length === 0 && !exactInList && !alreadyCustom && Boolean(onCustomChange);
  const freshSuggestions = suggestions.filter((s) => !chosen.has(s.toLowerCase())).slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-surface p-3">
        {values.map((skill) => (
          <span key={skill} className="inline-flex items-center gap-1 rounded-lg bg-brand px-2.5 py-1.5 text-[13px] font-semibold text-white">
            {skill}
            <button type="button" onClick={() => removeFromList(skill)} className="rounded-full p-0.5 hover:bg-white/20" aria-label={`Hapus ${skill}`}>
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </span>
        ))}
        {customValues.map((skill) => (
          <span
            key={`custom-${skill}`}
            className="inline-flex items-center gap-1 rounded-lg border-[1.5px] border-dashed border-brand bg-white px-2.5 py-1 text-[13px] font-semibold text-brand"
          >
            {skill}
            <span className="font-normal text-ink/60">· di luar daftar</span>
            <button type="button" onClick={() => removeCustom(skill)} className="rounded-full p-0.5 hover:bg-brand-light" aria-label={`Hapus ${skill}`}>
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </span>
        ))}
        <label htmlFor={inputId} className="sr-only">Cari atau tambahkan keahlian</label>
        <input
          id={inputId}
          type="text"
          value={query}
          maxLength={LIMITS.customSkillMaxLength + 10}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            if (matches[0]) addFromList(matches[0]);
            else if (exactInList && !chosen.has(exactInList.toLowerCase())) addFromList(exactInList);
            else if (canOfferCustom && !problem) addCustom();
          }}
          placeholder="Cari keahlian, atau ketik keahlian Anda..."
          className="min-w-48 flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-ink/50"
          autoComplete="off"
          aria-describedby={hintId}
        />
      </div>

      {matches.length > 0 ? (
        <ul className="mt-2 overflow-hidden rounded-xl border border-black/10 bg-white" aria-label="Hasil pencarian keahlian">
          {matches.map((skill) => (
            <li key={skill}>
              <button type="button" onClick={() => addFromList(skill)} disabled={isListFull} className="w-full px-4 py-2.5 text-left text-sm hover:bg-brand-light disabled:opacity-50">
                {skill}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {exactInList && chosen.has(exactInList.toLowerCase()) ? (
        <p className="mt-2 text-xs text-ink/70">{exactInList} sudah Anda pilih.</p>
      ) : null}
      {alreadyCustom ? <p className="mt-2 text-xs text-ink/70">Keahlian ini sudah Anda tambahkan.</p> : null}

      {canOfferCustom ? (
        <div className="mt-2 rounded-xl border border-black/10 bg-white p-3">
          {similar.length > 0 ? (
            <div className="mb-3">
              <p className="mb-2 text-xs font-semibold text-ink/70">Mungkin maksud Anda:</p>
              <div className="flex flex-wrap gap-2">
                {similar.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addFromList(skill)}
                    disabled={isListFull}
                    className="rounded-full border border-brand bg-brand-light px-3 py-1.5 text-[13px] font-semibold text-brand hover:bg-brand/10 disabled:opacity-50"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {isCustomFull ? (
            <p className="text-xs text-ink/70">Maksimal {LIMITS.maxCustomSkills} keahlian di luar daftar.</p>
          ) : problem ? (
            <p className="text-xs text-ink/70">{problem}</p>
          ) : (
            <button type="button" onClick={addCustom} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">
              <Plus className="size-4" aria-hidden="true" />
              Tambahkan “{typed}” sebagai keahlian lain
            </button>
          )}
        </div>
      ) : null}

      <p id={hintId} className="mt-1.5 text-xs leading-relaxed text-ink/70">
        Pilih dari daftar agar nama keahlian sama dengan yang dipakai lowongan. Tidak ada di daftar? Ketik keahlian Anda,
        lalu pilih “Tambahkan sebagai keahlian lain” atau tekan Enter.
      </p>

      {freshSuggestions.length > 0 ? (
        <div className="mt-3">
          <p className="mb-2 text-xs font-semibold text-ink/70">Keahlian yang sering dicari di sektor pilihan Anda:</p>
          <div className="flex flex-wrap gap-2">
            {freshSuggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addFromList(skill)}
                disabled={isListFull}
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
