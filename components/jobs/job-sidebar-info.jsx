import { Check } from "lucide-react";

/**
 * Kartu "Keterampilan yang Dibutuhkan": pil hijau = sudah dimiliki, bingkai merah = belum.
 * Gaji dan lokasi ada di header, aksi melamar ada di MatchSkillGapCard.
 * @param {{ job: import("@/lib/job-detail-data").JobDetail }} props
 */
export function JobSidebarInfo({ job }) {
  return (
    <section
      aria-labelledby="skills-title"
      className="rounded-xl bg-white p-5 shadow-sm"
    >
      <h2 id="skills-title" className="text-[15px] font-bold text-ink">
        Keterampilan yang Dibutuhkan
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {job.skills.map((s) =>
          s.status === "dimiliki" ? (
            <li
              key={s.id}
              className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white"
            >
              <Check className="size-3" aria-hidden="true" /> {s.name}
              <span className="sr-only"> (sudah dimiliki)</span>
            </li>
          ) : (
            <li
              key={s.id}
              className="rounded-full border border-red-300 bg-white px-3 py-1 text-xs font-semibold text-red-700"
            >
              {s.name}
              <span className="sr-only"> (belum dimiliki)</span>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}