import { deleteLanguage, editLanguage } from "@/app/profile/actions";
import { fail, json, persist, readJsonObject, requireProfile, toFormData } from "@/lib/profile-api";
import { LANGUAGE_LEVELS } from "@/lib/profile-options";
import { languageSkillCodeOf } from "@/lib/skills-catalog";

/** Satu bahasa milik user. `id` didapat dari GET /api/profile/languages (mis. lang-1). */

const withSync = (lang) => ({ ...lang, skillCode: languageSkillCodeOf(lang.name), syncedToSkills: Boolean(languageSkillCodeOf(lang.name)) });

/**
 * PUT /api/profile/languages/:id
 * Body: { "name": "Inggris", "level": "Native" }  (name boleh dikosongkan untuk tetap memakai nama lama)
 * Sukses: 200 { ok: true, language, languages }
 * Gagal : 400 bukan JSON | 401 belum masuk | 404 tidak ditemukan | 409 nama sudah dipakai bahasa lain | 422 | 500
 */
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");

  const { profile, error } = await requireProfile();
  if (error) return error;
  const current = profile.languages.find((l) => l.id === id);
  if (!current) return fail(404, "Bahasa tidak ditemukan.");

  const name = typeof body.name === "string" && body.name.trim() ? body.name.trim() : current.name;
  const level = typeof body.level === "string" && body.level.trim() ? body.level.trim() : current.level;
  if (name.length > 60) return fail(422, "Nama bahasa maksimal 60 karakter.");
  if (!LANGUAGE_LEVELS[level]) return fail(422, `Level harus salah satu dari: ${Object.keys(LANGUAGE_LEVELS).join(", ")}.`);
  if (profile.languages.some((l) => l.id !== id && l.name.trim().toLowerCase() === name.toLowerCase())) {
    return fail(409, `Bahasa "${name}" sudah ada.`);
  }

  const saved = await persist(editLanguage(profile, toFormData({ name, level }), id));
  if (saved.error) return saved.error;
  const language = saved.profile.languages.find((l) => l.name.trim().toLowerCase() === name.toLowerCase());
  return json({ ok: true, language: language && withSync(language), languages: saved.profile.languages.map(withSync) });
}

/**
 * DELETE /api/profile/languages/:id
 * Sukses: 200 { ok: true, languages }   (baris user_skills padanannya ikut terhapus)
 * Gagal : 401 belum masuk | 404 tidak ditemukan | 500 gagal menyimpan
 */
export async function DELETE(_request, { params }) {
  const { id } = await params;
  const { profile, error } = await requireProfile();
  if (error) return error;
  if (!profile.languages.some((l) => l.id === id)) return fail(404, "Bahasa tidak ditemukan.");

  const saved = await persist(deleteLanguage(profile, id));
  if (saved.error) return saved.error;
  return json({ ok: true, languages: saved.profile.languages.map(withSync) });
}
