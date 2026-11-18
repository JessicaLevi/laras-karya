import { PAGE_SIZE, cleanQuery, pageRange } from "@/lib/admin";
import { JOB_STATUSES } from "@/lib/admin-options";
import { JOB_LIST_COLUMNS, parseJobInput, publishedAtFor, sectorExists } from "@/lib/admin-jobs";
import { fail, json, readJsonObject, requireAdmin, revalidateJobs } from "@/lib/admin-api";

/**
 * Kelola lowongan (menu Lowongan di halaman admin): tabel jobs. Hanya untuk user berrole admin,
 * memakai sesi login yang sama dengan halaman admin (cookie), dan dijaga RLS Supabase.
 * `id` lowongan berupa UUID. Nilai enum memakai kode database:
 *   status           : draft | published | closed
 *   employment_type  : full_time | part_time | contract | internship
 *   work_arrangement : onsite | hybrid | remote
 * Daftar kode lengkap (termasuk sektor) ada di GET /api/admin/jobs/options.
 */

/**
 * GET /api/admin/jobs?q=&status=&page=
 * q      : cari pada judul atau nama perusahaan (opsional)
 * status : draft | published | closed (opsional)
 * page   : mulai dari 1; 10 lowongan per halaman, yang terbaru diubah lebih dulu (sama dengan halaman admin)
 * Sukses: 200 { ok: true, jobs, page, pageSize, total, totalPages }
 * Gagal : 401 belum masuk | 403 bukan admin | 422 status tidak dikenal | 500 gagal memuat
 */
export async function GET(request) {
  const admin = await requireAdmin();
  if (admin.error) return admin.error;

  const params = new URL(request.url).searchParams;
  const q = cleanQuery(params.get("q"));
  const status = params.get("status") ?? "";
  if (status && !JOB_STATUSES.some((s) => s.value === status)) {
    return fail(422, "Status tidak dikenal. Pilih draft, published, atau closed.");
  }
  const { page, from, to } = pageRange(params.get("page"));

  let query = admin.supabase.from("jobs").select(JOB_LIST_COLUMNS, { count: "exact" }).order("updated_at", { ascending: false }).range(from, to);
  if (q) query = query.or(`title.ilike.%${q}%,company_name.ilike.%${q}%`);
  if (status) query = query.eq("status", status);

  const { data, count, error } = await query;
  if (error) {
    console.error("[api admin jobs list]", error.message);
    return fail(500, "Lowongan belum bisa dimuat.");
  }
  const total = count ?? 0;
  return json({ ok: true, jobs: data ?? [], page, pageSize: PAGE_SIZE, total, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) });
}

/**
 * POST /api/admin/jobs
 * Body: { "title": "Teknisi Panel Surya", "company_name": "PT Surya Nusantara", "sector": "energi_terbarukan",
 *         "description": "Minimal 20 karakter…", "status": "published", "employment_type": "full_time",
 *         "work_arrangement": "onsite", "city": "Banjarmasin", "province": "Kalimantan Selatan",
 *         "salary_min": 5000000, "salary_max": 8000000, "deadline": "2026-12-31", "is_green_job": true }
 *       Wajib: title (3-150), company_name (2-120), sector (kode dari /options), description (20-5000).
 *       Bila tidak dikirim: status "draft", employment_type "full_time", work_arrangement "onsite", is_green_job true.
 *       Opsional: city, province, salary_min, salary_max (angka >= 0, min <= max), deadline (YYYY-MM-DD).
 * Sukses: 201 { ok: true, job }   published_at terisi otomatis bila status "published"
 * Gagal : 400 bukan JSON | 401 | 403 | 422 { error, errors: { field: pesan } } | 500 gagal menyimpan
 */
export async function POST(request) {
  const body = await readJsonObject(request);
  if (!body) return fail(400, "Data yang dikirim bukan JSON yang valid.");

  const admin = await requireAdmin();
  if (admin.error) return admin.error;

  const parsed = parseJobInput(body);
  if (parsed.errors) return json({ ok: false, error: "Periksa kembali isian yang bertanda galat.", errors: parsed.errors }, 422);
  const { values } = parsed;
  if (!(await sectorExists(admin.supabase, values.sector))) {
    return json({ ok: false, error: "Periksa kembali isian yang bertanda galat.", errors: { sector: "Sektor tidak dikenal (lihat GET /api/admin/jobs/options)." } }, 422);
  }

  const row = { ...values, published_at: publishedAtFor(values.status, null) };
  const { data, error } = await admin.supabase.from("jobs").insert(row).select().single();
  if (error || !data) {
    console.error("[api admin jobs insert]", error?.message);
    return fail(500, "Gagal menyimpan lowongan. Periksa data lalu coba lagi.");
  }
  revalidateJobs();
  return json({ ok: true, job: data }, 201);
}
