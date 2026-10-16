"use client";

import { useState } from "react";
import { CircleX, Star } from "lucide-react";

import { PillButton, SectionCard } from "@/components/profile/section-card";
import { cn } from "@/lib/utils";

/** Daftar keahlian; chip bisa dihapus (state lokal, belum tersimpan ke server). */
export function SkillsSection({ skills: initial }) {
  const [skills, setSkills] = useState(initial);

  return (
    <SectionCard
      id="keahlian-title"
      title="Keahlian"
      icon={Star}
      action={<PillButton>Tambah Skill</PillButton>}
    >
      {skills.length > 0 ? (
        <ul className="flex flex-wrap gap-2.5">
          {skills.map((s) => (
            <li key={s.id}>
              <span
                className={cn(
                  "inline-flex min-h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium",
                  s.highlight ? "border-brand bg-brand text-white" : "border-brand bg-white text-brand"
                )}
              >
                {s.label}
                <button
                  type="button"
                  aria-label={`Hapus keahlian ${s.label}`}
                  onClick={() => setSkills((list) => list.filter((x) => x.id !== s.id))}
                  className="grid size-5 place-items-center rounded-full focus-visible:ring-2 focus-visible:ring-current focus-visible:outline-none"
                >
                  <CircleX className="size-4" aria-hidden="true" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink/70">Belum ada keahlian. Tambahkan untuk meningkatkan rekomendasi AI.</p>
      )}
    </SectionCard>
  );
}
