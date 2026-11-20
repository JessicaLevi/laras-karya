import { addLanguage } from "@/app/profile/actions";
import { fail, json, persist, readJsonObject, requireProfile, toFormData } from "@/lib/profile-api";
import { LANGUAGE_LEVELS } from "@/lib/profile-options";
import { languageSkillCodeOf } from "@/lib/skills-catalog";

/**
 * Bahasa milik user yang sedang masuk. Bahasa yang punya padanan di katalog keahlian (mis. Inggris ->
 * bahasa_inggris) otomatis ikut tersimpan di user_skills beserta levelnya (field `syncedToSkills`).
 * Catatan: `id` bahasa berurutan (lang-1, lang-2, ...) mengikuti urutan daftar saat ini.
 */

const withSync = (lang) => ({ ...lang, skillCode: languageSkillCodeOf(lang.name), syncedToSkills: Boolean(languageSkillCodeOf(lang.name)) });

/**
 * GET /api/profile/languages
 * Sukses: 200 { ok: true, levels, languages }
 * Gagal : 401 belum masuk | 500 gagal memuat
 */
export async function GET() {
  const { profile, error } = await requireProfile();
  if (error) return error;
  return json({ ok: true, levels: Object.keys(LANGUAGE_LEVELS), languages: profile.languages.map(withSync) });
}

/**
 * POST /api/profile/languages
 * Body: { "name": "Inggris", "level": "Profesional" }   level: Native | Profesional | Menengah | Dasar
 * Sukses: 201 { ok: true, language, languages }
 * Gagal : 400 bukan JSON | 401 belum masuk | 409 bahasa sudah ada | 422 data tidak valid | 500 gagal menyimpan
 */
export async function POST(request) {
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const level = typeof body.level === "string" ? body.level.trim() : "Profesional";
  if (!name || name.length > 60) return fail(422, "Nama bahasa wajib diisi (maksimal 60 karakter).");
  if (!LANGUAGE_LEVELS[level]) return fail(422, `Level harus salah satu dari: ${Object.keys(LANGUAGE_LEVELS).join(", ")}.`);

  const { profile, error } = await requireProfile();
  if (error) return error;
  if (profile.languages.some((l) => l.name.trim().toLowerCase() === name.toLowerCase())) {
    return fail(409, `Bahasa "${name}" sudah ada.`);
  }

  const saved = await persist(addLanguage(profile, toFormData({ name, level })));
  if (saved.error) return saved.error;
  const language = saved.profile.languages.find((l) => l.name.trim().toLowerCase() === name.toLowerCase());
  return json({ ok: true, language: language && withSync(language), languages: saved.profile.languages.map(withSync) }, 201);
}
