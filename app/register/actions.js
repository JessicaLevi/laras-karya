"use server";

import { redirect } from "next/navigation";

export async function signup(formData) {
  // TODO: sambungkan ke Supabase Auth (signUp) di sini.
  // Sementara tanpa penjagaan: langsung arahkan ke langkah pertama asesmen.
  redirect("/assessment/1");
}
