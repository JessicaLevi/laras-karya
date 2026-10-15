import { Briefcase } from "lucide-react";

import { ItemActions, PillButton, SectionCard } from "@/components/profile/section-card";

export function ExperienceSection({ items }) {
  return (
    <SectionCard
      id="pengalaman-title"
      title="Pengalaman Kerja"
      icon={Briefcase}
      action={<PillButton>Tambah Pengalaman</PillButton>}
    >
      <ul className="divide-y divide-line">
        {items.map((exp) => (
          <li key={exp.id} className="py-5 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-ink">{exp.role}</h3>
              <ItemActions label={exp.role} />
            </div>
            <p className="mt-0.5 text-sm text-ink/70">
              <span className="font-medium text-brand">{exp.company}</span>
              <span className="mx-2 text-ink/30" aria-hidden="true">
                •
              </span>
              {exp.period}
            </p>
            <p className="mt-2 text-sm text-ink">{exp.description}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
