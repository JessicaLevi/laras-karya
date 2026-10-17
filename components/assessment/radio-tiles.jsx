import { cn } from "@/lib/utils";

/**
 * Pilihan radio berbentuk ubin sejajar (mis. pola kerja WFO / Remote / Hybrid).
 * `options`: [{ value, label, icon }]
 */
export function RadioTiles({ name, options, value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {options.map((option) => {
        const checked = value === option.value;
        const Icon = option.icon;
        return (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition-colors sm:flex-row sm:gap-2 sm:px-3",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
              checked ? "border-2 border-brand bg-brand-light text-brand" : "border-black/10 bg-white text-ink hover:border-brand/40",
            )}
          >
            <input type="radio" name={name} value={option.value} checked={checked} onChange={() => onChange(option.value)} className="sr-only" />
            {Icon ? <Icon className="size-[18px] shrink-0" aria-hidden="true" /> : null}
            <span className="text-sm font-bold">{option.label}</span>
            <span
              className={cn("hidden size-[18px] shrink-0 items-center justify-center rounded-full border-2 sm:flex", checked ? "border-brand" : "border-black/30")}
              aria-hidden="true"
            >
              {checked ? <span className="size-2 rounded-full bg-brand" /> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
