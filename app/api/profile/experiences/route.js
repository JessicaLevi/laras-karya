import { addExperience } from "@/app/profile/actions";
import { fail, json, persist, readJsonObject, requireProfile, toFormData } from "@/lib/profile-api";
import { parseExperienceInput } from "@/lib/profile-api-fields";

/**
 * Pengalaman kerja milik user yang sedang masuk (tabel work_experiences). Urutannya sama dengan halaman /profile:
 * yang masih berjalan lebih dulu, lalu tanggal mulai terbaru. `id` tiap pengalaman berupa UUID dari database.
 * Bentuk satu pengalaman: { id, role, company, period, description }, mis.
 *   { "id": "…", "role": "Staf Lingkungan", "company": "PT Hijau Lestari", "period": "Jan 2022 — Sekarang (2 tahun 3 bulan)", "description": "…" }
 * `period` dikirim sebagai teks ("Jan 2022 — Sekarang"); saat dibaca kembali ditambah keterangan lama bekerja di belakangnya.
 */

/**
 * GET /api/profile/experiences
 * Sukses: 200 { ok: true, experiences }
 * Gagal : 401 belum masuk | 500 gagal memuat
 */
export async function GET() {
  const { profile, error } = await requireProfile();
  if (error) return error;
  return json({ ok: true, experiences: profile.experiences });
}

/**
 * POST /api/profile/experiences
 * Body: { "role": "Staf Lingkungan", "company": "PT Hijau Lestari", "period": "Jan 2022 — Sekarang", "description": "…" }
 *       `role` dan `company` wajib; `period` dan `description` boleh dikosongkan.
 *       `period` memuat tahun mulai, lalu "Sekarang" untuk pekerjaan yang masih berjalan atau tahun selesai ("2019 — 2021").
 * Sukses: 201 { ok: true, experience, experiences }
 * Gagal : 400 bukan JSON | 401 belum masuk | 422 data tidak valid | 500 gagal menyimpan
 */
export async function POST(request) {
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");

  const { profile, error } = await requireProfile();
  if (error) return error;
  const input = parseExperienceInput(body);
  if (input.error) return fail(422, input.error);

  // Baris baru dikenali dari id-nya: id yang belum ada sebelum disimpan.
  const before = new Set(profile.experiences.map((e) => e.id));
  const saved = await persist(addExperience(profile, toFormData(input.values)));
  if (saved.error) return saved.error;
  const experience = saved.profile.experiences.find((e) => !before.has(e.id));
  return json({ ok: true, experience, experiences: saved.profile.experiences }, 201);
}
