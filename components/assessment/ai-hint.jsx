import { Sparkles } from "lucide-react";

/** Chip pink penanda bagian yang diolah AI. */
export function AiHint({ children }) {
  return (
    <p className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3.5 py-2 text-[13px] font-bold text-ai">
      <Sparkles className="size-3.5" aria-hidden="true" />
      {children}
    </p>
  );
}
