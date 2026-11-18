import { NextResponse } from "next/server";

import { setJobSaved } from "@/app/bookmarks/actions";
import { fetchSavedJobs } from "@/lib/saved-jobs-db";
import { getCurrentUser } from "@/lib/session";

/**
 * API lowongan tersimpan: GET /api/bookmarks dan POST /api/bookmarks.
 * Memakai logika yang sama dengan halaman /bookmarks dan Server Action setJobSaved
 * (validasi ulang di server, sesi user, RLS), jadi data tersimpan ke tabel saved_jobs milik user yang sedang masuk.
 */

// Pemetaan hasil setJobSaved -> status HTTP
const STATUS_BY_ERROR = { auth: 401, invalid: 422, db: 500 };

/**
 * GET /api/bookmarks
 * Daftar lowongan tersimpan milik user, yang terbaru disimpan di atas.
 * Sukses: 200 { ok: true, jobs }
 * Gagal : 401 belum masuk | 500 gagal memuat
 */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  try {
    const jobs = await fetchSavedJobs(user);
    return NextResponse.json({ ok: true, jobs }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[api/bookmarks] GET:", error.message);
    return NextResponse.json({ ok: false, error: "db" }, { status: 500 });
  }
}

/**
 * POST /api/bookmarks
 * Body: { jobId, saved } (jobId = UUID lowongan, saved = true untuk menyimpan, false untuk membatalkan simpan)
 * Aman dipanggil berulang: menyimpan lowongan yang sudah tersimpan tidak membuat baris ganda.
 * Sukses: 200 { ok: true }
 * Gagal : 400 body bukan JSON | 401 belum masuk | 422 jobId atau saved tidak valid | 500 gagal menyimpan
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const result = await setJobSaved(body.jobId, body.saved);
  if (result.ok) return NextResponse.json(result);

  return NextResponse.json(result, { status: STATUS_BY_ERROR[result.error] ?? 500 });
}