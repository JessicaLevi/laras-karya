import PublicShell from "@/components/layout/public-shell";

export default function LegalPage({ title, children }) {
  return (
    <PublicShell>
      <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <h1 className="text-3xl font-bold text-brand">{title}</h1>
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Draf: dokumen ini sedang disusun dan belum final.
        </p>
        <div className="mt-8 space-y-6 leading-relaxed text-slate-800">{children}</div>
      </main>
    </PublicShell>
  );
}