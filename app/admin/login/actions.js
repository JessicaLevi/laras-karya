"use server";

import { redirect } from "next/navigation";

import { ADMIN_LOGIN_PATH, safeAdminNext } from "@/lib/admin";
import { EMAIL_RE } from "@/lib/auth-messages";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

/** Kembali ke /admin/login dengan kode error (pesan ada di page.js); ?next= tetap dibawa. */
function backWithError(code, next) {
  const q = new URLSearchParams({ error: code });
  if (next && next !== "/admin/jobs") q.set("next", next);
  redirect(`${ADMIN_LOGIN_PATH}?${q}`);
}

/**
 * Login khusus admin. Email dan kata sandi diperiksa Supabase Auth, lalu role dibaca dari profiles.
 * Akun yang bukan admin langsung dikeluarkan lagi (signOut), jadi tidak ada sesi yang tertinggal.
 */
export async function adminLogin(formData) {
  const next = safeAdminNext(formData.get("next"));
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!isSupabaseConfigured) backWithError("config", next);
  if (!EMAIL_RE.test(email)) backWithError("email", next);
  if (!password) backWithError("password_empty", next);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const code =
      error.code === "email_not_confirmed" ? "unconfirmed"
      : error.code === "over_request_rate_limit" ? "rate_limit"
      : error.status === 400 || error.code === "invalid_credentials" ? "invalid"
      : "server";
    backWithError(code, next);
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    backWithError("not_admin", next);
  }

  redirect(next);
}

/** Keluar dari panel admin, lalu kembali ke halaman login admin. */
export async function adminSignOut() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect(ADMIN_LOGIN_PATH);
}