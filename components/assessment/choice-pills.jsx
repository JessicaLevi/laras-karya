import { cn } from "@/lib/utils";

/** Grup radio berbentuk pil, mis. pilihan jeda karier. */
export function ChoicePills({ name, legend, options, value, onChange, children }) {
  return (
    <fieldset>
      {legend ? <legend className="mb-2.5 text-sm font-bold text-ink">{legend}</legend> : null}
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                checked ? "border-brand bg-brand text-white" : "border-black/15 bg-white text-ink hover:border-brand/50",
              )}
            >
              <input type="radio" name={name} value={option.value} checked={checked} onChange={() => onChange(option.value)} className="sr-only" />
              {option.label}
            </label>
          );
        })}
      </div>
      {children}
    </fieldset>
  );
}
