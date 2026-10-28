"use client";

import { useState } from "react";

import { ApplicationHistory } from "@/components/applications/application-history";
import { StatCard } from "@/components/ui/stat-card";
import { STAT_CARDS } from "@/lib/applications-data";

/**
 * FILE BARU. Menggabungkan kartu statistik dan riwayat lamaran agar keduanya berbagi satu state filter:
 * klik kartu → daftar riwayat difilter; klik kartu yang sama lagi (atau kartu "Total") → kembali ke semua.
 *
 * @param {{ applications: import("@/lib/applications-data").Application[] }} props
 */
export function ApplicationsView({ applications }) {
  const [filter, setFilter] = useState("semua");

  function handleCardClick(status) {
    // Total (status null) atau klik ulang kartu yang aktif → tampilkan semua
    setFilter((current) => (status === null || current === status ? "semua" : status));

    // Di layar kecil, riwayat berada jauh di bawah: gulirkan ke sana kalau belum terlihat
    requestAnimationFrame(() => {
      const el = document.getElementById("history-title");
      if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.8) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }

  return (
    <>
      {/* Mobile: Total selebar penuh + 2×2 · Tablet: 3 kolom · Desktop: 5 kolom */}
      <section aria-label="Ringkasan lamaran (klik kartu untuk memfilter riwayat)" className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-5">
        {STAT_CARDS.map((card, i) => (
          <StatCard
            key={card.id}
            label={card.label}
            icon={card.icon}
            tone={card.tone}
            value={card.status ? applications.filter((a) => a.status === card.status).length : applications.length}
            active={card.status !== null && filter === card.status}
            onClick={() => handleCardClick(card.status)}
            className={i === 0 ? "col-span-2 md:col-span-1" : undefined}
          />
        ))}
      </section>

      <ApplicationHistory applications={applications} filter={filter} onFilterChange={setFilter} />
    </>
  );
}
