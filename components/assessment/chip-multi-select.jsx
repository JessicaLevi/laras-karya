import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

/** Pilihan ganda berbentuk chip (checkbox asli), mis. bidang industri. */
export function ChipMultiSelect({ name, options, values, onChange }) {
  const toggle = (value) =>
    onChange(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const checked = values.includes(option.value);
        return (
          <label
            key={option.value}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] transition-colors",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
              checked ? "border-brand bg-brand-light font-bold text-brand" : "border-black/15 bg-white text-ink hover:border-brand/50",
            )}
          >
            <input type="checkbox" name={name} value={option.value} checked={checked} onChange={() => toggle(option.value)} className="sr-only" />
            {checked ? <Check className="size-3.5" aria-hidden="true" /> : null}
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
