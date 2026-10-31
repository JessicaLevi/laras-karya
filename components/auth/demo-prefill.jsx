"use client";

import { useEffect, useState } from "react";

import { isDemoMode } from "@/lib/demo-mode";

/**
 * Mode demo: mengisi formulir (input tanpa value terkontrol) dengan data contoh, supaya presenter
 * tidak perlu mengetik. Tidak melakukan apa pun di luar mode demo. Taruh di dalam <form>.
 * @param {{ values: Record<string, string|boolean> }} props  kunci = id input
 */
export function DemoPrefill({ values }) {
  const [active, setActive] = useState(false);
  const key = JSON.stringify(values); // isi nilai, bukan identitas objek, supaya efek tidak berulang

  useEffect(() => {
    if (!isDemoMode()) return;
    for (const [id, value] of Object.entries(JSON.parse(key))) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.type === "checkbox") el.checked = Boolean(value);
      else el.value = String(value);
    }
    setActive(true);
  }, [key]);

  if (!active) return null;
  return (
    <p
      role="status"
      className="rounded-xl border border-dashed border-brand/40 bg-brand-light/60 px-4 py-2 text-[13px] text-ink"
    >
      Mode demo: formulir sudah terisi data contoh.
    </p>
  );
}
