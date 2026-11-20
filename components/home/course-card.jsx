"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Check, Clock, ExternalLink, Sparkle, Tag } from "lucide-react";

import { completeCourse, startCourse } from "@/app/learning-path/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Tampilan kartu ini sengaja sama dengan kartu pelatihan di halaman Jalur Belajar (app/learning-path/page.js):
// gambar 16:9 dengan lencana (kiri atas: Paling Populer, kiri bawah: level, kanan bawah: format), lalu penyedia,
// judul, durasi dengan kategori di bawahnya, dan tombol. Kartu terangkat saat disorot atau difokus.
// Gerak dimatikan untuk pengguna "reduce motion" (motion-safe).
// Tombol dan logikanya juga sama dengan Jalur Belajar: Mulai Belajar -> Lanjutkan Belajar + Sudah Selesai Diikuti -> Selesai.
// Pelatihan contoh (tanpa tautan, untuk tamu) tetap hanya menuju halaman /learning-path.

// Warna teks level pada lencana di atas gambar (latar putih transparan diberikan oleh ImageBadge).
const LEVEL_TEXT = {
  Pemula: "text-brand",
  Menengah: "text-amber-700",
  Lanjutan: "text-red-700",
};
// Data contoh memakai Beginner/Intermediate/Advanced; ditampilkan dengan istilah yang sama seperti Jalur Belajar.
const LEVEL_LABEL = { Beginner: "Pemula", Intermediate: "Menengah", Advanced: "Lanjutan" };

