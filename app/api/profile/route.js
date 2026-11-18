import { NextResponse } from "next/server";

import { loadMyProfile, saveMyProfile } from "@/app/profile/data-actions";
import { getCurrentUser } from "@/lib/session";

/**
 * API profil: GET /api/profile dan PUT /api/profile.
 * Memakai logika yang sama dengan halaman /profile (app/profile/data-actions.js): sesi user dan RLS,
 * jadi user hanya membaca dan menulis profilnya sendiri (profiles, educations, work_experiences, user_skills).
 */

/**
 * GET /api/profile
 * Profil user yang sedang masuk, dalam bentuk yang dipakai halaman /profile.
 * Sukses: 200 { ok: true, profile }
 * Gagal : 401 belum masuk | 500 gagal memuat
 */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Sesi Anda berakhir. Silakan masuk lagi." }, { status: 401 });
  }

  const profile = await loadMyProfile();
  if (!profile) {
    return NextResponse.json(
      { ok: false, error: "Profil belum bisa dimuat. Coba lagi beberapa saat lagi." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, profile }, { headers: { "Cache-Control": "no-store" } });
}

/**
 * PUT /api/profile
 * Body: seluruh isi profil (bentuk sama dengan hasil GET). Daftar pendidikan, pengalaman, dan keahlian
 * yang tidak dikirim akan dihapus, karena daftar yang dikirim dianggap daftar lengkap milik user.
 * Sukses: 200 { ok: true, profile } (profil terbaru dari database)
 * Gagal : 400 body bukan JSON | 401 belum masuk | 422 nama lengkap kosong | 500 gagal menyimpan
 */
export async function PUT(request) {
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
    return NextResponse.json({ ok: false, error: "Sesi Anda berakhir. Silakan masuk lagi." }, { status: 401 });
  }
  if (typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ ok: false, error: "Nama lengkap wajib diisi." }, { status: 422 });
  }

  const result = await saveMyProfile(body);
  if (result.ok) return NextResponse.json(result);

  return NextResponse.json(result, { status: 500 });
}