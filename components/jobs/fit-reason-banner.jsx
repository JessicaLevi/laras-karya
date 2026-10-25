import { Leaf, MapPin, Sparkles, Target, Wrench } from "lucide-react";

/** @param {number} p */
function matchLevel(p) {
  if (p >= 90) return "sangat tinggi";
  if (p >= 80) return "tinggi";
  return "cukup tinggi";
}

/**
 * Banner "Mengapa lowongan ini cocok untuk Anda". Poin dibuat dari data lowongan.
 * @param {{ job: import("@/lib/job-detail-data").JobDetail, missingCount: number }} props
 */
export function FitReasonBanner({ job, missingCount }) {
  const total = job.skills.length;
  const owned = total - missingCount;
  const reasons = [
    {
      id: "match",
      icon: Target,
      color: "text-red-500",
      text: `Tingkat kecocokan Anda ${matchLevel(job.matchPercent)} untuk posisi ini`,
    },
    {
      id: "skills",
      icon: Wrench,
      color: "text-ink/70",
      text:
        missingCount === 0
          ? "Anda sudah memiliki seluruh keterampilan yang dibutuhkan"
          : owned === 0
            ? "Anda belum memiliki keterampilan yang dibutuhkan"
            : `Anda memiliki ${owned} dari ${total} keterampilan yang dibutuhkan`,
    },
    {
      id: "sector",
      icon: Leaf,
      color: "text-emerald-600",
      text: `Sektor ${job.sector} cocok dengan minat dan pengalaman Anda`,
    },
    {
      id: "location",
      icon: MapPin,
      color: "text-red-500",
      text: `Lokasi dan pola kerja ${job.workMode.toLowerCase()} sesuai preferensi Anda`,
    },
  ];

  return (
    <section
      aria-labelledby="fit-title"
      className="rounded-xl border border-mint-line bg-brand-light from-mint to-white p-5"
    >
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-brand text-white">
          <Sparkles className="size-3.5" aria-hidden="true" />
        </span>
        <h2 id="fit-title" className="text-[15px] font-bold text-ink">
          Mengapa lowongan ini cocok untuk Anda
        </h2>
      </div>
      <p className="mt-2 text-xs text-ink/70">
        Berdasarkan profil dan hasil asesmen Anda.
      </p>

      <ul className="mt-3 space-y-2.5">
        {reasons.map(({ id, icon: Icon, color, text }) => (
          <li
            key={id}
            className="flex items-start gap-2.5 text-[13px] text-ink"
          >
            <Icon
              className={`mt-0.5 size-4 shrink-0 ${color}`}
              aria-hidden="true"
            />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
