import { PAGE_SIZE, cleanQuery, pageRange, requireAdminPage } from "@/lib/admin";
import { USER_ROLES } from "@/lib/admin-options";
import { ActionSelect } from "../components/action-controls";
import Pagination from "../components/pagination";
import { setUserRole } from "./actions";

export const metadata = { title: "Pengguna | Admin Laras Karya" };

export default async function AdminUsersPage({ searchParams }) {
  const { supabase, user: me } = await requireAdminPage();
  const sp = await searchParams;

  const q = cleanQuery(sp?.q);
  const role = USER_ROLES.some((r) => r.value === sp?.role) ? sp.role : "";
  const { page, from, to } = pageRange(sp?.page);

  let query = supabase.from("profiles").select("*", { count: "exact" }).order("full_name", { ascending: true }).range(from, to);
  if (q) query = query.ilike("full_name", `%${q}%`);
  if (role) query = query.eq("role", role);

  const { data, count, error } = await query;
  const users = data ?? [];

  return (
    <section>
      <h1 className="mb-4 text-xl font-bold">Kelola Pengguna</h1>

      <form className="mb-4 flex flex-wrap gap-2">
        <input name="q" defaultValue={q} placeholder="Cari nama" aria-label="Cari pengguna" className="h-9 w-64 rounded-lg border border-border bg-white px-3 text-sm" />
        <select name="role" defaultValue={role} aria-label="Filter role" className="h-9 rounded-lg border border-border bg-white px-2 text-sm">
          <option value="">Semua role</option>
          {USER_ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
        <button type="submit" className="h-9 rounded-lg border border-border bg-white px-3 text-sm hover:bg-muted">Terapkan</button>
      </form>

      {error ? <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">Pengguna belum bisa dimuat.</p> : null}

      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Kontak</th>
              <th className="px-4 py-3">Domisili</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Tidak ada pengguna.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">
                    {u.full_name || "Tanpa nama"}
                    {u.id === me.id ? <span className="ml-2 text-xs font-normal text-muted-foreground">(Anda)</span> : null}
                  </td>
                  <td className="px-4 py-3">{u.phone || "-"}</td>
                  <td className="px-4 py-3">{[u.city, u.province].filter(Boolean).join(", ") || "-"}</td>
                  <td className="px-4 py-3">
                    <ActionSelect
                      id={u.id}
                      value={u.role ?? "seeker"}
                      options={USER_ROLES}
                      action={setUserRole}
                      label={`Role ${u.full_name || "pengguna"}`}
                      disabled={u.id === me.id}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination basePath="/admin/users" params={{ q, role }} page={page} total={count ?? 0} pageSize={PAGE_SIZE} />
    </section>
  );
}
