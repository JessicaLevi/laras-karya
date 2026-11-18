"use server";

import { revalidatePath } from "next/cache";

import { NOT_ADMIN, getAdminContext } from "@/lib/admin";
import { USER_ROLES } from "@/lib/admin-options";
import { isUuid } from "@/lib/is-uuid";

/** Ubah role pengguna: seeker | admin. Admin tidak bisa mengubah role dirinya sendiri. */
export async function setUserRole(userId, role) {
  const ctx = await getAdminContext();
  if (!ctx) return NOT_ADMIN;
  if (!isUuid(userId) || !USER_ROLES.some((r) => r.value === role)) return { ok: false, message: "Data tidak valid." };
  if (userId === ctx.user.id) return { ok: false, message: "Anda tidak bisa mengubah role akun sendiri." };

  const { error } = await ctx.supabase.from("profiles").update({ role }).eq("id", userId);
  if (error) {
    console.error("[admin setUserRole]", error.message);
    return { ok: false, message: "Gagal mengubah role." };
  }

  revalidatePath("/admin/users");
  return { ok: true };
}
