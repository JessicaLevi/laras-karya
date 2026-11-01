"use server";

import { redirect } from "next/navigation";

import { clearHistory, startSession } from "@/lib/mock-session";
import { safeNextPath } from "@/lib/safe-next";

export async function signup(formData) {
  // TODO: sambungkan ke Supabase Auth (signUp) di sini.
  // Sementara tanpa penjagaan: tandai sesi, lalu ke tujuan (?next=) atau langkah pertama asesmen.
  // Dari pratinjau hasil, ?next=/recommended-jobs membawa pengguna langsung ke rekomendasi.
  await startSession();
  await clearHistory(); // akun baru: belum ada lamaran atau riwayat (lib/demo-history.js)
  redirect(safeNextPath(formData.get("next"), "/assessment/1"));
}
