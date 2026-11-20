import { NextResponse } from "next/server";

import { completeCourse, getLearningPath, startCourse } from "@/app/learning-path/actions";
import { isUuid } from "@/lib/is-uuid";
import { getCurrentUser } from "@/lib/session";

/**
 * API Jalur Belajar: GET /api/learning-path dan POST /api/learning-path.
 * Memakai logika yang sama dengan halaman /learning-path (app/learning-path/actions.js): sesi user dan RLS,
 * jadi user hanya membaca dan menulis progres belajarnya sendiri (user_course_progress).
 */

const AUTH_ERROR = "Sesi Anda berakhir. Silakan masuk lagi.";

// Aksi progres -> fungsi Server Action
const PROGRESS_ACTIONS = { start: startCourse, complete: completeCourse };

/**
 * GET /api/learning-path
 * Query: ?job=<UUID lowongan> (opsional). Dengan ?job=, hanya pelatihan untuk skill gap lowongan itu yang dimuat;
 * tanpa ?job= (atau lowongan tidak ditemukan), semua pelatihan.
 * Sukses: 200 { ok: true, learningPath: { mode, job, jobNotFound, gap, target, courses, progress } }
 * Gagal : 401 belum masuk | 500 gagal memuat
 */
export async function GET(request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: AUTH_ERROR }, { status: 401 });
  }

  const job = new URL(request.url).searchParams.get("job");

  try {
    const learningPath = await getLearningPath(job);
    return NextResponse.json({ ok: true, learningPath }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/learning-path
 * Body: { courseId, action } (action = "start" untuk mulai mengikuti, "complete" untuk menandai selesai)
 * Course yang sudah selesai tidak diturunkan kembali ke "enrolled" oleh aksi "start".
 * Sukses: 200 { ok: true, progress: { id, status: "enrolled" | "completed" } }
 * Gagal : 400 body bukan JSON | 401 belum masuk | 422 courseId atau action tidak valid | 500 gagal menyimpan
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Data yang dikirim bukan JSON yang valid." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Data yang dikirim bukan JSON yang valid." }, { status: 400 });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: AUTH_ERROR }, { status: 401 });
  }

  const { courseId, action } = body;
  const run = Object.hasOwn(PROGRESS_ACTIONS, action) ? PROGRESS_ACTIONS[action] : null;
  if (!isUuid(courseId) || !run) {
    return NextResponse.json(
      { ok: false, error: 'courseId harus UUID dan action harus "start" atau "complete".' },
      { status: 422 },
    );
  }

  try {
    const progress = await run(courseId);
    return NextResponse.json({ ok: true, progress });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}