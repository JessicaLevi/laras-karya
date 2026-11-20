import { addSkill } from "@/app/profile/actions";
import { fail, json, persist, readJsonObject, requireProfile, toFormData } from "@/lib/profile-api";
import { LANGUAGE_SKILL_CODES, SKILLS_CATALOG } from "@/lib/skills-catalog";

/**
 * Keahlian milik user yang sedang masuk (tabel user_skills). Keahlian hanya boleh dipilih dari katalog
 * (tabel skills, 120 keahlian), bukan diketik bebas. `id` keahlian = kodenya di katalog (mis. "python").
 * Bentuk satu keahlian: { id, label, highlight }; `highlight` = empat keahlian pertama, yang ditonjolkan di profil.
 * Keahlian bahasa ("Bahasa Inggris", dst.) tidak lewat sini, melainkan lewat /api/profile/languages.
 */

/** Keahlian di katalog yang masih bisa ditambahkan: belum dimiliki dan bukan keahlian bahasa. */
function selectableOptions(profile) {
  const taken = new Set(profile.skills.map((s) => s.id));
  return SKILLS_CATALOG.filter((s) => !taken.has(s.code) && !LANGUAGE_SKILL_CODES.has(s.code)).map(({ code, label, category }) => ({
    value: code,
    label,
    category,
  }));
}

/**
 * GET /api/profile/skills
 * Sukses: 200 { ok: true, skills, options: [{value, label, category}] }   `options` = yang masih bisa ditambahkan
 * Gagal : 401 belum masuk | 500 gagal memuat
 */
export async function GET() {
  const { profile, error } = await requireProfile();
  if (error) return error;
  return json({ ok: true, skills: profile.skills, options: selectableOptions(profile) });
}

/**
 * POST /api/profile/skills
 * Body: { "code": "python" }  atau  { "label": "Python" }   (nilainya dari `options` pada GET; bila keduanya dikirim, `code` dipakai)
 * Sukses: 201 { ok: true, skill, skills }
 * Gagal : 400 bukan JSON | 401 belum masuk | 409 keahlian sudah ada | 422 tidak ada di katalog / keahlian bahasa | 500 gagal menyimpan
 */
export async function POST(request) {
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");

  const { profile, error } = await requireProfile();
  if (error) return error;

  const code = typeof body.code === "string" ? body.code.trim() : "";
  const label = typeof body.label === "string" ? body.label.trim() : "";
  if (!code && !label) return fail(422, "Kirim `code` atau `label` keahlian dari katalog (lihat `options` pada GET /api/profile/skills).");

  const entry = SKILLS_CATALOG.find((s) => (code ? s.code === code : s.label.toLowerCase() === label.toLowerCase()));
  if (!entry) return fail(422, `Keahlian "${(code || label).slice(0, 60)}" tidak ada di katalog (lihat \`options\` pada GET /api/profile/skills).`);
  if (LANGUAGE_SKILL_CODES.has(entry.code)) {
    return fail(422, `"${entry.label}" adalah keahlian bahasa. Tambahkan lewat POST /api/profile/languages.`);
  }
  if (profile.skills.some((s) => s.id === entry.code)) return fail(409, `Keahlian "${entry.label}" sudah ada.`);

  const saved = await persist(addSkill(profile, toFormData({ label: entry.label })));
  if (saved.error) return saved.error;
  return json({ ok: true, skill: saved.profile.skills.find((s) => s.id === entry.code), skills: saved.profile.skills }, 201);
}
