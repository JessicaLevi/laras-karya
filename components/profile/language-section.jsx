import { Globe } from "lucide-react";

import { PillButton, SectionCard } from "@/components/profile/section-card";
import { Badge } from "@/components/ui/badge";

export function LanguageSection({ items }) {
  return (
    <SectionCard
      id="bahasa-title"
      title="Bahasa"
      icon={Globe}
      action={<PillButton>Tambah Bahasa</PillButton>}
    >
      <ul className="space-y-5">
        {items.map((l) => (
          <li key={l.id}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-ink">{l.name}</span>
              <Badge tone={l.tone} className="px-2.5 py-0.5">
                {l.level}
              </Badge>
            </div>
            <div
              role="progressbar"
              aria-label={`Kemahiran ${l.name}: ${l.level}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={l.percent}
              className="mt-2 h-2 overflow-hidden rounded-full bg-line"
            >
              <div className="h-full rounded-full bg-brand" style={{ width: `${l.percent}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
