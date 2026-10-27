"use client";

import { useState } from "react";
import { Eye, GraduationCap, HeartHandshake, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

const MISSIONS = [
  { id: "m1", icon: Zap, title: "Peluang Karir Hijau", text: "Membuka dan mempermudah akses lapangan kerja inklusif di perusahaan berkomitmen ESG dan keberlanjutan." },
  { id: "m2", icon: GraduationCap, title: "Peningkatan Keterampilan", text: "Menyediakan pelatihan tersertifikasi di bidang energi terbarukan, analisis ESG, dan manajemen limbah." },
  { id: "m3", icon: HeartHandshake, title: "Aksesibilitas & Inklusivitas Pengguna", text: "Menghadirkan pengalaman yang jelas, inklusif, dan mudah diakses bagi pengguna dari beragam latar belakang." },
];

const TABS = [
  { id: "visi", label: "Visi Utama" },
  { id: "misi", label: "Misi Strategis" },
];

/*
  Tinggi kedua panel disamakan: panel Visi dan Misi ditumpuk di sel grid yang sama,
  jadi tinggi area = panel tertinggi. Panel yang tidak aktif disembunyikan dengan
  `invisible` (tetap memakai ruang, tidak bisa difokus/dibaca screen reader).
  Di mobile (<768px) panel tidak aktif memakai `hidden`, karena Misi bertumpuk 3 kartu
  dan jauh lebih tinggi dari Visi, sehingga disamakan tingginya justru terlihat janggal.
*/
const panelClass = (isActive) =>
  cn("col-start-1 row-start-1 flex-col", isActive ? "flex" : "hidden md:flex md:invisible");

/** Tab Visi / Misi (interaktif, menggantikan fungsi switchTab() di HTML asli). */
export function VisionMissionTabs() {
  const [active, setActive] = useState("visi");

  return (
    <div className="mx-auto max-w-4xl">
      <div role="tablist" aria-label="Visi dan misi" className="mx-auto mb-8 flex max-w-md justify-center rounded-xl border border-slate-200 bg-slate-100 p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={cn(
              "min-h-11 w-1/2 rounded-lg py-2.5 text-sm font-bold transition-all",
              active === t.id ? "bg-white text-green-800 shadow-sm" : "text-slate-600 hover:text-slate-900"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid">
      {/* Visi */}
      <div id="panel-visi" role="tabpanel" aria-labelledby="tab-visi" className={panelClass(active === "visi")}>
        <div
          className="relative flex flex-1 items-center overflow-hidden rounded-2xl p-5 text-white shadow-xl md:p-6"
          style={{ backgroundImage: "linear-gradient(135deg, #14532D 0%, #064E3B 50%, #022C22 100%)" }}
        >
          <div aria-hidden="true" className="absolute -bottom-10 -right-10 h-52 w-60 rounded-full bg-green-400/10 blur-2xl" />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-white/10 text-green-300 backdrop-blur">
              <Eye className="size-5" aria-hidden="true" />
            </div>
            <h3 className="mb-1.5 text-xl font-bold text-white">Visi Kami</h3>
            <p className="text-sm font-normal leading-relaxed text-emerald-100/90 sm:text-base">
              “Menjadi platform pendorong utama kesetaraan gender dan pertumbuhan ekonomi hijau di Indonesia, di mana setiap perempuan memiliki akses setara untuk berkarier, memimpin, dan berinovasi demi kelestarian bumi.”
            </p>
          </div>
        </div>
      </div>

      {/* Misi */}
      <div id="panel-misi" role="tabpanel" aria-labelledby="tab-misi" className={panelClass(active === "misi")}>
        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-1">
          {MISSIONS.map(({ id, icon: Icon, title, text }) => (
            <article key={id} className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 transition-shadow hover:shadow-md">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-green-700 text-white">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-slate-900">{title}</h4>
              <p className="text-sm leading-relaxed text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
