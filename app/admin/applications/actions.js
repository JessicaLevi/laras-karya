"use server";

import { revalidatePath } from "next/cache";

import { NOT_ADMIN, getAdminContext } from "@/lib/admin";
import { APPLICATION_STATUSES } from "@/lib/admin-options";
import { isUuid } from "@/lib/is-uuid";

/** Ubah status lamaran: diproses | interview | diterima | ditolak. */
export async function setApplicationStatus(id, status) {
  const ctx = await getAdminContext();
  if (!ctx) return NOT_ADMIN;
  if (!isUuid(id) || !APPLICATION_STATUSES.some((s) => s.value === status)) {
    return { ok: false, message: "Data tidak valid." };
  }

  const { error } = await ctx.supabase.from("applications").update({ current_status: status }).eq("id", id);
  if (error) {
    console.error("[admin setApplicationStatus]", error.message);
    return { ok: false, message: "Gagal mengubah status lamaran." };
  }

  revalidatePath("/admin/applications");
  revalidatePath("/applications"); // halaman Lacak Lamaran milik pelamar
  return { ok: true };
}
