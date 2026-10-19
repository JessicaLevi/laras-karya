import Link from "next/link";
import { ArrowRight, Check, Lock, Mail, Sparkle, User } from "lucide-react";

import { signup } from "./actions";

import { AuthShell } from "@/components/auth/auth-shell";
import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = { title: "Daftar" };

const STEPS = [
  { n: 1, label: "Daftar", active: true },
  { n: 2, label: "Asesmen", active: false },
  { n: 3, label: "Rekomendasi AI", active: false },
];

export default function RegisterPage() {
  return (
    <AuthShell
      title="Mulai Perjalanan Karier Hijau Anda"
      description="Daftar gratis, jawab asesmen singkat, dan temukan lowongan yang cocok dengan profil Anda."
      panelFooter={
        <div className="rounded-3xl bg-white/10 px-6 py-6">
          <p className="text-sm font-semibold uppercase tracking-wide">Langkah Pendaftaran</p>
          <ol className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
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
      }
    >
      <div className="w-full max-w-[440px]">
        <h2 className="text-3xl font-bold tracking-tight text-brand md:text-[2.5rem] md:leading-tight lg:text-[length:clamp(1.5rem,4.2vh,2.5rem)]">
          Buat Akun Laras Karya
        </h2>
        <p className="mt-2 text-base text-ink">Mulai temukan green jobs yang selaras dengan dirimu.</p>

        <form className="mt-6 space-y-4 lg:mt-[clamp(1rem,3vh,1.5rem)] lg:space-y-[clamp(0.5rem,1.8vh,1rem)]">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink lg:mb-1.5">
              Nama Lengkap
            </label>
            <div className="flex h-12 items-center lg:h-[clamp(2.25rem,5.4vh,3rem)] gap-3 rounded-xl border border-line bg-white px-4 focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/20">
              <User className="size-5 shrink-0 text-ink/60" aria-hidden="true" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Masukkan nama lengkap"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle/80"
              />
            </div>
          </div>

          <div>
            <label htmlFor="identifier" className="mb-2 block text-sm font-semibold text-ink lg:mb-1.5">
              Email atau Nomor HP
            </label>
            <div className="flex h-12 items-center lg:h-[clamp(2.25rem,5.4vh,3rem)] gap-3 rounded-xl border border-line bg-white px-4 focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/20">
              <Mail className="size-5 shrink-0 text-ink/60" aria-hidden="true" />
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                placeholder="contoh@email.com"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle/80"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-ink lg:mb-1.5">
              Kata Sandi
            </label>
            <div className="flex h-12 items-center lg:h-[clamp(2.25rem,5.4vh,3rem)] gap-3 rounded-xl border border-line bg-white px-4 focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/20">
              <Lock className="size-5 shrink-0 text-ink/60" aria-hidden="true" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Minimal 8 karakter"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle/80"
              />
            </div>
            <p className="mt-1.5 text-sm text-subtle">Kata sandi harus terdiri dari kombinasi huruf dan angka</p>
          </div>

          <div className="flex items-start gap-3 text-sm text-ink/80">
            <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                className="peer size-5 cursor-pointer appearance-none rounded-md border-2 border-brand bg-white checked:bg-brand-light focus-visible:ring-3 focus-visible:ring-brand/30 focus-visible:outline-none"
              />
              <Check
                className="pointer-events-none absolute size-3.5 text-brand opacity-0 peer-checked:opacity-100"
                strokeWidth={3}
                aria-hidden="true"
              />
            </span>
            <label htmlFor="agree" className="cursor-pointer leading-6">
              Saya menyetujui{" "}
              <Link href="/terms" className="font-semibold text-brand underline underline-offset-2">
                Syarat &amp; Ketentuan
              </Link>{" "}
              serta{" "}
              <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2">
                Kebijakan Privasi
              </Link>{" "}
              Laras Karya.
            </label>
          </div>

          <div className="space-y-3">
            <Button type="submit" formAction={signup} className="h-12 w-full lg:h-[clamp(2.25rem,5.4vh,3rem)] rounded-xl text-base font-semibold">
              Daftar Sekarang
            </Button>
            <p className="flex items-center justify-center gap-2 rounded-xl bg-accent-light py-2 text-sm font-bold text-accent">
              <Sparkle className="size-3.5 fill-current" aria-hidden="true" />
              Langsung mulai asesmen AI setelah daftar
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-subtle" role="separator" aria-label="atau">
            <span className="h-px flex-1 bg-line" />
            atau
            <span className="h-px flex-1 bg-line" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-12 w-full gap-3 lg:h-[clamp(2.25rem,5.4vh,3rem)] rounded-xl border-line bg-white text-base font-semibold text-ink"
          >
            <GoogleIcon className="size-5" />
            Daftar dengan Google
          </Button>
        </form>

        <p className="mt-8 text-center lg:mt-[clamp(0.75rem,2.5vh,1.25rem)] text-base text-ink">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-bold text-brand hover:underline">
            Masuk di sini
          </Link>
        </p>

        <p className="mt-8 flex items-center lg:mt-[clamp(0.5rem,2vh,1rem)] justify-center gap-2 text-sm text-subtle">
          <Lock className="size-4" aria-hidden="true" />
          Data Anda dilindungi dan tidak dibagikan tanpa izin.
        </p>
      </div>
    </AuthShell>
  );
}