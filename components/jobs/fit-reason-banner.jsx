import { Leaf, MapPin, Sparkles, Target, Wrench } from "lucide-react";

/** @param {number} p */
function matchLevel(p) {
  if (p >= 90) return "sangat tinggi";
  if (p >= 80) return "tinggi";
  return "cukup tinggi";
}

/**
 * Banner "Mengapa lamaran ini cocok untuk Anda". Poin dibuat dari data lowongan.
 * @param {{ job: import("@/lib/job-detail-data").JobDetail, missingCount: number }} props
 */
export function FitReasonBanner({ job, missingCount }) {
  const reasons = [
    { id: "match", icon: Target, color: "text-red-500", text: `Kecocokan profil ${job.matchPercent}%, ${matchLevel(job.matchPercent)} untuk posisi ini` },
    {
      id: "skills",
      icon: Wrench,
      color: "text-ink/70",
      text:
        missingCount > 0
          ? `Keterampilan inti Anda sudah sesuai, tersisa ${missingCount} yang perlu dilengkapi`
          : "Seluruh keterampilan inti Anda sudah sesuai",
    },
    { id: "sector", icon: Leaf, color: "text-emerald-600", text: `Sektor ${job.sector} selaras dengan minat dan pengalaman sektor Anda` },
    { id: "location", icon: MapPin, color: "text-red-500", text: `Lokasi dan pola kerja ${job.workMode.toLowerCase()} sesuai dengan preferensi Anda` },
  ];

  return (
    <section aria-labelledby="fit-title" className="rounded-xl border border-mint-line bg-gradient-to-br from-mint to-white p-5">
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-brand text-white">
          <Sparkles className="size-3.5" aria-hidden="true" />
        </span>
        <h2 id="fit-title" className="text-[15px] font-bold text-ink">
          Mengapa lamaran ini cocok untuk Anda
        </h2>
      </div>
      <p className="mt-2 text-[11px] text-ink/70">Berdasarkan profil dan asesmen Anda, posisi ini direkomendasikan karena:</p>

      <ul className="mt-3 space-y-2.5">
        {reasons.map(({ id, icon: Icon, color, text }) => (
          <li key={id} className="flex items-start gap-2.5 text-[13px] text-ink">
            <Icon className={`mt-0.5 size-4 shrink-0 ${color}`} aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
