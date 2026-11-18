"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { NOT_ADMIN, getAdminContext } from "@/lib/admin";
import { EMPLOYMENT_TYPES, JOB_STATUSES, WORK_MODES } from "@/lib/admin-options";
import { isUuid } from "@/lib/is-uuid";

const has = (list, value) => list.some((item) => item.value === value);
const text = (formData, key, max) => String(formData.get(key) ?? "").trim().slice(0, max);
const money = (raw) => {
  if (raw === "") return { value: null };
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? { value: Math.round(n) } : { error: true };
};

/** Validasi di server (jangan percaya browser). Hasil: { values } atau { errors: { field: pesan } }. */
function parseJob(formData) {
  const errors = {};
  const title = text(formData, "title", 150);
  const company = text(formData, "company_name", 120);
  const sector = text(formData, "sector", 60);
  const description = text(formData, "description", 5000);
  const employment_type = text(formData, "employment_type", 20);
  const work_arrangement = text(formData, "work_arrangement", 20);
  const status = text(formData, "status", 20);
  const deadline = text(formData, "deadline", 10);
  const min = money(text(formData, "salary_min", 12));
  const max = money(text(formData, "salary_max", 12));

  if (title.length < 3) errors.title = "Judul minimal 3 karakter.";
  if (company.length < 2) errors.company_name = "Nama perusahaan minimal 2 karakter.";
  if (!/^[A-Za-z0-9_-]+$/.test(sector)) errors.sector = "Pilih sektor.";
  if (description.length < 20) errors.description = "Deskripsi minimal 20 karakter.";
  if (!has(EMPLOYMENT_TYPES, employment_type)) errors.employment_type = "Pilih jenis pekerjaan.";
  if (!has(WORK_MODES, work_arrangement)) errors.work_arrangement = "Pilih pola kerja.";
  if (!has(JOB_STATUSES, status)) errors.status = "Pilih status.";
  if (deadline && (!/^\d{4}-\d{2}-\d{2}$/.test(deadline) || Number.isNaN(Date.parse(deadline)))) {
    errors.deadline = "Tanggal tidak valid.";
  }
  if (min.error) errors.salary_min = "Isi angka 0 atau lebih.";
  if (max.error) errors.salary_max = "Isi angka 0 atau lebih.";
  if (!min.error && !max.error && min.value != null && max.value != null && min.value > max.value) {
    errors.salary_max = "Gaji maksimum harus ≥ gaji minimum.";
  }
  if (Object.keys(errors).length) return { errors };

  return {
    values: {
      title,
      company_name: company,
      sector,
      description,
      employment_type,
      work_arrangement,
      status,
      deadline: deadline || null,
      city: text(formData, "city", 80) || null,
      province: text(formData, "province", 80) || null,
      salary_min: min.value,
      salary_max: max.value,
      is_green_job: formData.get("is_green_job") === "on",
    },
  };
}

function afterWrite() {
  revalidatePath("/admin/jobs");
  revalidatePath("/jobs");
  revalidatePath("/recommended-jobs");
}

/**
 * Tambah atau ubah lowongan (dipakai useActionState di job-form.js).
 * id kosong = tambah. Sukses -> redirect ke daftar. Gagal -> { ok: false, message?, errors? }.
 */
export async function saveJob(_prev, formData) {
  const ctx = await getAdminContext();
  if (!ctx) return NOT_ADMIN;

  const id = String(formData.get("id") ?? "");
  if (id && !isUuid(id)) return { ok: false, message: "ID lowongan tidak valid." };

  const parsed = parseJob(formData);
  if (parsed.errors) return { ok: false, errors: parsed.errors, message: "Periksa kembali isian yang bertanda galat." };
  const { supabase } = ctx;
  const values = parsed.values;

  if (!id) {
    const row = { ...values, published_at: values.status === "published" ? new Date().toISOString() : null };
    const { error } = await supabase.from("jobs").insert(row);
    if (error) {
      console.error("[admin saveJob insert]", error.message);
      return { ok: false, message: "Gagal menyimpan lowongan. Periksa data lalu coba lagi." };
    }
  } else {
    const { data: current, error: readError } = await supabase.from("jobs").select("published_at").eq("id", id).maybeSingle();
    if (readError || !current) return { ok: false, message: "Lowongan tidak ditemukan." };
    const row = {
      ...values,
      published_at: values.status === "published" ? (current.published_at ?? new Date().toISOString()) : current.published_at,
    };
    const { error } = await supabase.from("jobs").update(row).eq("id", id);
    if (error) {
      console.error("[admin saveJob update]", error.message);
      return { ok: false, message: "Gagal memperbarui lowongan. Coba lagi." };
    }
  }

  afterWrite();
  redirect("/admin/jobs");
}

/** Ubah status cepat dari daftar: draft | published | closed. */
export async function setJobStatus(id, status) {
  const ctx = await getAdminContext();
  if (!ctx) return NOT_ADMIN;
  if (!isUuid(id) || !has(JOB_STATUSES, status)) return { ok: false, message: "Data tidak valid." };

  const { supabase } = ctx;
  const { data: current } = await supabase.from("jobs").select("published_at").eq("id", id).maybeSingle();
  const patch = { status };
  if (status === "published" && !current?.published_at) patch.published_at = new Date().toISOString();

  const { error } = await supabase.from("jobs").update(patch).eq("id", id);
  if (error) {
    console.error("[admin setJobStatus]", error.message);
    return { ok: false, message: "Gagal mengubah status." };
  }
  afterWrite();
  return { ok: true };
}

export async function deleteJob(id) {
  const ctx = await getAdminContext();
  if (!ctx) return NOT_ADMIN;
  if (!isUuid(id)) return { ok: false, message: "Data tidak valid." };

  const { error } = await ctx.supabase.from("jobs").delete().eq("id", id);
  if (error) {
    if (error.code === "23503") {
      return { ok: false, message: "Lowongan sudah punya pelamar atau data terkait. Ubah statusnya menjadi Ditutup." };
    }
    console.error("[admin deleteJob]", error.message);
    return { ok: false, message: "Gagal menghapus lowongan." };
  }
  afterWrite();
  return { ok: true };
}
