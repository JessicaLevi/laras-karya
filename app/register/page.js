import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import { RegisterForm } from "@/components/auth/register-form";
import { cn } from "@/lib/utils";

export const metadata = { title: "Daftar" };

const STEPS = [
  { n: 1, label: "Daftar", active: true },
  { n: 2, label: "Asesmen", active: false },
  { n: 3, label: "Rekomendasi AI", active: false },
];

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Panel kiri */}
      <aside className="relative flex flex-col overflow-hidden bg-brand px-6 py-8 text-white lg:w-[45%] lg:px-[72px] lg:py-[72px]">
        <Link href="/" aria-label="Laras Karya, ke halaman awal" className="inline-flex w-fit">
          {/* Logo berwarna dijadikan putih lewat filter, jadi tidak perlu aset baru */}
          <Image
            src="/logo-laras-karya.png"
            alt="Laras Karya"
            width={462}
            height={138}
            priority
            className="h-14 w-auto brightness-0 invert"
          />
        </Link>

        <div className="mt-8 lg:mt-16">
          <h1 className="text-3xl font-bold leading-tight tracking-tight lg:text-5xl lg:leading-[1.15]">
            Mulai Perjalanan Karier Hijau Anda
          </h1>
          <p className="mt-4 hidden max-w-[34rem] text-lg leading-relaxed text-white/90 lg:block">
            Daftar gratis, jawab asesmen singkat, dan temukan lowongan yang cocok dengan profil Anda.
          </p>
        </div>

        <div className="mt-auto hidden pt-16 lg:block">
          <div className="rounded-3xl bg-white/10 px-8 py-7">
            <p className="text-sm font-semibold uppercase tracking-wide">Langkah Pendaftaran</p>
            <ol className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-base">
              {STEPS.map(({ n, label, active }, i) => (
                <li key={n} className="flex items-center gap-3">
                  <span
                    aria-current={active ? "step" : undefined}
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold",
                      active ? "border-white bg-white text-brand" : "border-white/80 text-white"
                    )}
                  >
                    {n}
                  </span>
                  <span className={cn(active ? "font-semibold" : "text-white/90")}>{label}</span>
                  {i < STEPS.length - 1 && <ArrowRight className="ml-1 size-4 text-white/70" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Leaf
          aria-hidden="true"
          strokeWidth={1.25}
          className="pointer-events-none absolute bottom-10 right-28 hidden size-16 rotate-[8deg] text-white/25 lg:block"
        />
        <Leaf
          aria-hidden="true"
          strokeWidth={1.25}
          className="pointer-events-none absolute bottom-12 right-16 hidden size-10 -rotate-[12deg] text-white/20 lg:block"
        />
      </aside>

      {/* Panel kanan */}
      <section className="flex flex-1 items-center justify-center bg-canvas px-6 py-10 lg:px-12 lg:py-16">
        <RegisterForm />
      </section>
    </div>
  );
}
