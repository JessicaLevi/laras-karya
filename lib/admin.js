import { redirect } from "next/navigation";

import { safeNextPath } from "@/lib/safe-next";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

/**
 * Konteks admin: { supabase, user } bila user yang sedang masuk berrole admin, selain itu null.
 * Role dibaca dari profiles.role lewat sesi user (dijaga RLS), bukan dari data browser.
 */
export async function getAdminContext() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user;
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") return null;
  return { supabase, user };
}

/** Untuk halaman: bukan admin -> arahkan ke /home (belum masuk sudah ditangani proxy). */
export async function requireAdminPage() {
  const ctx = await getAdminContext();
  if (!ctx) redirect("/home");
  return ctx;
}

export const NOT_ADMIN = { ok: false, error: "auth", message: "Akses ditolak. Hanya admin yang boleh melakukan ini." };

export const PAGE_SIZE = 10;

/** ?page=3 -> { page, from, to } untuk .range(from, to). */
export function pageRange(raw) {
  const page = Math.max(1, Number.parseInt(raw, 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  return { page, from, to: from + PAGE_SIZE - 1 };
}

/** Teks pencarian aman untuk filter PostgREST .or()/.ilike(). */
export const cleanQuery = (raw) => String(raw ?? "").replace(/[%,()*\\]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta" }) : "-";

export const ADMIN_LOGIN_PATH = "/admin/login";

/** Tujuan setelah login admin (?next=): hanya path di bawah /admin (bukan halaman login); selain itu /admin/jobs. */
export function safeAdminNext(value) {
  const path = safeNextPath(value, "");
  const inAdmin = path === "/admin" || path.startsWith("/admin/");
  const isLogin = path === ADMIN_LOGIN_PATH || path.startsWith(`${ADMIN_LOGIN_PATH}?`);
  return inAdmin && !isLogin ? path : "/admin/jobs";
}