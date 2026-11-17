import { NextResponse } from "next/server";

import { submitApplication } from "@/app/applications/actions";
import { fetchMyApplications } from "@/lib/applications-db";
import { getCurrentUser } from "@/lib/session";

/**
 * API lamaran: POST /api/application dan GET /api/application.
 * Memakai logika yang sama dengan Server Action (validasi ulang di server, sesi user, RLS),
 * jadi lamaran tersimpan ke tabel applications untuk user yang sedang masuk.
 */

// Pemetaan hasil submitApplication -> status HTTP
const STATUS_BY_ERROR = {
  auth: 401,
  invalid: 422,
  terms: 422,
  letter: 422,
  notfound: 404,
  closed: 409,
  duplicate: 409,
  db: 500,
};

/**
 * POST /api/applications
 * Body: { jobId, coverLetter, termsAccepted, attachments? } (bentuk sama dengan submitApplication)
 * Sukses: 201 { ok: true }
 * Gagal : 400 body bukan JSON | 401 belum masuk | 404 lowongan tidak ditemukan | 409 lowongan ditutup atau sudah
 *         pernah melamar | 422 data tidak valid (jobId, surat lamaran kosong, pernyataan belum disetujui) | 500 gagal menyimpan
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

  const result = await submitApplication(body);
  if (result.ok) return NextResponse.json(result, { status: 201 });

  return NextResponse.json(result, { status: STATUS_BY_ERROR[result.error] ?? 500 });
}

/**
 * GET /api/applications
 * Daftar lamaran milik user yang sedang masuk, terbaru di atas.
 * Sukses: 200 { ok: true, applications }
 * Gagal : 401 belum masuk | 500 gagal memuat
 */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const { applications, error } = await fetchMyApplications(user);
  if (error) {
    return NextResponse.json({ ok: false, error: "db" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, applications }, { headers: { "Cache-Control": "no-store" } });
}