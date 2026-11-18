import { parseDegree, parseWorkPeriod } from "@/lib/profile-mapping";

/**
 * Validasi isian untuk route /api/profile/education dan /api/profile/experiences.
 *
 * Bentuk isiannya sama dengan formulir halaman /profile: teks bebas seperti "S1 Ilmu Lingkungan" atau
 * "Jan 2022 — Sekarang", karena lib/profile-mapping.js yang mengubahnya menjadi kolom database. Isian yang
 * formatnya tidak terbaca ditolak di sini; kalau tidak, parser di profile-mapping diam-diam menyimpannya sebagai kosong.
 *
 * Hasil: { values } (langsung bisa dipakai toFormData) atau { error } (pesan untuk respons 422).
 * `current` = data lama saat PUT: field yang tidak dikirim memakai nilai lama, jadi kiriman boleh sebagian.
 * Format hanya dicek untuk field yang dikirim, supaya baris lama yang dibuat lewat halaman /profile dengan isian
 * bebas (mis. tanpa jenjang) tidak membuat perubahan lain pada baris itu ditolak.
 */

const MAX = { degree: 120, school: 150, period: 60, gpa: 30, role: 120, company: 120, description: 1000 };

/** Gabungkan kiriman dengan data lama. Teks dirapikan; angka (mis. gpa: 3.72) diubah jadi teks. */
function mergeFields(body, current, keys) {
  const values = {};
  for (const key of keys) {
    const sent = body[key];
    if (sent === undefined) values[key] = String(current?.[key] ?? "");
    else if (typeof sent === "string") values[key] = sent.trim();
    else if (typeof sent === "number" && Number.isFinite(sent)) values[key] = String(sent);
    else return { error: `Field \`${key}\` harus berupa teks.` };
  }
  return { values };
}

function tooLong(values) {
  const key = Object.keys(values).find((k) => values[k].length > MAX[k]);
  return key ? `Field \`${key}\` maksimal ${MAX[key]} karakter.` : null;
}

/**
 * Pendidikan: { degree, school, period?, gpa? }
 *   degree : jenjang + jurusan, jenjangnya SMA | SMK | D3 | D4 | S1 | S2 | S3 (mis. "S1 Ilmu Lingkungan")
 *   school : nama institusi
 *   period : teks yang memuat tahun, mis. "2016 — 2020"
 *   gpa    : angka IPK 0-4, boleh teks "IPK: 3.72 / 4.00" atau angka 3.72
 */
export function parseEducationInput(body, current) {
  const { values, error } = mergeFields(body, current, ["degree", "school", "period", "gpa"]);
  if (error) return { error };
  const { degree, school, period, gpa } = values;

  if (!degree) return { error: 'Field `degree` wajib diisi (jenjang dan jurusan, mis. "S1 Ilmu Lingkungan").' };
  if (!school) return { error: "Field `school` (institusi) wajib diisi." };
  const lengthError = tooLong(values);
  if (lengthError) return { error: lengthError };
  if (body.degree !== undefined && !parseDegree(degree).degree_level) {
    return { error: 'Field `degree` harus diawali jenjang SMA, SMK, D3, D4, S1, S2, atau S3, mis. "S1 Ilmu Lingkungan".' };
  }

  if (body.period !== undefined && period) {
    const years = [...period.matchAll(/\d{4}/g)].map((m) => Number(m[0]));
    if (years.length === 0) return { error: 'Field `period` harus memuat tahun, mis. "2016 — 2020".' };
    if (years.length > 1 && years[1] < years[0]) return { error: "Tahun selesai pada `period` lebih awal dari tahun mulai." };
  }

  if (body.gpa !== undefined && gpa) {
    const number = Number(gpa.replace(",", ".").match(/\d+(\.\d+)?/)?.[0]);
    if (!Number.isFinite(number) || number > 4) {
      return { error: 'Field `gpa` harus berisi angka IPK antara 0 dan 4, mis. "IPK: 3.72 / 4.00".' };
    }
  }

  return { values };
}

/**
 * Pengalaman kerja: { role, company, period?, description? }
 *   role, company : jabatan dan perusahaan
 *   period        : teks yang memuat tahun mulai, mis. "Jan 2022 — Sekarang" atau "2019 — 2021"
 *   description   : uraian bebas, maksimal 1000 karakter
 */
export function parseExperienceInput(body, current) {
  const { values, error } = mergeFields(body, current, ["role", "company", "period", "description"]);
  if (error) return { error };
  const { role, company, period } = values;

  if (!role) return { error: "Field `role` (jabatan) wajib diisi." };
  if (!company) return { error: "Field `company` (perusahaan) wajib diisi." };
  const lengthError = tooLong(values);
  if (lengthError) return { error: lengthError };

  if (body.period !== undefined && period) {
    const { start_date: start, end_date: end, is_current: ongoing } = parseWorkPeriod(period);
    if (!start) return { error: 'Field `period` harus memuat tahun mulai, mis. "Jan 2022 — Sekarang" atau "2019 — 2021".' };
    if (!end && !ongoing) return { error: 'Field `period` harus memuat tahun selesai, atau tulis "Sekarang" bila masih bekerja di sini.' };
    if (end && end < start) return { error: "Periode pada `period` berakhir lebih awal dari tanggal mulai." };
  }

  return { values };
}
