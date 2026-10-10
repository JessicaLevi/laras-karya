import { STATUS_CONFIG } from "@/lib/applications-data";
import { cn } from "@/lib/utils";

// Teks ≥ 4,5:1. Status tidak hanya warna: selalu ada teks.
const STYLES = {
  diproses: "bg-blue-50 text-blue-700 ring-blue-200",
  interview: "bg-violet-50 text-violet-700 ring-violet-200",
  diterima: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  ditolak: "bg-red-50 text-red-700 ring-red-200",
};

/** @param {{ status: import("@/lib/applications-data").ApplicationStatus, showIcon?: boolean, className?: string }} props */
export function StatusBadge({ status, showIcon = false, className }) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        STYLES[status],
        className
      )}
    >
      {showIcon && <Icon className="size-3" aria-hidden="true" />}
      {config.label}
    </span>
  );
}
