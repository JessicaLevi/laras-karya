"use server";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

/** Daftar bidang industri dari tabel sectors, dalam bentuk { value, label } (urut sort_order). */
export async function loadSectors() {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.from("sectors").select("code,label").order("sort_order", { ascending: true });
  if (error) {
    console.error("[loadSectors]", error.message);
    return [];
  }
  return data.map((s) => ({ value: s.code, label: s.label }));
}