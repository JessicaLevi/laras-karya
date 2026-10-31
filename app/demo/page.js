"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAssessment } from "@/context/assessment-store";
import { enableDemoMode } from "@/lib/demo-mode";
import { DEMO_ASSESSMENT } from "@/lib/demo-persona";

import { resetSession } from "./actions";

/*
  Pintu masuk demo (alamat tetap untuk presenter: /demo). Satu kunjungan:
    1. kosongkan lalu isi asesmen dengan data contoh (tetap bisa diubah langsung saat presentasi)
    2. nyalakan mode demo di tab ini (formulir daftar/masuk terisi sendiri)
    3. hapus cookie sesi, jadi hasil asesmen tampil sebagai pratinjau tamu
    4. buka langkah 1 asesmen
  Ulangi kapan saja untuk mengulang demo dari awal, tanpa DevTools.
  SEMENTARA: hapus atau lindungi halaman ini sebelum rilis publik.
*/
export default function DemoStartPage() {
  const router = useRouter();
  const { reset, updateStep, reachStep } = useAssessment();

  // Sekali saja saat dibuka. Dependensi dikosongkan sengaja: mengisi store memicu render ulang,
  // dan efek yang bergantung pada fungsi store/router bisa berulang tanpa henti.
  // Di mode dev (Strict Mode) efek jalan dua kali; hasilnya sama sehingga aman.
  useEffect(() => {
    (async () => {
      reset();
      ["step_1", "step_2", "step_3"].forEach((key) => updateStep(key, DEMO_ASSESSMENT[key]));
      reachStep(4);
      enableDemoMode();
      await resetSession();
      router.replace("/assessment/1");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="grid min-h-dvh place-items-center bg-surface px-4">
      <p role="status" className="text-sm text-ink/80">
        Menyiapkan demo…
      </p>
    </main>
  );
}
