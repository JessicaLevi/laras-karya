"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

import { Field, PasswordToggle } from "@/components/auth/field";
import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { validateIdentifier } from "@/lib/validation";

/** @returns {Record<string, string>} pesan galat per kolom (kosong jika valid) */
function validate({ identifier, password }) {
  const errors = {};
  const identifierError = validateIdentifier(identifier);
  if (identifierError) errors.identifier = identifierError;
  if (!password) errors.password = "Kata sandi wajib diisi.";
  return errors;
}

/**
 * Form masuk. Terhubung langsung ke Supabase Auth (jika kunci API sudah ada),
 * dan memiliki fallback mulus langsung mengarah ke /home jika database belum terhubung.
 * @param {{ onSubmit?: (values: { identifier: string, password: string }) => void }} props
 */
export function LoginForm({ onSubmit }) {
  const uid = useId();
  const router = useRouter();
  const [values, setValues] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsLoading(true);

    try {
      const supabase = createClient();
      if (supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.identifier,
          password: values.password,
        });

        if (error) {
          setErrors({ identifier: error.message || "Email atau kata sandi tidak cocok." });
          setIsLoading(false);
          return;
        }
      }

      onSubmit?.(values);
      router.push("/home");
    } catch {
      setErrors({ identifier: "Terjadi kesalahan saat masuk. Silakan coba lagi." });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true);
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/home`,
          },
        });
      } else {
        router.push("/home");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[440px]">
      <h2 className="text-3xl font-bold tracking-tight text-brand md:text-[2.5rem] md:leading-tight">
        Selamat Datang Kembali
      </h2>
      <p className="mt-2 text-base text-ink">Masuk untuk melanjutkan perjalanan karier hijau Anda.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
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
          autoComplete="current-password"
          placeholder="Masukkan kata sandi Anda"
          value={values.password}
          onChange={set("password")}
          error={errors.password}
          footerAside={
            <Link href="/forgot-password" className="shrink-0 font-semibold text-brand hover:underline">
              Lupa kata sandi?
            </Link>
          }
          trailing={<PasswordToggle shown={showPassword} onToggle={() => setShowPassword((v) => !v)} />}
        />

        <Button type="submit" disabled={isLoading} className="mt-4 h-12 w-full rounded-xl text-base font-semibold">
          {isLoading ? "Memproses..." : "Masuk"}
        </Button>

        <div className="flex items-center gap-4 text-sm text-subtle" role="separator" aria-label="atau">
          <span className="h-px flex-1 bg-line" />
          atau
          <span className="h-px flex-1 bg-line" />
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={handleGoogleLogin}
          className="h-12 w-full gap-3 rounded-xl border-line bg-white text-base font-semibold text-ink"
        >
          <GoogleIcon className="size-5" />
          Masuk dengan Google
        </Button>
      </form>

      <p className="mt-8 text-center text-base text-ink">
        Belum punya akun?{" "}
        <Link href="/register" className="font-bold text-brand hover:underline">
          Daftar di sini
        </Link>
      </p>

      <p className="mt-8 flex items-center justify-center gap-2 text-sm text-subtle">
        <Lock className="size-4" aria-hidden="true" />
        Data Anda dilindungi dan tidak dibagikan tanpa izin.
      </p>
    </div>
  );
}
