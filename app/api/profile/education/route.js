import { addEducation } from "@/app/profile/actions";
import { fail, json, persist, readJsonObject, requireProfile, toFormData } from "@/lib/profile-api";
import { parseEducationInput } from "@/lib/profile-api-fields";

/**
 * Riwayat pendidikan milik user yang sedang masuk (tabel educations). Urutannya sama dengan halaman /profile:
 * tahun selesai terbaru lebih dulu. `id` tiap pendidikan berupa UUID dari database.
 * Bentuk satu pendidikan: { id, degree, school, period, gpa }, mis.
 *   { "id": "…", "degree": "S1 Ilmu Lingkungan", "school": "Universitas Lambung Mangkurat", "period": "2016 — 2020", "gpa": "IPK: 3.72 / 4.00" }
 * Jenjang tersimpan sebagai sma/d3/s1/s2/s3, jadi SMK tampil "SMA/SMK" dan D4 tampil "S1".
 */

/**
 * GET /api/profile/education
 * Sukses: 200 { ok: true, educations }
 * Gagal : 401 belum masuk | 500 gagal memuat
 */
export async function GET() {
  const { profile, error } = await requireProfile();
  if (error) return error;
  return json({ ok: true, educations: profile.education });
}

/**
 * POST /api/profile/education
 * Body: { "degree": "S1 Ilmu Lingkungan", "school": "Universitas Lambung Mangkurat", "period": "2016 — 2020", "gpa": "IPK: 3.72 / 4.00" }
 *       `degree` dan `school` wajib; `period` dan `gpa` boleh dikosongkan (gpa boleh juga angka, mis. 3.72)
 * Sukses: 201 { ok: true, education, educations }
 * Gagal : 400 bukan JSON | 401 belum masuk | 422 data tidak valid | 500 gagal menyimpan
 */
export async function POST(request) {
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");

  const { profile, error } = await requireProfile();
  if (error) return error;
  const input = parseEducationInput(body);
  if (input.error) return fail(422, input.error);

  // Baris baru dikenali dari id-nya: id yang belum ada sebelum disimpan.
  const before = new Set(profile.education.map((e) => e.id));
  const saved = await persist(addEducation(profile, toFormData(input.values)));
  if (saved.error) return saved.error;
  const education = saved.profile.education.find((e) => !before.has(e.id));
  return json({ ok: true, education, educations: saved.profile.education }, 201);
}
