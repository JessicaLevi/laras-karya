import Link from "next/link";

import { cn } from "@/lib/utils";

const base = "flex h-14 flex-1 items-center justify-center rounded-full text-[15px] font-bold transition-colors";

/** Tombol Kembali (opsional) + tombol utama. Tombol utama nonaktif sampai langkah valid. */
export function StepNav({ backHref, nextLabel = "Lanjutkan", onNext, disabled }) {
  return (
    <div className="flex gap-3.5">
      {backHref ? (
        <Link href={backHref} className={cn(base, "border-[1.5px] border-brand bg-white text-brand hover:bg-brand-light")}>
          Kembali
        </Link>
      ) : null}
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className={cn(base, "bg-brand text-white hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40")}
      >
        {nextLabel}
      </button>
    </div>
  );
}
