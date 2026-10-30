import Link from "next/link";
import { ArrowRight, Brain, Check, FileText, Lock, Mail, Sparkle, Sparkles, User } from "lucide-react";

import { signup } from "./actions";

import { AuthShell } from "@/components/auth/auth-shell";
import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = { title: "Daftar" };

const STEPS = [
  { n: 1, icon: FileText, label: "Daftar", desc: "Mengisi formulir pendaftaran akun" },
  { n: 2, icon: Brain, label: "Asesmen", desc: "Mengerjakan asesmen singkat 5 menit" },
  { n: 3, icon: Sparkles, label: "Rekomendasi AI", desc: "Dapatkan informasi lowongan yang cocok dengan profil Anda" },
];

export default function RegisterPage() {
  return (
    <AuthShell
      variant="leaf"
      title="Mulai Perjalanan Karier Hijau Anda"
      //description="Daftar gratis, jawab asesmen singkat, dan temukan lowongan yang cocok dengan profil Anda."
      panelFooter={
        <div className="rounded-2xl border border-white/10 bg-emerald-900/40 p-6 backdrop-blur-md">
          <p className="text-sm font-semibold uppercase tracking-wide">Alur Pendaftaran</p>
          <ol className="mt-4 flex items-stretch gap-2">
            {STEPS.map(({ n, icon: Icon, label, desc }, i) => (
              <li key={n} className="flex min-w-0 flex-1 items-center gap-2">
                <div className="flex h-full min-w-0 flex-1 flex-col items-center rounded-xl border border-white/10 bg-white/10 px-3 py-4 text-center">
                  <span className="grid size-7 place-items-center rounded-full border border-white/40 text-sm">{n}</span>
                  <Icon className="mt-3 size-10 text-emerald-300" strokeWidth={1.25} aria-hidden="true" />
                  <span className="mt-3 text-sm font-semibold">{label}</span>
                  <span className="mt-1 text-xs leading-snug text-white/75">{desc}</span>
                </div>
                {i < STEPS.length - 1 && <ArrowRight className="size-4 shrink-0 text-white/60" aria-hidden="true" />}
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
        <p className="mt-2 text-base text-ink">Mulai temukan lowongan hijau yang selaras dengan Anda.</p>

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
                autoComplete="name" required
                placeholder="Masukkan nama lengkap"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle"
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
                autoComplete="username" required
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
                autoComplete="new-password" required minLength={8} aria-describedby="password-hint"
                placeholder="Buat kata sandi"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle/80"
              />
            </div>
            <p id="password-hint" className="mt-1.5 text-sm text-subtle">Minimal 8 karakter, kombinasi huruf dan angka.</p>
          </div>

          <div className="flex items-start gap-3 text-sm text-ink/80">
            <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
              <input
                id="agree"
                name="agree" required
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
            <Button type="submit" formAction={signup} className="h-12 w-full lg:h-[clamp(2.25rem,5.4vh,3rem)] bg-brand hover:bg-brand/90 rounded-xl text-white font-semibold">
              Daftar Sekarang
            </Button>
            <p className="flex items-center justify-center gap-2 rounded-xl bg-accent-light py-2 text-sm font-bold text-accent">
              <Sparkle className="size-3.5 fill-current" aria-hidden="true" />
              Setelah daftar, lanjut ke asesmen 5 menit
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