import { EMPLOYMENT_TYPES, JOB_STATUSES, WORK_MODES } from "@/lib/admin-options";
import { fail, json, requireAdmin } from "@/lib/admin-api";

/**
 * GET /api/admin/jobs/options
 * Pilihan untuk mengisi POST/PUT /api/admin/jobs (sama dengan isi dropdown di formulir admin).
 * Tiap pilihan: { value, label }; `value` adalah kode yang dikirim ke API.
 * Sukses: 200 { ok: true, statuses, employmentTypes, workArrangements, sectors: [{ code, label }] }
 * Gagal : 401 belum masuk | 403 bukan admin | 500 gagal memuat sektor
 */
export async function GET() {
  const admin = await requireAdmin();
  if (admin.error) return admin.error;

  const { data, error } = await admin.supabase.from("sectors").select("code,label").order("label");
  if (error) {
    console.error("[api admin jobs options]", error.message);
    return fail(500, "Pilihan sektor belum bisa dimuat.");
  }
  return json({ ok: true, statuses: JOB_STATUSES, employmentTypes: EMPLOYMENT_TYPES, workArrangements: WORK_MODES, sectors: data ?? [] });
}
