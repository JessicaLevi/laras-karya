import { useSyncExternalStore } from "react";

/*
  Mode demo: SATU penanda per tab, dinyalakan oleh halaman /demo (app/demo/page.js).
  Efeknya hanya di tempat yang perlu pengisian data oleh presenter:
    - /assessment/1  : kotak "Isi data contoh"
    - /register, /login : formulir terisi data contoh (components/auth/demo-prefill.jsx)
  Hilang sendiri saat tab ditutup. ?demo=1 pada alamat tetap diterima sebagai cara alternatif.
  Hanya untuk browser (komponen client).
*/
const KEY = "laras-karya:demo";

export function enableDemoMode() {
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    // sessionStorage bisa tidak tersedia (mode privat tertentu)
  }
}

export function isDemoMode() {
  try {
    return (
      window.sessionStorage.getItem(KEY) === "1" ||
      new URLSearchParams(window.location.search).get("demo") === "1"
    );
  } catch {
    return false;
  }
}

const subscribeNothing = () => () => {};

/** Di server selalu false; di browser mengikuti isDemoMode() setelah hydrate. */
export const useDemoMode = () => useSyncExternalStore(subscribeNothing, isDemoMode, () => false);
