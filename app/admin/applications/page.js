import { PAGE_SIZE, formatDate, pageRange, requireAdminPage } from "@/lib/admin";
import { APPLICATION_STATUSES } from "@/lib/admin-options";
import { ActionSelect } from "../components/action-controls";
import Pagination from "../components/pagination";
import { setApplicationStatus } from "./actions";

export const metadata = { title: "Lamaran | Admin Laras Karya" };

export default async function AdminApplicationsPage({ searchParams }) {
  const { supabase } = await requireAdminPage();
  const sp = await searchParams;

  const status = APPLICATION_STATUSES.some((s) => s.value === sp?.status) ? sp.status : "";
  const { page, from, to } = pageRange(sp?.page);

  let query = supabase
    .from("applications")
    .select("id,user_id,job_id,current_status,applied_at,cover_letter,resume_url,jobs(title,company_name)", { count: "exact" })
    .order("applied_at", { ascending: false })
    .range(from, to);
  if (status) query = query.eq("current_status", status);

  const { data, count, error } = await query;
  const rows = data ?? [];

  // Nama pelamar dari profiles; tautan CV dibuat sementara (bucket "Documents" bersifat privat).
  const userIds = [...new Set(rows.map((r) => r.user_id))];
  const paths = rows.map((r) => r.resume_url).filter((p) => typeof p === "string" && p);
  const [profilesRes, signedRes] = await Promise.all([
    userIds.length ? supabase.from("profiles").select("id,full_name,phone").in("id", userIds) : { data: [] },
    paths.length ? supabase.storage.from("Documents").createSignedUrls(paths, 600) : { data: [] },
  ]);
  const profileById = Object.fromEntries((profilesRes.data ?? []).map((p) => [p.id, p]));
  const cvUrlByPath = Object.fromEntries((signedRes.data ?? []).filter((s) => s.signedUrl).map((s) => [s.path, s.signedUrl]));

  return (
    <section>
      <h1 className="mb-4 text-xl font-bold">Kelola Lamaran</h1>

      <form className="mb-4 flex gap-2">
        <select name="status" defaultValue={status} aria-label="Filter status" className="h-9 rounded-lg border border-border bg-white px-2 text-sm">
          <option value="">Semua status</option>
          {APPLICATION_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <button type="submit" className="h-9 rounded-lg border border-border bg-white px-3 text-sm hover:bg-muted">Terapkan</button>
      </form>

      {error ? <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">Lamaran belum bisa dimuat.</p> : null}

      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Pelamar</th>
              <th className="px-4 py-3">Lowongan</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Berkas</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Belum ada lamaran.</td></tr>
            ) : (
              rows.map((row) => {
                const person = profileById[row.user_id];
                const cvUrl = cvUrlByPath[row.resume_url];
                return (
                  <tr key={row.id} className="border-b border-border align-top last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium">{person?.full_name || "Tanpa nama"}</p>
                      {person?.phone ? <p className="text-xs text-muted-foreground">{person.phone}</p> : null}
                    </td>
                    <td className="px-4 py-3">
                      <p>{row.jobs?.title ?? "Lowongan dihapus"}</p>
                      <p className="text-xs text-muted-foreground">{row.jobs?.company_name}</p>
                    </td>
                    <td className="px-4 py-3">{formatDate(row.applied_at)}</td>
                    <td className="px-4 py-3">
                      {cvUrl ? (
                        <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">Lihat CV</a>
                      ) : (
                        <span className="text-muted-foreground">CV profil</span>
                      )}
                      {row.cover_letter ? (
                        <details className="mt-1">
                          <summary className="cursor-pointer text-xs text-muted-foreground">Surat lamaran</summary>
                          <p className="mt-1 max-w-xs whitespace-pre-wrap text-xs">{row.cover_letter}</p>
                        </details>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <ActionSelect id={row.id} value={row.current_status} options={APPLICATION_STATUSES} action={setApplicationStatus} label="Ubah status lamaran" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination basePath="/admin/applications" params={{ status }} page={page} total={count ?? 0} pageSize={PAGE_SIZE} />
    </section>
  );
}
