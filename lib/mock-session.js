import { cookies } from "next/headers";

import { HISTORY_COOKIE } from "@/lib/history-cookie";

/**
 * SEMENTARA (fase front-end): penanda "sudah masuk" berupa cookie, supaya server bisa
 * membedakan tamu dan pengguna. Nanti diganti sesi Supabase Auth; pemanggilnya
 * (hasSession, startSession, endSession) tidak perlu berubah bentuk. Hanya untuk server.
 * Tanpa maxAge: cookie hilang sendiri saat browser ditutup.
 */
export const SESSION_COOKIE = "lk_session";

export async function hasSession() {
  return (await cookies()).has(SESSION_COOKIE);
}

export async function startSession() {
  (await cookies()).set(SESSION_COOKIE, "1", { path: "/", httpOnly: true, sameSite: "lax" });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/*
  Penanda demo "pengguna sudah punya riwayat" (lib/demo-history.js). Sengaja BUKAN httpOnly karena
  dibaca juga oleh komponen client. Akun baru = cookie ini tidak ada. SEMENTARA, hapus bersama /demo.
*/
export async function markHistory() {
  (await cookies()).set(HISTORY_COOKIE, "1", { path: "/", sameSite: "lax" });
}

export async function clearHistory() {
  (await cookies()).delete(HISTORY_COOKIE);
}
