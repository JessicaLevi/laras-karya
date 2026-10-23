"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Briefcase, CircleCheck, FileText, MapPin, PenLine, Sparkles } from "lucide-react";
import { JOBS } from "@/lib/mock-jobs";
import { MOCK_APPLICANT, buildCoverLetter } from "@/lib/mock-applicant";
import ReadinessChecklist from "./readiness-checklist";
import SubmissionDialog from "./submission-dialog";

// GANTI: URL lowongan asli dari data/API (halaman sumber lowongan di situs perusahaan).
const PLACEHOLDER_APPLY_URL = "https://example.com/";
const MAX_FILE_MB = 5;

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-sm text-slate-600">{label}</dt>
      <dd className="mt-1.5 rounded-xl bg-surface px-4 py-3 text-ink">{value}</dd>
    </div>
  );
}

function StatusChip({ open }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${open ? "bg-brand-light text-brand" : "bg-red-50 text-red-700"}`}>
      {open ? "Masih Dibuka" : "Ditutup"}
    </span>
  );
}

function PrepareForm({ job }) {
  const a = MOCK_APPLICANT;
  const isOpen = job.status === "dibuka";
  const applyUrl = job.applyUrl ?? PLACEHOLDER_APPLY_URL;
  const place = job.mode === "Remote" ? "Remote" : `${job.mode} — ${job.city}`;

  const [letter, setLetter] = useState(() => buildCoverLetter(job, a));
  const [editing, setEditing] = useState(false);
  const [portfolio, setPortfolio] = useState(""); // nama file (file belum dikirim ke mana pun)
  const [uploadError, setUploadError] = useState("");
  const [consent, setConsent] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileRef = useRef(null);

  const hasLetter = letter.trim().length > 0;
  const canContinue = isOpen && consent;

  function onPickFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setUploadError(`Ukuran file maksimal ${MAX_FILE_MB} MB.`);
      e.target.value = "";
      return;
    }
    setUploadError("");
    setPortfolio(file.name);
  }

  function handleContinue() {
    if (!canContinue) return;
    // Buka situs perusahaan di tab baru, sekaligus tampilkan konfirmasi di halaman ini.
    window.open(applyUrl, "_blank", "noopener,noreferrer");
    setDialogOpen(true);
    // TODO (backend): simpan catatan lamaran (job id, waktu, status "belum dikonfirmasi") ke Supabase.
  }

  const portfolioButton = (
    <>
      <input ref={fileRef} id="portfolio" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={onPickFile} />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="rounded-full border border-brand px-3.5 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand-light"
      >
        {portfolio ? "Ganti File" : "Unggah Portfolio"}
      </button>
      {uploadError && <p role="alert" className="mt-1.5 text-xs text-red-700">{uploadError}</p>}
    </>
  );

  const items = [
    { key: "profil", label: "Profil lengkap", done: true },
    { key: "cv", label: "CV terhubung", done: true },
    { key: "surat", label: hasLetter ? "Surat lamaran tersedia" : "Surat lamaran belum diisi", done: hasLetter },
    {
      key: "portfolio",
      label: portfolio ? `Portfolio terunggah: ${portfolio}` : "Portfolio diperlukan untuk lowongan ini",
      done: Boolean(portfolio),
      action: portfolioButton,
    },
    { key: "syarat", label: consent ? "Syarat & ketentuan disetujui" : "Syarat & ketentuan belum disetujui", done: consent },
  ];

  const hint = !isOpen
    ? "Lowongan ini sudah ditutup."
    : !consent
      ? "Centang pernyataan di atas untuk melanjutkan."
      : "Anda akan diarahkan ke situs sumber lowongan. Lamaran dicatat di Laras Karya.";

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <Link href="/recommended-jobs" className="hover:underline">Lowongan</Link> /{" "}
        <Link href={`/recommended-jobs/${job.id}`} className="hover:underline">{job.title}</Link> /{" "}
        <span aria-current="page">Persiapan Lamaran</span>
      </nav>

      <h1 className="mt-3 text-3xl font-bold text-brand md:text-4xl">Persiapan Lamaran Pekerjaan</h1>
      <p className="mt-2 text-slate-800">Lengkapi dan periksa dokumen Anda sebelum melamar di situs perusahaan.</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
            <Briefcase className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-bold text-ink">{job.title}</h2>
            <p className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              {job.company} <span aria-hidden>•</span>
              <span className="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-medium text-brand">{job.sector}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden /> {place}</span>
          <StatusChip open={isOpen} />
        </div>
      </div>

      {!isOpen && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Lowongan ini sudah ditutup, jadi lamaran tidak bisa dilanjutkan.{" "}
          <Link href="/recommended-jobs" className="font-semibold underline">Lihat rekomendasi lainnya</Link>.
        </p>
      )}

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-6">
          <section aria-labelledby="cv-title" className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 id="cv-title" className="flex items-center gap-2 text-lg font-bold text-brand">
              <FileText className="h-5 w-5" aria-hidden /> Data CV &amp; Profil
            </h2>
            <p className="mt-4 flex items-center gap-2 rounded-xl bg-brand-light px-4 py-3 text-sm text-brand">
              <CircleCheck className="h-4 w-4 shrink-0" aria-hidden />
              Data CV diambil dari profil Anda — terhubung otomatis
            </p>
            <dl className="mt-5 space-y-4">
              <Field label="Nama Lengkap" value={a.name} />
              <Field label="Telepon" value={a.phone} />
              <Field label="Pengalaman Terakhir" value={`${a.lastJob.title} — ${a.lastJob.company} (${a.lastJob.years} tahun)`} />
              <Field label="Pendidikan" value={`${a.education.degree} — ${a.education.school}`} />
            </dl>
            <Link href="/profile" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
              Edit Profil <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </section>

          <section aria-labelledby="letter-title" className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="letter-title" className="flex items-center gap-2 text-lg font-bold text-brand">
                <PenLine className="h-5 w-5" aria-hidden /> Surat Lamaran
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-ai/10 px-3 py-1 text-xs font-semibold text-ai">
                <Sparkles className="h-3 w-3" aria-hidden /> Dibuat dengan bantuan AI
              </span>
            </div>

            {editing ? (
              <>
                <label htmlFor="surat" className="sr-only">Isi surat lamaran</label>
                <textarea
                  id="surat"
                  rows={10}
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  className="mt-4 w-full rounded-xl border border-slate-300 bg-white p-4 leading-relaxed text-ink"
                />
              </>
            ) : (
              <p className="mt-4 whitespace-pre-line rounded-xl bg-surface p-5 leading-relaxed text-slate-700">{letter}</p>
            )}

            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
            >
              {editing ? "Selesai Mengedit" : <>Edit Surat Lamaran <ArrowRight className="h-4 w-4" aria-hidden /></>}
            </button>
          </section>
        </div>

        <div className="space-y-6">
          <ReadinessChecklist items={items} />

          <div className="rounded-2xl bg-brand-light p-6">
            <label className="flex cursor-pointer items-start gap-3 text-sm font-medium text-ink">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-brand"
              />
              Saya menyatakan data yang diberikan adalah benar
            </label>
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue}
              aria-describedby="continue-hint"
              className="mt-4 w-full rounded-full bg-brand px-6 py-4 font-semibold text-white transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Lanjut Melamar di Situs Perusahaan
            </button>
            <p id="continue-hint" className="mt-3 text-center text-xs text-slate-600">{hint}</p>
          </div>
        </div>
      </div>

      <SubmissionDialog open={dialogOpen} onClose={() => setDialogOpen(false)} job={job} applyUrl={applyUrl} />
    </>
  );
}

export default function PrepareApplication() {
  const params = useSearchParams();
  // /applications/prepare?job=1  → kalau parameter belum ada, sementara pakai lowongan pertama.
  const jobId = Number(params.get("job") ?? 1);
  const job = JOBS.find((j) => j.id === jobId);

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 md:px-6 xl:px-8">
      {job ? (
        <PrepareForm key={job.id} job={job} />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-bold text-ink">Lowongan tidak ditemukan</p>
          <p className="mt-1 text-sm text-slate-600">Pilih lowongan dari daftar rekomendasi untuk mulai menyiapkan lamaran.</p>
          <Link href="" className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand/90">
            Lihat rekomendasi lowongan
          </Link>
        </div>
      )}
    </div>
  );
}
