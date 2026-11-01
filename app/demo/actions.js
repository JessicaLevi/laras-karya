"use server";

import { clearHistory, endSession } from "@/lib/mock-session";

/** Kembali jadi tamu (hapus cookie sesi dan penanda riwayat). Dipanggil halaman /demo. */
export async function resetSession() {
  await endSession();
  await clearHistory();
}
