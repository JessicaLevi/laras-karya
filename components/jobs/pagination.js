import { ChevronLeft, ChevronRight } from "lucide-react";

const base =
  "flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Halaman rekomendasi"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Halaman sebelumnya"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`${base} border-slate-200 bg-white text-ink hover:border-brand`}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-label={`Halaman ${p}`}
          aria-current={p === page ? "page" : undefined}
          onClick={() => onChange(p)}
          className={`${base} ${
            p === page
              ? "border-brand bg-brand text-white"
              : "border-slate-200 bg-white text-ink hover:border-brand"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        aria-label="Halaman berikutnya"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className={`${base} border-slate-200 bg-white text-ink hover:border-brand`}
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </nav>
  );
}
