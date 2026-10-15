import { cn } from "@/lib/utils";

const TONES = {
  brand: "bg-brand-light text-brand",
  accent: "bg-accent-light text-accent",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-700",
  blue: "bg-blue-100 text-blue-700",
  neutral: "bg-muted text-ink/70",
};

/**
 * Label kecil berbentuk pil.
 * @param {{ tone?: keyof typeof TONES, outline?: boolean, className?: string, children: React.ReactNode }} props
 */
export function Badge({ tone = "brand", outline = false, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold",
        outline ? "border border-current bg-transparent" : TONES[tone],
        outline && tone === "accent" && "text-accent",
        outline && tone === "brand" && "text-brand",
        className
      )}
    >
      {children}
    </span>
  );
}
