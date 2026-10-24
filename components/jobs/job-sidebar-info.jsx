import { Check } from "lucide-react";

/**
 * Dua kartu sidebar: Informasi Lowongan dan Skill yang Dibutuhkan.
 * Aksi melamar ada di MatchSkillGapCard, jadi sidebar ini hanya menampilkan informasi.
 * @param {{ job: import("@/lib/job-detail-data").JobDetail }} props
 */
export function JobSidebarInfo({ job }) {
  const rows = [
    { label: "Alamat Perusahaan", value: job.address },
    { label: "Gaji", value: job.salary },
    { label: "Tipe Pekerjaan", value: job.employmentType },
  ];

  return (
    <>
      <section
        aria-labelledby="info-title"
        className="rounded-xl bg-white p-5 shadow-sm"
      >
        <h2 id="info-title" className="text-[15px] font-bold text-ink">
          Informasi Lowongan
        </h2>
        <dl className="mt-3 divide-y divide-line">
          {rows.map((r) => (
            <div key={r.label} className="py-3 first:pt-0">
              <dt className="text-xs text-ink/70">{r.label}</dt>
              <dd className="mt-1 text-[13px] font-bold text-ink">{r.value}</dd>
            </div>
          ))}
          <div className="pt-3">
            <dt className="text-xs text-ink/70">Sektor</dt>
            <dd className="mt-1.5">
              <span className="rounded-full bg-mint px-2.5 py-0.5 text-xs font-semibold text-brand">
                {job.sector}
              </span>
            </dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="skills-title"
        className="rounded-xl bg-white p-5 shadow-sm"
      >
        <h2 id="skills-title" className="text-[15px] font-bold text-ink">
          Skill yang Dibutuhkan
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
    </>
  );
}
