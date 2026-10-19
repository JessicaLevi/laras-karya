"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import ToastViewport from "@/components/shared/toast-viewport";

const ToastContext = createContext(null);
const MAX_TOASTS = 3; // toast terlama dibuang kalau sudah ada 3 di layar

/**
 * Pasang sekali di app/layout.js. Karena berada di layout, toast tetap hidup
 * saat pengguna pindah halaman (mis. simpan profil → router.push("/home")).
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  /**
   * showToast({
   *   message: "Teks notifikasi",
   *   action:  { label: "Lihat ...", href: "/jobs" },   // opsional (atau onClick)
   *   tone:    "light" | "dark",                          // default "light"
   *   icon:    "check" | "sparkles" | "alert",            // default: check (light), sparkles (dark)
   *   duration: 5000,                                     // ms, 0 = tidak hilang sendiri
   *   role:    "status" | "alert",                        // "alert" untuk error
   * })
   */
  const showToast = useCallback((options) => {
    const id = ++idRef.current;
    const duration = options.duration ?? (options.action ? 8000 : 5000);
    setToasts((list) => [...list.slice(-(MAX_TOASTS - 1)), { tone: "light", ...options, id, duration }]);
    return id;
  }, []);

  const value = useMemo(() => ({ showToast, dismiss }), [showToast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus dipakai di dalam <ToastProvider> (lihat app/layout.js).");
  return ctx;
}
