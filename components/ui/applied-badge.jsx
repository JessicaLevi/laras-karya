import { CheckCircle2 } from "lucide-react";

export function AppliedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
      <CheckCircle2 className="size-3" aria-hidden="true" />
      Sudah Dilamar
    </span>
  );
}