/** Lencana kecil di atas gambar sampul. */
function ImageBadge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Gambar sampul 16:9 (240x135 dari database tidak terpotong). Kosong atau gagal dimuat: placeholder. */
function CourseImage({ src }) {
  const [failed, setFailed] = useState(false);
  const remote = /^https?:\/\//.test(src ?? "");

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-brand-light">
      {src && !failed ? (
        remote ? (
          // Gambar dari database (alamat luar, mis. Udemy): tag biasa supaya tidak perlu daftar domain di next.config
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1200px) 370px, (min-width: 768px) 33vw, 100vw"
            onError={() => setFailed(true)}
            className="object-cover object-center"
          />
        )
      ) : (
        <span className="absolute inset-0 grid place-items-center text-brand/40">
          <BookOpen className="size-10" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}

/** @param {{ course: import("@/lib/home-data").CourseItem }} props */
export function CourseCard({ course }) {
  const { provider, title, level, duration, mode, focusSkill, image, isPopular, isPrimary, url } = course;
  const levelLabel = LEVEL_LABEL[level] ?? level;
  const router = useRouter();
  // Status belajar user: undefined = belum mulai, "enrolled" = sedang diikuti, "completed" = selesai.
  const [status, setStatus] = useState(course.status);
  const [actionError, setActionError] = useState("");
  const completed = status === "completed";
  const enrolled = status === "enrolled";

  // Klik "Mulai Belajar": catat "Sedang diikuti" (pelatihan dibuka di tab baru oleh tautannya).
  const handleStart = () => {
    setActionError("");
    startCourse(course.id)
      .then(({ status: next }) => setStatus(next))
      .catch((error) => setActionError(error.message));
  };

  // "Sudah Selesai Diikuti": simpan status selesai, lalu buka /profile dengan dialog "Tambah Sertifikasi" yang sudah terisi.
  const handleComplete = () => {
    setActionError("");
    completeCourse(course.id)
      .then(({ status: next }) => {
        setStatus(next);
        const params = new URLSearchParams({
          sertifikasi: title,
          penerbit: provider ?? "",
          tahun: String(new Date().getFullYear()),
        });
        router.push(`/profile?${params.toString()}`);
      })
      .catch((error) => setActionError(error.message));
  };

  const externalIcon = (
    <ExternalLink
      className="size-4 transition-transform motion-safe:group-hover/button:translate-x-0.5 motion-safe:group-hover/button:-translate-y-0.5"
      aria-hidden="true"
    />
  );

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300",
        "motion-safe:hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10",
        "focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/20",
        completed ? "border-brand/40 bg-brand-light/40" : "border-line",
      )}
    >
      {/* Garis progres: 0% belum mulai, setengah sedang diikuti, penuh selesai */}
      <div className="h-1 w-full bg-line/70" aria-hidden="true">
        <div
          className={cn(
            "h-full bg-brand transition-all duration-500",
            completed ? "w-full" : enrolled ? "w-1/2" : "w-0",
          )}
        />
      </div>

      <div className="relative overflow-hidden">
        <div className="transition-transform duration-500 motion-safe:group-hover:scale-105">
          <CourseImage src={image} />
        </div>
        {/* Gradasi tipis di bawah gambar supaya lencana level dan format tetap terbaca */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent"
          aria-hidden="true"
        />

        {/* Kiri atas: status */}
        <div className="absolute left-3 top-3">
          {completed ? (
            <ImageBadge className="bg-brand text-white">
              <Check className="size-3" aria-hidden="true" />
              Selesai
            </ImageBadge>
          ) : enrolled ? (
            <ImageBadge className="bg-white/90 text-brand">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Sedang diikuti
            </ImageBadge>
          ) : (
            isPopular && (
              <ImageBadge className="bg-accent-light text-accent">
                <Sparkle className="size-3 fill-current" aria-hidden="true" />
                Paling Populer
              </ImageBadge>
            )
          )}
        </div>

        {/* Kiri bawah: level. Kanan bawah: format */}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <ImageBadge className={cn("bg-white/90", LEVEL_TEXT[levelLabel] ?? "text-ink")}>{levelLabel}</ImageBadge>
          {mode && <ImageBadge className="bg-white/90 text-ink/80">{mode}</ImageBadge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex min-w-0 items-center gap-2.5 text-sm text-ink/80">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
            <BookOpen className="size-4" aria-hidden="true" />
          </span>
          <span className="truncate">{provider}</span>
        </p>

        <h3 className="mt-4 min-h-14 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand">
          {title}
        </h3>

        {/* Durasi, lalu kategori (skill gap yang ditutup) tepat di bawahnya */}
        <div className="mt-4 space-y-2.5 border-t border-line pt-4 text-sm text-ink/80">
          <p className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" aria-hidden="true" />
            {duration}
          </p>
          {focusSkill && (
            <p className="flex min-w-0 items-center gap-2" title={`Menutup skill gap: ${focusSkill}`}>
              <Tag className="size-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0 truncate rounded-md border border-accent px-2 py-0.5 text-xs font-medium text-accent">
                <span className="sr-only">Menutup skill gap: </span>
                {focusSkill}
              </span>
            </p>
          )}
        </div>

        <div className="mt-auto pt-5">
          {!url ? (
            // Pelatihan contoh (tamu / tanpa database): tidak ada tautan atau progres, arahkan ke Jalur Belajar.
            <Link
              href="/learning-path"
              className={cn(buttonVariants({ size: "lg" }), "w-full bg-brand text-white hover:bg-brand/90")}
            >
              {isPrimary ? "Mulai Belajar" : "Lihat Pelatihan"}
              <ArrowRight
                className="size-4 transition-transform motion-safe:group-hover/button:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ) : completed ? (
            <p className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-light text-sm font-bold text-brand">
              <Check className="size-4" aria-hidden="true" />
              Selesai
            </p>
          ) : enrolled ? (
            <div className="space-y-2">
              <Button
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full bg-brand hover:bg-brand/90"
              >
                Lanjutkan Belajar
                {externalIcon}
              </Button>
              <Button
                size="sm"
                variant="muted"
                className="w-full inline-flex min-h-11 items-center gap-1.5 border-brand px-3.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-light disabled:opacity-70 md:min-h-8"
                onClick={handleComplete}
              >
                <Check className="size-3.5" aria-hidden="true" />
                Sudah Selesai Diikuti
              </Button>
            </div>
          ) : (
            <Button
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full bg-brand hover:bg-brand/90"
              onClick={handleStart}
            >
              Mulai Belajar
              {externalIcon}
            </Button>
          )}
          {actionError && (
            <p role="alert" className="mt-2 text-xs text-destructive">
              {actionError}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
