"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAssessment } from "@/context/assessment-store";
import { enableDemoMode } from "@/lib/demo-mode";

import { resetSession } from "./actions";

/*
  Pintu masuk demo (alamat tetap untuk presenter: /demo). Satu kunjungan:
    1. kosongkan asesmen (jawaban diisi presenter lewat tombol "Isi data contoh" di langkah 1)
    2. nyalakan mode demo di tab ini (tombol "Isi data contoh" muncul, formulir daftar/masuk terisi sendiri)
    3. hapus cookie sesi, jadi hasil asesmen tampil sebagai pratinjau tamu
    4. buka landing page (/), supaya demo mengalir seperti pengunjung sungguhan:
       landing -> "Mulai Asesmen Gratis" -> "Isi data contoh" -> Lanjut -> hasil rekomendasi
  Ulangi kapan saja untuk mengulang demo dari awal, tanpa DevTools.
  SEMENTARA: hapus atau lindungi halaman ini sebelum rilis publik.
*/
export default function DemoStartPage() {
  const router = useRouter();
  const { reset } = useAssessment();

  // Sekali saja saat dibuka. Dependensi dikosongkan sengaja: mengubah store memicu render ulang,
  // dan efek yang bergantung pada fungsi store/router bisa berulang tanpa henti.
  // Di mode dev (Strict Mode) efek jalan dua kali; hasilnya sama sehingga aman.
  useEffect(() => {
    (async () => {
      reset();
      enableDemoMode();
      await resetSession();
      router.replace("/");
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
