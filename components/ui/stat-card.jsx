import { cn } from "@/lib/utils";

/* value = warna angka, icon = warna ikon. Dipakai di F05 (Lamaran) dan Beranda. */
const VALUE = {
  green: "text-brand",
  blue: "text-blue-600",
  purple: "text-violet-600",
  red: "text-red-600",
  emerald: "text-emerald-600",
  orange: "text-orange-600",
  pink: "text-ai",
  lime: "text-brand",
};

const ICON = {
  green: "bg-brand-light text-brand",
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-violet-50 text-violet-600",
  red: "bg-red-50 text-red-600",
  emerald: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-500",
  pink: "bg-pink-50 text-ai",
  lime: "bg-emerald-50 text-emerald-500",
};

/**
 * @param {{ label: string, value: number|string, icon: import("lucide-react").LucideIcon,
 *           tone?: keyof typeof VALUE, iconTone?: keyof typeof ICON, iconClassName?: string, className?: string }} props
 */
export function StatCard({ label, value, icon: Icon, tone = "green", iconTone, iconClassName, className }) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-sm", className)}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[13px] font-medium text-ink/75">{label}</span>
        <span className={cn("grid size-6 shrink-0 place-items-center rounded-md", ICON[iconTone ?? tone])}>
          <Icon className={cn("size-3.5", iconClassName)} aria-hidden="true" />
        </span>
      </div>
      <span className={cn("text-[32px] font-bold leading-none", VALUE[tone] ?? VALUE.green)}>{value}</span>
    </div>
  );
}
