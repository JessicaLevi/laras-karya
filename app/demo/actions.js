"use server";

import { endSession } from "@/lib/mock-session";

/** Kembali jadi tamu (hapus cookie sesi). Dipanggil halaman /demo. */
export async function resetSession() {
  await endSession();
}
