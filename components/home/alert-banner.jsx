import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

/** Banner rekomendasi dengan garis pink di kiri. */
export function AlertBanner({ skill, targetMatch }) {
  return (
    <aside className="flex gap-3 rounded-lg border border-line border-l-[3px] border-l-ai bg-white p-4 shadow-sm">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-pink-50 text-ai">
        <Star className="size-3.5 fill-current" aria-hidden="true" />
      </span>
      <div className="text-xs leading-relaxed text-ink">
        <p>
          Berdasarkan profil Anda, kami merekomendasikan menyelesaikan pelatihan{" "}
          <strong className="font-bold text-ai">{skill}</strong> untuk meningkatkan kecocokan Anda di lowongan teratas
          hingga <strong className="font-bold text-ai">{targetMatch}</strong>.
        </p>
        <Link href="/learning-path" className="mt-1 inline-flex min-h-11 items-center gap-1 font-bold text-brand hover:underline md:min-h-0">
          Lihat Jalur Belajar <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
