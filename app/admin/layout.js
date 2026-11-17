import { Suspense } from "react";

import AdminNav from "./components/admin-nav";

export const metadata = {
  title: "Admin | Laras Karya",
  robots: { index: false, follow: false },
};

/**
 * Kerangka admin. Layout sengaja tidak membaca cookies; pengecekan role dilakukan di setiap halaman
 * (requireAdminPage) dan setiap Server Action (getAdminContext), karena layout tidak dijalankan ulang di setiap navigasi.
 */
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="text-base font-bold text-primary">Laras Karya · Admin</p>
          <Suspense fallback={<div className="h-8" aria-hidden="true" />}>
            <AdminNav />
          </Suspense>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Memuat…</p>}>{children}</Suspense>
      </main>
    </div>
  );
}