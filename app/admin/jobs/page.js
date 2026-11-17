import Link from "next/link";

import { PAGE_SIZE, cleanQuery, formatDate, pageRange, requireAdminPage } from "@/lib/admin";
import { ActionSelect, DeleteButton } from "../components/action-controls";
import Pagination from "../components/pagination";
import { JOB_STATUSES } from "@/lib/admin-options";
import { deleteJob, setJobStatus } from "./actions";

export const metadata = { title: "Lowongan | Admin Laras Karya" };

export default async function AdminJobsPage({ searchParams }) {
  const { supabase } = await requireAdminPage();
  const sp = await searchParams;

  const q = cleanQuery(sp?.q);
  const status = JOB_STATUSES.some((s) => s.value === sp?.status) ? sp.status : "";
  const { page, from, to } = pageRange(sp?.page);

  // Pencarian, filter, dan pagination dilakukan di server (query Supabase), bukan di browser.
  let query = supabase
    .from("jobs")
    .select("id,title,company_name,city,province,status,deadline,updated_at", { count: "exact" })
    .order("updated_at", { ascending: false })
    .range(from, to);
  if (q) query = query.or(`title.ilike.%${q}%,company_name.ilike.%${q}%`);
  if (status) query = query.eq("status", status);

  const { data, count, error } = await query;
  const jobs = data ?? [];

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold">Kelola Lowongan</h1>
        <Link href="/admin/jobs/new" className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          + Tambah lowongan
        </Link>
      </div>

      <form className="mb-4 flex flex-wrap gap-2">
        <input name="q" defaultValue={q} placeholder="Cari judul atau perusahaan" aria-label="Cari lowongan" className="h-9 w-64 rounded-lg border border-border bg-white px-3 text-sm" />
        <select name="status" defaultValue={status} aria-label="Filter status" className="h-9 rounded-lg border border-border bg-white px-2 text-sm">
          <option value="">Semua status</option>
          {JOB_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <button type="submit" className="h-9 rounded-lg border border-border bg-white px-3 text-sm hover:bg-muted">Terapkan</button>
      </form>

      {error ? <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">Lowongan belum bisa dimuat.</p> : null}

      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Lowongan</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3">Batas lamaran</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Belum ada lowongan.</td></tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.company_name}</p>
                  </td>
                  <td className="px-4 py-3">{[job.city, job.province].filter(Boolean).join(", ") || "-"}</td>
                  <td className="px-4 py-3">{formatDate(job.deadline)}</td>
                  <td className="px-4 py-3">
                    <ActionSelect id={job.id} value={job.status} options={JOB_STATUSES} action={setJobStatus} label={`Status ${job.title}`} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <Link href={`/admin/jobs/${job.id}`} className="inline-flex h-8 items-center rounded-lg border border-border px-2.5 text-sm hover:bg-muted">Ubah</Link>
                      <DeleteButton id={job.id} action={deleteJob} confirmText={`Hapus lowongan "${job.title}"?`} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination basePath="/admin/jobs" params={{ q, status }} page={page} total={count ?? 0} pageSize={PAGE_SIZE} />
    </section>
  );
}
