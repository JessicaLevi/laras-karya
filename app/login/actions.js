"use server";

import { redirect } from "next/navigation";

export async function login(formData) {
  // TODO: sambungkan ke Supabase Auth (signInWithPassword) di sini.
  // Sementara tanpa penjagaan: langsung arahkan ke Beranda.
  redirect("/home");
}
