import { hasApplied } from "@/lib/applications-data";
import { AppliedBadge } from "@/components/ui/applied-badge";
import Link from "next/link";

/**
 * Dua kartu sidebar: Informasi Lowongan dan Skill yang Dibutuhkan.
 * @param {{ job: import("@/lib/job-detail-data").JobDetail }} props
 */
export function JobSidebarInfo({ job }) {
  // Cek apakah lowongan ini sudah dilamar oleh pengguna
  const alreadyApplied = hasApplied(job.id);
  const isOpen = job.isOpen; // Menyesuaikan jika ada status pembukaan lowongan

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
              <dt className="text-[11px] text-ink/70">{r.label}</dt>
              <dd className="mt-1 text-[13px] font-bold text-ink">{r.value}</dd>
            </div>
          ))}
          <div className="pt-3">
            <dt className="text-[11px] text-ink/70">Sektor</dt>
            <dd className="mt-1.5">
              <span className="rounded-full bg-mint px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                {job.sector}
              </span>
            </dd>
          </div>
        </dl>

        {/* Bagian Aksi / Tombol Lamar / AppliedBadge di Sidebar */}
        <div className="mt-5 pt-4 border-t border-line">
          {alreadyApplied ? (
            <div className="flex justify-center">
              <AppliedBadge />
            </div>
          ) : isOpen !== false ? (
            <Link
              href={`/recommended-jobs/${job.id}/apply`}
              className="flex w-full items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
            >
              Lamar Sekarang
            </Link>
          ) : (
            <span className="block text-center text-xs font-medium text-ink/70">
              Lowongan Ditutup
            </span>
          )}
        </div>
      </section>

      <section
        aria-labelledby="skills-title"
        className="rounded-xl bg-white p-5 shadow-sm"
      >
        <h2 id="skills-title" className="text-[15px] font-bold text-ink">
          Skill yang Dibutuhkan
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {job.skills.map((s) => (
            <li
              key={s.id}
              className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white"
            >
              {s.name}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
