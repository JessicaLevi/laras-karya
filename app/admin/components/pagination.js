import Link from "next/link";

/** Pagination berbasis ?page=; `params` = filter aktif (q, status, ...) yang ikut dibawa. */
export default function Pagination({ basePath, params = {}, page, total, pageSize }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;

  const href = (p) => {
    const sp = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) if (value) sp.set(key, value);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
  const linkClass = "rounded-lg border border-border bg-white px-3 py-1.5 text-sm hover:bg-muted";
  const offClass = "rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground";

  return (
    <nav aria-label="Halaman" className="mt-4 flex items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        Halaman {page} dari {pages} · {total} data
      </p>
      <div className="flex gap-2">
        {page > 1 ? <Link href={href(page - 1)} className={linkClass}>Sebelumnya</Link> : <span className={offClass}>Sebelumnya</span>}
        {page < pages ? <Link href={href(page + 1)} className={linkClass}>Berikutnya</Link> : <span className={offClass}>Berikutnya</span>}
      </div>
    </nav>
  );
}
