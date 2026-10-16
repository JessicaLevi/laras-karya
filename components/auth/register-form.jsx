"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff, Lock, Mail, Sparkle, User } from "lucide-react";

import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+62|62|0)8\d{8,12}$/;

/** @returns {Record<string, string>} pesan galat per kolom (kosong jika valid) */
function validate({ name, identifier, password, agree }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = "Nama lengkap wajib diisi.";

  const id = identifier.trim().replace(/[\s-]/g, "");
  if (!id) errors.identifier = "Email atau nomor HP wajib diisi.";
  else if (!EMAIL_RE.test(id) && !PHONE_RE.test(id)) errors.identifier = "Masukkan email atau nomor HP yang valid.";

  if (password.length < 8) errors.password = "Kata sandi minimal 8 karakter.";
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = "Kata sandi harus terdiri dari kombinasi huruf dan angka.";
  }

  if (!agree) errors.agree = "Setujui Syarat & Ketentuan untuk melanjutkan.";
  return errors;
}

/**
 * Kolom input dengan ikon di kiri dan pesan galat.
 */
function Field({ label, icon: Icon, error, hint, trailing, id, ...inputProps }) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div
        className={cn(
          "flex h-12 items-center gap-3 rounded-xl border bg-white px-4 transition-colors focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/20",
          error ? "border-red-500" : "border-line"
        )}
      >
        <Icon className="size-5 shrink-0 text-ink/60" aria-hidden="true" />
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle/80"
          {...inputProps}
        />
        {trailing}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Form pendaftaran. Hanya front-end: validasi di sisi klien, lalu memanggil `onSubmit`.
 * @param {{ onSubmit?: (values: { name: string, identifier: string, password: string }) => void }} props
 */
export function RegisterForm({ onSubmit }) {
  const uid = useId();
  const [values, setValues] = useState({ name: "", identifier: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate({ ...values, agree });
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // TODO: sambungkan ke Supabase Auth (signUp) lalu arahkan ke asesmen.
    onSubmit?.(values);
  }

  return (
    <div className="w-full max-w-[440px]">
      <h2 className="text-3xl font-bold tracking-tight text-brand md:text-[2.5rem] md:leading-tight">
        Buat Akun Laras Karya
      </h2>
      <p className="mt-2 text-base text-ink">Mulai temukan green jobs yang selaras dengan dirimu.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <Field
          id={`${uid}-name`}
          label="Nama Lengkap"
          icon={User}
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Masukkan nama lengkap"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
        />

        <Field
          id={`${uid}-identifier`}
          label="Email atau Nomor HP"
          icon={Mail}
          type="text"
          name="identifier"
          autoComplete="username"
          inputMode="email"
          placeholder="contoh@email.com"
          value={values.identifier}
          onChange={set("identifier")}
          error={errors.identifier}
        />

        <Field
          id={`${uid}-password`}
          label="Kata Sandi"
          icon={Lock}
          type={showPassword ? "text" : "password"}
          name="password"
          autoComplete="new-password"
          placeholder="Minimal 8 karakter"
          value={values.password}
          onChange={set("password")}
          error={errors.password}
          hint="Kata sandi harus terdiri dari kombinasi huruf dan angka"
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              aria-pressed={showPassword}
              className="grid size-8 shrink-0 place-items-center rounded-md text-ink/60 hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/30 focus-visible:outline-none"
            >
              {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
            </button>
          }
        />

        <div>
          <div className="flex items-start gap-3 text-sm text-ink/80">
            <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
              <input
                id={`${uid}-agree`}
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                aria-invalid={errors.agree ? true : undefined}
                aria-describedby={errors.agree ? `${uid}-agree-error` : undefined}
                className="peer size-5 cursor-pointer appearance-none rounded-md border-2 border-brand bg-white checked:bg-brand-light focus-visible:ring-3 focus-visible:ring-brand/30 focus-visible:outline-none"
              />
              <Check
                className="pointer-events-none absolute size-3.5 text-brand opacity-0 peer-checked:opacity-100"
                strokeWidth={3}
                aria-hidden="true"
              />
            </span>
            <label htmlFor={`${uid}-agree`} className="cursor-pointer leading-6">
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
          {errors.agree && (
            <p id={`${uid}-agree-error`} role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.agree}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button type="submit" className="h-12 w-full rounded-xl text-base font-semibold">
            Daftar Sekarang
          </Button>
          <p className="flex items-center justify-center gap-2 rounded-xl bg-accent-light py-2.5 text-sm font-bold text-accent">
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
          className="h-12 w-full gap-3 rounded-xl border-line bg-white text-base font-semibold text-ink"
        >
          <GoogleIcon className="size-5" />
          Daftar dengan Google
        </Button>
      </form>

      <p className="mt-8 text-center text-base text-ink">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-bold text-brand hover:underline">
          Masuk di sini
        </Link>
      </p>

      <p className="mt-8 flex items-center justify-center gap-2 text-sm text-subtle">
        <Lock className="size-4" aria-hidden="true" />
        Data Anda dilindungi dan tidak dibagikan tanpa izin.
      </p>
    </div>
  );
}
