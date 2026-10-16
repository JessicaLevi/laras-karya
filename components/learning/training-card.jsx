import { BookOpen, Clock, Sparkle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LEVEL_TONE = { Beginner: "brand", Intermediate: "amber", Advanced: "red" };

/** Kartu satu pelatihan. */
export function TrainingCard({ training }) {
  const { provider, title, level, format, duration, skillTag, popular, cta, primary } = training;

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-white p-6">
      <header className="flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-2.5 text-sm text-ink/80">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand-light text-brand">
            <BookOpen className="size-4" aria-hidden="true" />
          </span>
          <span className="truncate">{provider}</span>
        </p>
        {popular && (
          <Badge tone="accent" className="shrink-0">
            <Sparkle className="size-3 fill-current" aria-hidden="true" />
            Paling Populer
          </Badge>
        )}
      </header>

      <h3 className="mt-5 min-h-12 text-lg font-bold leading-snug text-ink">{title}</h3>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge tone={LEVEL_TONE[level]}>{level}</Badge>
        <Badge tone="neutral" className="font-medium">
          {format}
        </Badge>
      </div>

      <div className="mt-5 flex min-h-8 items-center justify-between gap-3 border-t border-line pt-4 text-sm text-ink/80">
        <span className="inline-flex items-center gap-2">
          <Clock className="size-4" aria-hidden="true" />
          {duration}
        </span>
        {skillTag && (
          <Badge tone="accent" outline className="rounded-md px-2 py-0.5 font-medium">
            {skillTag}
          </Badge>
        )}
      </div>

      <Button
        variant={primary ? "default" : "outline"}
        className={cn(
          "mt-5 h-12 w-full rounded-full text-sm font-semibold",
          !primary && "border-2 border-brand bg-white text-brand hover:bg-brand-light hover:text-brand"
        )}
      >
        {cta}
      </Button>
    </article>
  );
}
