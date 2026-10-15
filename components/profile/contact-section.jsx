import { Mail, MapPin, Pencil, Phone, User } from "lucide-react";

import { LinkedinIcon } from "@/components/icons";
import { PillButton, SectionCard } from "@/components/profile/section-card";

export function ContactSection({ email, phone, location, linkedin }) {
  const rows = [
    { icon: Mail, text: email },
    { icon: Phone, text: phone },
    { icon: MapPin, text: location },
  ];

  return (
    <SectionCard
      id="kontak-title"
      title="Informasi Kontak"
      icon={User}
      action={<PillButton icon={Pencil}>Edit</PillButton>}
    >
      <ul className="space-y-4 text-base text-ink">
        {rows.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3">
            <Icon className="size-5 shrink-0 text-ink/60" aria-hidden="true" />
            {text}
          </li>
        ))}
        <li className="flex items-center gap-3">
          <LinkedinIcon className="size-5 shrink-0 text-ink/60" />
          <a href={`https://${linkedin}`} className="font-medium text-brand underline underline-offset-2">
            {linkedin}
          </a>
        </li>
      </ul>
    </SectionCard>
  );
}
