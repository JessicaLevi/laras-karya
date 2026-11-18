import { deleteEducation, editEducation } from "@/app/profile/actions";
import { fail, json, persist, readJsonObject, requireProfile, toFormData } from "@/lib/profile-api";
import { parseEducationInput } from "@/lib/profile-api-fields";

/** Satu pendidikan milik user. `id` didapat dari GET /api/profile/education. */

/**
 * PUT /api/profile/education/:id
 * Body: sama dengan POST, tetapi boleh sebagian: field yang tidak dikirim tetap memakai nilai lama.
 *       Field opsional (`period`, `gpa`) dikosongkan dengan mengirim "".
 * Sukses: 200 { ok: true, education, educations }
 * Gagal : 400 bukan JSON | 401 belum masuk | 404 tidak ditemukan | 422 data tidak valid | 500 gagal menyimpan
 */
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");

  const { profile, error } = await requireProfile();
  if (error) return error;
  const current = profile.education.find((e) => e.id === id);
  if (!current) return fail(404, "Pendidikan tidak ditemukan.");

  const input = parseEducationInput(body, current);
  if (input.error) return fail(422, input.error);

  const saved = await persist(editEducation(profile, toFormData(input.values), id));
  if (saved.error) return saved.error;
  return json({ ok: true, education: saved.profile.education.find((e) => e.id === id), educations: saved.profile.education });
}

/**
 * DELETE /api/profile/education/:id
 * Sukses: 200 { ok: true, educations }
 * Gagal : 401 belum masuk | 404 tidak ditemukan | 500 gagal menyimpan
 */
export async function DELETE(_request, { params }) {
  const { id } = await params;
  const { profile, error } = await requireProfile();
  if (error) return error;
  if (!profile.education.some((e) => e.id === id)) return fail(404, "Pendidikan tidak ditemukan.");

  const saved = await persist(deleteEducation(profile, id));
  if (saved.error) return saved.error;
  return json({ ok: true, educations: saved.profile.education });
}
