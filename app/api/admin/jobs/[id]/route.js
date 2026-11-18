import { JOB_STATUSES } from "@/lib/admin-options";
import { parseJobInput, publishedAtFor, sectorExists } from "@/lib/admin-jobs";
import { fail, json, readJsonObject, requireAdmin, revalidateJobs } from "@/lib/admin-api";
import { isUuid } from "@/lib/is-uuid";

/** Satu lowongan. `id` (UUID) didapat dari GET /api/admin/jobs. Id yang bukan UUID dijawab 404. */

const NOT_FOUND = "Lowongan tidak ditemukan.";

/**
 * GET /api/admin/jobs/:id
 * Sukses: 200 { ok: true, job }   (semua kolom tabel jobs)
 * Gagal : 401 | 403 | 404 tidak ditemukan | 500 gagal memuat
 */
export async function GET(_request, { params }) {
  const { id } = await params;
  const admin = await requireAdmin();
  if (admin.error) return admin.error;
  if (!isUuid(id)) return fail(404, NOT_FOUND);

  const { data, error } = await admin.supabase.from("jobs").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("[api admin jobs get]", error.message);
    return fail(500, "Lowongan belum bisa dimuat.");
  }
  return data ? json({ ok: true, job: data }) : fail(404, NOT_FOUND);
}

/**
 * PUT /api/admin/jobs/:id
 * Body: field yang sama dengan POST, tetapi boleh sebagian: field yang tidak dikirim tetap memakai nilai lama.
 *       Field opsional dikosongkan dengan mengirim null atau "" (city, province, salary_min, salary_max, deadline).
 *       published_at terisi saat pertama kali berstatus "published" dan tidak berubah setelahnya.
 * Sukses: 200 { ok: true, job }
 * Gagal : 400 bukan JSON | 401 | 403 | 404 | 422 { error, errors: { field: pesan } } | 500 gagal menyimpan
 */
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");

  const admin = await requireAdmin();
  if (admin.error) return admin.error;
  if (!isUuid(id)) return fail(404, NOT_FOUND);

  const { data: current, error: readError } = await admin.supabase.from("jobs").select("*").eq("id", id).maybeSingle();
  if (readError) {
    console.error("[api admin jobs put read]", readError.message);
    return fail(500, "Lowongan belum bisa dimuat.");
  }
  if (!current) return fail(404, NOT_FOUND);

  const parsed = parseJobInput(body, current);
  if (parsed.errors) return json({ ok: false, error: "Periksa kembali isian yang bertanda galat.", errors: parsed.errors }, 422);
  const { values } = parsed;
  if (values.sector !== current.sector && !(await sectorExists(admin.supabase, values.sector))) {
    return json({ ok: false, error: "Periksa kembali isian yang bertanda galat.", errors: { sector: "Sektor tidak dikenal (lihat GET /api/admin/jobs/options)." } }, 422);
  }

  const row = { ...values, published_at: publishedAtFor(values.status, current.published_at) };
  const { data, error } = await admin.supabase.from("jobs").update(row).eq("id", id).select().maybeSingle();
  if (error) {
    console.error("[api admin jobs update]", error.message);
    return fail(500, "Gagal memperbarui lowongan. Coba lagi.");
  }
  if (!data) return fail(404, NOT_FOUND);
  revalidateJobs();
  return json({ ok: true, job: data });
}

/**
 * PATCH /api/admin/jobs/:id
 * Ubah status saja (sama dengan pilihan status cepat di daftar admin).
 * Body: { "status": "published" }   draft | published | closed
 * Sukses: 200 { ok: true, job }
 * Gagal : 400 bukan JSON | 401 | 403 | 404 | 422 status tidak dikenal | 500 gagal menyimpan
 */
export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");

  const admin = await requireAdmin();
  if (admin.error) return admin.error;
  if (!isUuid(id)) return fail(404, NOT_FOUND);
  if (!JOB_STATUSES.some((s) => s.value === body.status)) return fail(422, "Status tidak dikenal. Pilih draft, published, atau closed.");

  const { data: current, error: readError } = await admin.supabase.from("jobs").select("published_at").eq("id", id).maybeSingle();
  if (readError) {
    console.error("[api admin jobs patch read]", readError.message);
    return fail(500, "Gagal mengubah status.");
  }
  if (!current) return fail(404, NOT_FOUND);

  const patch = { status: body.status };
  if (body.status === "published" && !current.published_at) patch.published_at = publishedAtFor("published", null);

  const { data, error } = await admin.supabase.from("jobs").update(patch).eq("id", id).select().maybeSingle();
  if (error) {
    console.error("[api admin jobs patch]", error.message);
    return fail(500, "Gagal mengubah status.");
  }
  if (!data) return fail(404, NOT_FOUND);
  revalidateJobs();
  return json({ ok: true, job: data });
}

/**
 * DELETE /api/admin/jobs/:id
 * Sukses: 200 { ok: true }
 * Gagal : 401 | 403 | 404 | 409 sudah punya pelamar/data terkait (ubah statusnya jadi closed) | 500 gagal menghapus
 */
export async function DELETE(_request, { params }) {
  const { id } = await params;
  const admin = await requireAdmin();
  if (admin.error) return admin.error;
  if (!isUuid(id)) return fail(404, NOT_FOUND);

  // select() agar tahu baris benar-benar terhapus: delete pada id yang tidak ada tidak mengembalikan galat.
  const { data, error } = await admin.supabase.from("jobs").delete().eq("id", id).select("id");
  if (error) {
    if (error.code === "23503") {
      return fail(409, "Lowongan sudah punya pelamar atau data terkait. Ubah statusnya menjadi closed.");
    }
    console.error("[api admin jobs delete]", error.message);
    return fail(500, "Gagal menghapus lowongan.");
  }
  if (!data || data.length === 0) return fail(404, NOT_FOUND);
  revalidateJobs();
  return json({ ok: true });
}
