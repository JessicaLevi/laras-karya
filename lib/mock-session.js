import { cookies } from "next/headers";

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
