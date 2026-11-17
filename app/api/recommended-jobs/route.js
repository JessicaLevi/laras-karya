import { NextResponse } from "next/server";

import { fetchRecommendedJobs } from "@/lib/recommended-jobs-db";
import { getCurrentUser } from "@/lib/session";

/**
 * API rekomendasi lowongan: GET /api/recommended-jobs. Khusus user yang sudah masuk.
 * Memakai logika yang sama dengan halaman /recommended-jobs (sesi user, RLS, skor dari job_recommendations),
 * jadi angka kecocokan yang dikirim sama dengan yang tampil di halaman.
 */

/**
 * GET /api/recommended-jobs
 * Daftar rekomendasi diurutkan dari skor tertinggi.
 * Sukses: 200 { ok: true, jobs }
 * Gagal : 401 belum masuk | 500 rekomendasi gagal dimuat
 */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });
  }

  const { jobs, error } = await fetchRecommendedJobs(user);
  if (error) {
    return NextResponse.json({ ok: false, error: "db" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, jobs }, { headers: { "Cache-Control": "no-store" } });
}