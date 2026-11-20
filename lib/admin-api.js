import { revalidatePath } from "next/cache";

import { getAdminContext } from "@/lib/admin";
import { fail } from "@/lib/profile-api";
import { getCurrentUser } from "@/lib/session";

/**
 * Pembantu untuk route /api/admin/*. Respons memakai bentuk yang sama dengan /api/profile/*
 * ({ ok, ... } dan { ok: false, error }), jadi json/fail/readJsonObject dipakai ulang dari profile-api.
 */
export { fail, json, readJsonObject } from "@/lib/profile-api";

/**
 * Hanya admin. Berhasil: { supabase, user } (klien Supabase memakai sesi user, jadi RLS tetap berlaku).
 * Gagal: { error } berupa respons 401 (belum masuk) atau 403 (sudah masuk, tetapi bukan admin).
 * Role dibaca dari profiles.role oleh getAdminContext, bukan dari kiriman klien.
 */
export async function requireAdmin() {
  const ctx = await getAdminContext();
  if (ctx) return ctx;
  const user = await getCurrentUser();
  if (!user) return { error: fail(401, "Sesi Anda berakhir. Silakan masuk lagi.") };
  return { error: fail(403, "Akses ditolak. Hanya admin yang boleh melakukan ini.") };
}

/** Sama dengan afterWrite() di app/admin/jobs/actions.js: halaman yang menampilkan lowongan disegarkan. */
export function revalidateJobs() {
  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
  revalidatePath("/recommended-jobs");
}
