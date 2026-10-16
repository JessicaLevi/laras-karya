// Footer bersama untuk seluruh halaman app (setelah login).
// Gunakan komponen ini — jangan tulis <footer> inline di halaman masing-masing.
export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <p className="mx-auto max-w-[1200px] px-4 py-6 text-center text-sm text-subtle md:px-6 xl:px-8">
        © 2026 Laras Karya. Platform Karier Sektor Hijau untuk Perempuan Indonesia.
      </p>
    </footer>
  );
}
