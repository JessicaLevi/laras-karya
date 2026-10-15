import { cn } from "@/lib/utils";

/**
 * Kartu pilihan berbentuk radio. Memakai <input type="radio"> asli (disembunyikan secara visual)
 * agar bisa dipilih dengan keyboard dan dibaca screen reader.
 */
export function OptionCard({ name, value, checked, onChange, icon: Icon, title, description }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-2xl border bg-white px-4 py-4 transition-colors sm:px-5",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
        checked ? "border-2 border-brand" : "border-black/10 hover:border-brand/40",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      {Icon ? (
        <span
          className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", checked ? "bg-brand-light text-brand" : "bg-black/[.04] text-ink/60")}
          aria-hidden="true"
        >
          <Icon className="size-5" />
        </span>
      ) : null}
      <span className="flex-1">
        <span className="block text-[15px] font-bold text-ink">{title}</span>
        {description ? <span className="mt-0.5 block text-[13px] leading-snug text-ink/70">{description}</span> : null}
      </span>
      <span
        className={cn("flex size-[22px] shrink-0 items-center justify-center rounded-full border-2", checked ? "border-brand" : "border-black/30")}
        aria-hidden="true"
      >
        {checked ? <span className="size-2.5 rounded-full bg-brand" /> : null}
      </span>
    </label>
  );
}
