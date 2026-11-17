"use client";

import Link from "next/link";
import { useActionState } from "react";

import { EMPLOYMENT_TYPES, JOB_STATUSES as STATUSES, WORK_MODES } from "@/lib/admin-options";
import { saveJob } from "./actions";

const inputClass = "h-9 w-full rounded-lg border border-border bg-white px-3 text-sm";

function Field({ label, error, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
      {error ? <span role="alert" className="mt-1 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}

/** job = baris tabel jobs (untuk ubah) atau undefined (untuk tambah); sectors = [{ code, label }]. */
export default function JobForm({ job, sectors }) {
  const [state, action, pending] = useActionState(saveJob, { ok: null });
  const errors = state?.errors ?? {};
  const v = job ?? { status: "draft", employment_type: "full_time", work_arrangement: "onsite", is_green_job: true };

  return (
    <form action={action} className="space-y-4 rounded-xl border border-border bg-white p-5">
      {job ? <input type="hidden" name="id" value={job.id} /> : null}

      {state?.message ? (
        <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.message}</p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Judul lowongan" error={errors.title}>
          <input name="title" defaultValue={v.title ?? ""} className={inputClass} maxLength={150} required />
        </Field>
        <Field label="Nama perusahaan" error={errors.company_name}>
          <input name="company_name" defaultValue={v.company_name ?? ""} className={inputClass} maxLength={120} required />
        </Field>
        <Field label="Sektor" error={errors.sector}>
          <select name="sector" defaultValue={v.sector ?? ""} className={inputClass} required>
            <option value="" disabled>Pilih sektor</option>
            {sectors.map((s) => (
              <option key={s.code} value={s.code}>{s.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Status" error={errors.status}>
          <select name="status" defaultValue={v.status} className={inputClass}>
            {STATUSES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field label="Jenis pekerjaan" error={errors.employment_type}>
          <select name="employment_type" defaultValue={v.employment_type} className={inputClass}>
            {EMPLOYMENT_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field label="Pola kerja" error={errors.work_arrangement}>
          <select name="work_arrangement" defaultValue={v.work_arrangement} className={inputClass}>
            {WORK_MODES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field label="Kota">
          <input name="city" defaultValue={v.city ?? ""} className={inputClass} maxLength={80} />
        </Field>
        <Field label="Provinsi">
          <input name="province" defaultValue={v.province ?? ""} className={inputClass} maxLength={80} />
        </Field>
        <Field label="Gaji minimum (Rp)" error={errors.salary_min}>
          <input name="salary_min" type="number" min="0" defaultValue={v.salary_min ?? ""} className={inputClass} />
        </Field>
        <Field label="Gaji maksimum (Rp)" error={errors.salary_max}>
          <input name="salary_max" type="number" min="0" defaultValue={v.salary_max ?? ""} className={inputClass} />
        </Field>
        <Field label="Batas lamaran" error={errors.deadline}>
          <input name="deadline" type="date" defaultValue={v.deadline ? String(v.deadline).slice(0, 10) : ""} className={inputClass} />
        </Field>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input type="checkbox" name="is_green_job" defaultChecked={v.is_green_job !== false} className="size-4" />
          Lowongan sektor hijau
        </label>
      </div>

      <Field label="Deskripsi" error={errors.description}>
        <textarea name="description" defaultValue={v.description ?? ""} rows={8} maxLength={5000} required className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" />
      </Field>

      <div className="flex gap-2">
        <button type="submit" disabled={pending} className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {pending ? "Menyimpan…" : job ? "Simpan perubahan" : "Tambah lowongan"}
        </button>
        <Link href="/admin/jobs" className="inline-flex h-9 items-center rounded-lg border border-border px-4 text-sm hover:bg-muted">
          Batal
        </Link>
      </div>
    </form>
  );
}
