import Link from "next/link";
import { redirect } from "next/navigation";
import { CircleAlert, Lock, Mail, ShieldCheck } from "lucide-react";

import { getAdminContext, safeAdminNext } from "@/lib/admin";
import { authMessage } from "@/lib/auth-messages";
import { adminLogin } from "./actions";

export const metadata = { title: "Masuk Admin | Laras Karya" };

const NOT_ADMIN_MESSAGE = "Akun ini bukan akun admin. Gunakan halaman Masuk biasa untuk pencari kerja.";

export default async function AdminLoginPage({ searchParams }) {
  // Sudah masuk sebagai admin: langsung ke panel.
  if (await getAdminContext()) redirect("/admin/jobs");

  const sp = await searchParams;
  const next = safeAdminNext(sp?.next);
  const message = sp?.error === "not_admin" ? NOT_ADMIN_MESSAGE : authMessage(sp?.error);

  return (
    <div className="mx-auto mt-8 w-full max-w-[420px] rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-brand">Masuk Admin</h1>
          <p className="text-sm text-ink">Khusus pengelola Laras Karya.</p>
        </div>
      </div>

      <form action={adminLogin} className="mt-6 space-y-4">
        <input type="hidden" name="next" value={next} />

        {message ? (
          <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {message}
          </p>
        ) : null}

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
          <div className="flex h-11 items-center gap-3 rounded-xl border border-line bg-white px-4 focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/20">
            <Mail className="size-5 shrink-0 text-ink/60" aria-hidden="true" />
            <input id="email" name="email" type="email" autoComplete="email" required placeholder="admin@email.com" className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none" />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">Kata sandi</label>
          <div className="flex h-11 items-center gap-3 rounded-xl border border-line bg-white px-4 focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/20">
            <Lock className="size-5 shrink-0 text-ink/60" aria-hidden="true" />
            <input id="password" name="password" type="password" autoComplete="current-password" required className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none" />
          </div>
        </div>

        <button type="submit" className="h-11 w-full rounded-xl bg-brand text-sm font-semibold text-white hover:bg-brand/90">
          Masuk
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink">
        Bukan admin?{" "}
        <Link href="/login" className="font-semibold text-brand hover:underline">Masuk sebagai pencari kerja</Link>
      </p>
    </div>
  );
}