import Link from "next/link";
import { ArrowRight, Lock, MapPin, Star, Wallet } from "lucide-react";
import { JOBS } from "@/lib/mock-jobs";
import { LOGIN_PATH, REGISTER_PATH, loginTo } from "@/lib/routes";
import { CompanyAvatar } from "@/components/ui/company-avatar";

const OPEN_JOBS = JOBS.filter((j) => j.status === "dibuka");
const BLURRED_COUNT = 3;

function VisibleCard({ job }) {
  const place = job.mode === "Remote" ? "Remote" : `${job.city} • ${job.mode}`;
  return (
    <section
      aria-label="Contoh rekomendasi"
      className="mt-8 rounded-3xl border-2 border-brand bg-brand-light p-5 sm:p-7"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white">
        <Star className="h-3 w-3" aria-hidden /> Contoh rekomendasi
      </span>

      <article className="mt-4 flex flex-col rounded-2xl bg-white p-6">
        <span className="self-start rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">
          {job.sector}
        </span>
        <div className="mt-4 flex items-center gap-4">
          <CompanyAvatar
            company={job.company}
            sector={job.sector}
            className="h-16 w-16 text-xl"
          />
          <div className="min-w-0">
            <h3 className="text-3xl font-bold text-ink">{job.title}</h3>
            <p className="mt-1 text-slate-600">{job.company}</p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">
          {job.description}
        </p>

        <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden /> {place}
          </li>
          <li className="flex items-center gap-2">
            <Wallet className="h-4 w-4 shrink-0" aria-hidden /> {job.salary}
          </li>
        </ul>

        <ul className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((s) => (
            <li
              key={s}
              className="rounded-full bg-brand-light px-3.5 py-1.5 text-xs font-semibold text-brand"
            >
              {s}
            </li>
          ))}
        </ul>

        <Link
          href={loginTo(`/applications/prepare?job=${job.id}`)}
          className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-xl bg-brand px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-brand/90"
        >
          Lamar Sekarang <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </article>
    </section>
  );
}

// Isi samaran: kartu buram sengaja TIDAK memakai data lowongan asli.
function PlaceholderCard() {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="blur-[3px]">
        <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">
          Sektor Hijau
        </span>
        <div className="mt-4 flex items-center gap-3">
          <span
            className="h-12 w-12 shrink-0 rounded-xl bg-slate-200"
            aria-hidden
          />
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-ink">
              Posisi Lowongan Hijau
            </h3>
            <p className="text-slate-600">Nama Perusahaan</p>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden /> Kota • Pola kerja
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {["Keahlian A", "Keahlian B", "Keahlian C"].map((s) => (
            <li
              key={s}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function PublicJobList() {
  const top = OPEN_JOBS[0];
  if (!top) return null;

  return (
    <div>
      <VisibleCard job={top} />

      <div className="mt-6">
        <div
          aria-hidden
          inert
          className="pointer-events-none grid select-none gap-5 [mask-image:linear-gradient(to_bottom,black_25%,transparent)] md:grid-cols-3 max-md:[&>*:nth-child(n+2)]:hidden"
        >
          {Array.from({ length: BLURRED_COUNT }, (_, i) => (
            <PlaceholderCard key={i} />
          ))}
        </div>

        <div className="relative -mt-14 flex justify-center px-4">
          <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
            <Lock className="mx-auto h-5 w-5 text-brand" aria-hidden />
            <p className="mt-2 font-bold text-ink">
              Daftar untuk membuka {BLURRED_COUNT} rekomendasi lainnya
            </p>
            <p className="mt-1 text-balance text-sm text-slate-700">
              Isi asesmen dan lihat lowongan yang cocok dengan profil Anda.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href={REGISTER_PATH}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90"
              >
                Daftar
              </Link>
              <Link
                href={LOGIN_PATH}
                className="rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand-light"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
