import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/** Kontrol form dengan gaya yang sama untuk semua langkah asesmen. */

const control =
  "w-full rounded-xl border border-black/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/50 focus:border-brand focus:bg-white aria-[invalid=true]:border-red-500";

export function SubLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-semibold text-ink/70">
      {children}
    </label>
  );
}

export function TextInput({ className, ...props }) {
  return <input type="text" className={cn(control, className)} {...props} />;
}

export function TextArea({ className, ...props }) {
  return <textarea className={cn(control, "min-h-36 resize-y leading-relaxed", className)} {...props} />;
}

export function SelectInput({ options, placeholder, className, ...props }) {
  return (
    <div className="relative">
      <select className={cn(control, "appearance-none pr-10", !props.value && "text-ink/50", className)} {...props}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;
          return (
            <option key={value} value={value} className="text-ink">
              {label}
            </option>
          );
        })}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/60" aria-hidden="true" />
    </div>
  );
}

/** Saklar ya/tidak, memakai checkbox asli dengan role="switch". */
export function Toggle({ id, label, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-black/10 px-4 py-3 text-sm text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand"
    >
      <span>{label}</span>
      <input id={id} type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="relative h-6 w-11 shrink-0 rounded-full bg-black/20 transition-colors after:absolute after:left-[3px] after:top-[3px] after:size-[18px] after:rounded-full after:bg-white after:transition-transform peer-checked:bg-brand peer-checked:after:translate-x-5"
      />
    </label>
  );
}
