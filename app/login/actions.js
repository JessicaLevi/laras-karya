"use server";

import { redirect } from "next/navigation";

import { markHistory, startSession } from "@/lib/mock-session";
import { safeNextPath } from "@/lib/safe-next";

export async function login(formData) {
  // TODO: sambungkan ke Supabase Auth (signInWithPassword) di sini.
  // Sementara tanpa penjagaan: tandai sesi, lalu ke tujuan (?next=) atau Beranda.
  await startSession();
  await markHistory(); // akun lama: sudah punya riwayat (lib/demo-history.js)
  redirect(safeNextPath(formData.get("next"), "/home"));
}
