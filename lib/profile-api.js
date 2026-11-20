import { NextResponse } from "next/server";

import { loadMyProfile, saveMyProfile } from "@/app/profile/data-actions";
import { getCurrentUser } from "@/lib/session";

/**
 * Pembantu untuk route /api/profile/*: cek sesi, muat profil user, jalankan perubahan, lalu simpan.
 * Memakai fungsi yang sama dengan halaman /profile (app/profile/actions.js + data-actions.js).
 */

export const json = (body, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export const fail = (status, error) => json({ ok: false, error }, status);

/** Body JSON berupa objek, atau null bila bukan. */
export async function readJsonObject(request) {
  try {
    const body = await request.json();
    return body && typeof body === "object" && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

/** Dua langkah awal yang sama di semua route: user harus masuk, dan profilnya harus bisa dimuat. */
export async function requireProfile() {
  const user = await getCurrentUser();
  if (!user) return { error: fail(401, "Sesi Anda berakhir. Silakan masuk lagi.") };
  const profile = await loadMyProfile();
  if (!profile) return { error: fail(500, "Profil belum bisa dimuat. Coba lagi beberapa saat lagi.") };
  return { profile };
}

/** Simpan profil hasil perubahan; kembalikan profil terbaru dari database (atau respons gagal). */
export async function persist(next) {
  const result = await saveMyProfile(next);
  return result.ok ? { profile: result.profile } : { error: fail(500, result.error) };
}

export function toFormData(values) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) formData.set(key, String(value ?? ""));
  return formData;
}
