import Image from "next/image";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Masuk" };

const HIGHLIGHTS = [
  { value: "5 menit", label: "Asesmen Singkat" },
  { value: "AI", label: "Rekomendasi Personal" },
];

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[400px]">
      <span
        aria-hidden="true"
        className="absolute -left-20 top-1/2 size-[340px] -translate-y-1/2 rounded-full bg-white/[0.04]"
      />
      <Image
        src="/images/login-hero.png"
        alt="Tiga perempuan profesional di sektor lingkungan: menanam bibit, membawa laptop, dan memegang tablet di lokasi proyek"
        width={551}
        height={471}
        priority
        className="relative h-auto w-full rounded-3xl object-cover"
      />
    </div>
  );
}

function Highlights() {
  return (
    <dl className="flex gap-12 border-t border-white/10 pt-8">
      {HIGHLIGHTS.map(({ value, label }) => (
        <div key={label}>
          <dt className="sr-only">{label}</dt>
          <dd className="text-2xl font-bold" aria-hidden="true">
            {value}
          </dd>
          <dd className="mt-0.5 text-sm text-white/80">{label}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function LoginPage() {
  return (
    <AuthShell
      title="Temukan Karier Hijau yang Bermakna"
      description="Platform karier khusus perempuan untuk sektor lingkungan dan keberlanjutan."
      panelMedia={<HeroIllustration />}
      panelFooter={<Highlights />}
    >
      <LoginForm />
    </AuthShell>
  );
}
