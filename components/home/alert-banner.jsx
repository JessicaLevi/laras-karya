import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Banner rekomendasi dengan garis pink di kiri. */
export function AlertBanner({ skill, targetMatch }) {
  return (
    <aside className="flex items-center gap-4 rounded-lg border border-line border-l-[3px] border-l-ai bg-white p-4 shadow-sm">
      <Image
        src="/images/insight-ai.png"
        alt=""
        width={64}
        height={64}
        className="size-14 shrink-0 mix-blend-multiply md:size-16"
      />
      <div className="text-xs leading-relaxed text-ink">
        <p>
          Berdasarkan profil Anda, kami merekomendasikan menyelesaikan pelatihan{" "}
          <strong className="font-bold text-ai">{skill}</strong> untuk
          meningkatkan kecocokan Anda di lowongan teratas hingga{" "}
          <strong className="font-bold text-ai">{targetMatch}</strong>.
        </p>
        <Link
          href="/learning-path"
          className="mt-1 inline-flex min-h-11 items-center gap-1 font-bold text-brand hover:underline md:min-h-0"
        >
          Lihat Jalur Belajar{" "}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
