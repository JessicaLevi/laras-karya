import { deleteSkill } from "@/app/profile/actions";
import { fail, json, persist, requireProfile } from "@/lib/profile-api";

/** Satu keahlian milik user. `id` = kode keahlian di katalog, didapat dari GET /api/profile/skills (mis. "python"). */

/**
 * DELETE /api/profile/skills/:id
 * Sukses: 200 { ok: true, skills }
 * Gagal : 401 belum masuk | 404 tidak ditemukan | 500 gagal menyimpan
 */
export async function DELETE(_request, { params }) {
  const { id } = await params;
  const { profile, error } = await requireProfile();
  if (error) return error;
  if (!profile.skills.some((s) => s.id === id)) return fail(404, "Keahlian tidak ditemukan.");

  const saved = await persist(deleteSkill(profile, id));
  if (saved.error) return saved.error;
  return json({ ok: true, skills: saved.profile.skills });
}
