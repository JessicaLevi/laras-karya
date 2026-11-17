import { editPreferences } from "@/app/profile/actions";
import { fail, json, persist, readJsonObject, requireProfile } from "@/lib/profile-api";

/** Bidang industri yang diminati. Pilihan berasal dari tabel `sectors`; yang tersimpan di profiles.interest_sectors. */

function view(profile) {
  const selected = new Set(profile.industries);
  return {
    selected: profile.industryOptions.filter((o) => selected.has(o.label)),
    options: profile.industryOptions,
  };
}

/**
 * GET /api/profile/sectors
 * Sukses: 200 { ok: true, selected: [{value, label}], options: [{value, label}] }
 * Gagal : 401 belum masuk | 500 gagal memuat
 */
export async function GET() {
  const { profile, error } = await requireProfile();
  if (error) return error;
  return json({ ok: true, ...view(profile) });
}

/**
 * PUT /api/profile/sectors
 * Body: { "sectors": ["renewable_energy", "waste"] }   kode dari `options[].value`; daftar ini menggantikan pilihan lama
 * Sukses: 200 { ok: true, selected, options }
 * Gagal : 400 bukan JSON | 401 belum masuk | 422 kode tidak dikenal / daftar kosong | 500 gagal menyimpan
 */
export async function PUT(request) {
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");
  if (!Array.isArray(body.sectors) || body.sectors.length === 0 || !body.sectors.every((c) => typeof c === "string")) {
    return fail(422, "Field `sectors` harus berupa daftar kode sektor (minimal satu).");
  }

  const { profile, error } = await requireProfile();
  if (error) return error;
  const byCode = new Map(profile.industryOptions.map((o) => [o.value, o.label]));
  const unknown = body.sectors.filter((c) => !byCode.has(c));
  if (unknown.length > 0) return fail(422, `Kode sektor tidak dikenal: ${unknown.join(", ")}.`);

  const formData = new FormData();
  for (const code of new Set(body.sectors)) formData.append("industries", byCode.get(code));
  const saved = await persist(editPreferences(profile, formData));
  if (saved.error) return saved.error;
  return json({ ok: true, ...view(saved.profile) });
}
