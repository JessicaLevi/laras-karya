import { Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Tombol outline berbentuk pil dengan ikon, dipakai di header kartu profil. */
export function PillButton({ icon: Icon = Plus, children, className, ...props }) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "h-10 gap-1.5 rounded-full border-brand bg-white px-4 text-sm font-semibold text-brand hover:bg-brand-light hover:text-brand",
        className
      )}
      {...props}
    >
      <Icon className="size-4" aria-hidden="true" />
      {children}
    </Button>
  );
}

/**
 * Kartu bagian profil: ikon + judul + tombol aksi di kanan.
 * @param {{ id: string, title: string, icon: React.ComponentType<any>, action?: React.ReactNode, className?: string, children: React.ReactNode }} props
 */
export function SectionCard({ id, title, icon: Icon, action, className, children }) {
  return (
    <section aria-labelledby={id} className={cn("rounded-3xl border border-line bg-white p-6 md:p-8", className)}>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 id={id} className="flex items-center gap-3 text-xl font-semibold text-ink">
          <span className="grid size-10 place-items-center rounded-xl bg-brand-light text-brand">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          {title}
        </h2>
        {action}
      </header>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Pasangan tombol Edit / Hapus untuk satu item. */
export function ItemActions({ label }) {
  return (
    <div className="flex shrink-0 items-center gap-4 text-sm font-semibold">
      <button
        type="button"
        aria-label={`Edit ${label}`}
        className="inline-flex min-h-9 items-center gap-1.5 text-brand hover:underline focus-visible:ring-3 focus-visible:ring-brand/30 focus-visible:outline-none"
      >
        <Pencil className="size-4" aria-hidden="true" />
        Edit
      </button>
      <button
        type="button"
        aria-label={`Hapus ${label}`}
        className="inline-flex min-h-9 items-center gap-1.5 text-red-600 hover:underline focus-visible:ring-3 focus-visible:ring-red-300 focus-visible:outline-none"
      >
        <Trash2 className="size-4" aria-hidden="true" />
        Hapus
      </button>
    </div>
  );
}
