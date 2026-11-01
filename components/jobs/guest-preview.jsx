import Link from "next/link";
import { Check, Lock } from "lucide-react";

import { FeaturedJobCard, JobCard } from "@/components/jobs/job-card";
import { getOpenJobsAppliedLast } from "@/lib/job-ordering";
import { JOBS } from "@/lib/mock-jobs";

/*
  Pratinjau hasil untuk TAMU (belum masuk): rekomendasi teratas tampil utuh, sisanya diburamkan,
  lalu pengguna diajak mendaftar. Urutan lowongan sama dengan daftar penuh (lib/job-ordering.js).

  - VISIBLE: jumlah lowongan yang tampil utuh (kartu utama sudah memuat skor, alasan, dan skill gap).
  - BLURRED: jumlah kartu yang diburamkan; tidak perlu semua supaya halaman tidak panjang.
  Bagian buram diberi aria-hidden + inert: tidak bisa difokus, diklik, atau dibaca pembaca layar.
  DATA KARTU TERKUNCI: yang dikirim ke browser hanya bahan "umpan" (sektor, pola kerja, skor), bukan
  judul, perusahaan, gaji, lokasi, atau keahlian asli (lihat lockedStub). Jadi meski blur dihapus lewat
  DevTools, yang terlihat hanya kartu contoh. Satu kartu utuh (VISIBLE) memang sengaja terbuka.
  KONTRAK UNTUK BACKEND: respons untuk tamu cukup { total, top, teaser: [{ sector, mode, match }] };
  data lengkap baru dikirim setelah masuk (dijaga RLS), sehingga tidak ada lowongan terkunci di browser.
*/
const VISIBLE = 1;
const BLURRED = 4;
const NEXT = "/recommended-jobs";
const OPEN_JOBS = getOpenJobsAppliedLast(JOBS);

// Isi kartu contoh untuk bagian terkunci (sengaja generik).
const STUB_TITLES = ["Spesialis Keberlanjutan", "Koordinator Program Hijau", "Analis Dampak Lingkungan", "Konsultan Energi Bersih"];
const STUB_COMPANIES = ["Perusahaan Mitra", "Lembaga Mitra", "Perusahaan Hijau", "Mitra Laras Karya"];

/** Kartu terkunci: hanya sektor, pola kerja, dan skor yang asli; sisanya contoh. */
function lockedStub(job, i) {
  return {
    id: `terkunci-${i}`,
    title: STUB_TITLES[i % STUB_TITLES.length],
    company: STUB_COMPANIES[i % STUB_COMPANIES.length],
    sector: job.sector,
    mode: job.mode,
    match: job.match,
    city: "Indonesia",
    salary: "Rp •• – •• juta/bulan",
    status: "dibuka",
    skills: ["Keahlian 1", "Keahlian 2", "Keahlian 3"],
    gaps: [["Keahlian 3", "belum"]],
    benefits: [],
  };
}

const BENEFITS = [
  "Hasil asesmen Anda tersimpan di profil",
  "Alasan kecocokan dan skill gap tiap lowongan",
  "Lamar langsung dari satu tempat",
];

export function GuestPreview() {
  const total = OPEN_JOBS.length;
  const shown = OPEN_JOBS.slice(0, VISIBLE);
  const locked = OPEN_JOBS.slice(VISIBLE, VISIBLE + BLURRED);
  const hiddenCount = total - VISIBLE;

  return (
    <div className="mt-6">
      <p className="text-sm text-slate-600">
        Kami menemukan <strong className="font-bold text-ink">{total} lowongan hijau</strong> yang cocok
        dengan jawaban Anda. {VISIBLE} ditampilkan di bawah, {hiddenCount} lainnya terbuka setelah Anda
        mendaftar.
      </p>

      {shown.map((job) => (
        <div key={job.id} className="mt-6">
          <FeaturedJobCard job={job} />
        </div>
      ))}

      {locked.length > 0 && (
        <section aria-labelledby="gate-title" className="relative mt-8">
          <div
            aria-hidden="true"
            inert
            className="pointer-events-none grid select-none items-stretch gap-5 opacity-90 blur-[5px] md:grid-cols-2"
          >
            {locked.map((job, i) => (
              <JobCard key={job.id} job={lockedStub(job, i)} />
            ))}
          </div>

          <div className="absolute inset-0 flex items-start justify-center px-2 pt-4 md:items-center md:pt-0">
            <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 text-center shadow-lg">
              <span className="mx-auto grid size-11 place-items-center rounded-full bg-brand-light text-brand">
                <Lock className="size-5" aria-hidden="true" />
              </span>
              <h2 id="gate-title" className="mt-3 text-xl font-bold text-ink">
                Lihat {hiddenCount} lowongan cocok lainnya
              </h2>
              <p className="mt-1.5 text-sm text-ink/80">
                Daftar gratis untuk membuka semua rekomendasi.
              </p>
              <ul className="mt-4 space-y-2 text-left text-sm text-ink">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={`/register?next=${encodeURIComponent(NEXT)}`}
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand text-base font-bold text-white transition-colors hover:bg-brand/90"
              >
                Daftar Gratis
              </Link>
              <p className="mt-3 text-sm text-ink">
                Sudah punya akun?{" "}
                <Link
                  href={`/login?next=${encodeURIComponent(NEXT)}`}
                  className="font-bold text-brand hover:underline"
                >
                  Masuk
                </Link>
              </p>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-subtle">
                <Lock className="size-3.5" aria-hidden="true" />
                Data Anda dilindungi dan tidak dibagikan tanpa izin.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
