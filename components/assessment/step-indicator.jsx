import { TOTAL_STEPS } from "@/lib/assessment-options";
import { cn } from "@/lib/utils";

export function StepIndicator({ current, total = TOTAL_STEPS }) {
  return (
    <div className="mb-6">
      <p className="mb-2.5 text-xs font-semibold text-ink/70">
        Langkah {current} dari {total}
      </p>
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < current ? "bg-brand" : "bg-black/10")} />
        ))}
      </div>
    </div>
  );
}
