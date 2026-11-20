import { deleteExperience, editExperience } from "@/app/profile/actions";
import { fail, json, persist, readJsonObject, requireProfile, toFormData } from "@/lib/profile-api";
import { parseExperienceInput } from "@/lib/profile-api-fields";

/** Satu pengalaman kerja milik user. `id` didapat dari GET /api/profile/experiences. */

/**
 * PUT /api/profile/experiences/:id
 * Body: sama dengan POST, tetapi boleh sebagian: field yang tidak dikirim tetap memakai nilai lama.
 *       Field opsional (`period`, `description`) dikosongkan dengan mengirim "".
 * Sukses: 200 { ok: true, experience, experiences }
 * Gagal : 400 bukan JSON | 401 belum masuk | 404 tidak ditemukan | 422 data tidak valid | 500 gagal menyimpan
 */
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");

  const { profile, error } = await requireProfile();
  if (error) return error;
  const current = profile.experiences.find((e) => e.id === id);
  if (!current) return fail(404, "Pengalaman tidak ditemukan.");

  const input = parseExperienceInput(body, current);
  if (input.error) return fail(422, input.error);

  const saved = await persist(editExperience(profile, toFormData(input.values), id));
  if (saved.error) return saved.error;
  return json({ ok: true, experience: saved.profile.experiences.find((e) => e.id === id), experiences: saved.profile.experiences });
}

/**
 * DELETE /api/profile/experiences/:id
 * Sukses: 200 { ok: true, experiences }
 * Gagal : 401 belum masuk | 404 tidak ditemukan | 500 gagal menyimpan
 */
export async function DELETE(_request, { params }) {
  const { id } = await params;
  const { profile, error } = await requireProfile();
  if (error) return error;
  if (!profile.experiences.some((e) => e.id === id)) return fail(404, "Pengalaman tidak ditemukan.");

  const saved = await persist(deleteExperience(profile, id));
  if (saved.error) return saved.error;
  return json({ ok: true, experiences: saved.profile.experiences });
}
