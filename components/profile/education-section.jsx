import { GraduationCap } from "lucide-react";

import { ItemActions, PillButton, SectionCard } from "@/components/profile/section-card";

export function EducationSection({ items }) {
  return (
    <SectionCard
      id="pendidikan-title"
      title="Pendidikan"
      icon={GraduationCap}
      action={<PillButton>Tambah Pendidikan</PillButton>}
    >
      <ul className="divide-y divide-line">
        {items.map((edu) => (
          <li key={edu.id} className="py-5 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-ink">{edu.degree}</h3>
              <ItemActions label={edu.degree} />
            </div>
            <p className="mt-0.5 text-sm text-ink/70">
              <span className="font-medium text-brand">{edu.school}</span>
              <span className="mx-2 text-ink/30" aria-hidden="true">
                •
              </span>
              {edu.period}
            </p>
            <p className="mt-2 text-sm text-ink">{edu.gpa}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
