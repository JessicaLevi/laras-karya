import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";

/**
 * Kerangka dua kolom untuk halaman Daftar dan Masuk: panel hijau di kiri, form di kanan.
 * `panelMedia` (opsional) tampil di tengah panel; `panelFooter` (opsional) menempel di dasar panel.
 * Keduanya hanya muncul di layar lebar.
 * @param {{ title: string, description: string, panelMedia?: React.ReactNode, panelFooter?: React.ReactNode, children: React.ReactNode }} props
 */
export function AuthShell({ title, description, panelMedia, panelFooter, children }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="relative flex flex-col overflow-hidden bg-brand px-6 py-8 text-white lg:w-[45%] lg:px-[72px] lg:py-[72px]">
        <Link href="/" aria-label="Laras Karya, ke halaman awal" className="inline-flex w-fit">
          {/* Logo berwarna dijadikan putih lewat filter, jadi tidak perlu aset baru */}
          <Image
            src="/logo-laras-karya.png"
            alt="Laras Karya"
            width={462}
            height={138}
            priority
            className="h-14 w-auto brightness-0 invert"
          />
        </Link>

        <div className="mt-8 lg:mt-16">
          <h1 className="text-3xl font-bold leading-tight tracking-tight lg:text-5xl lg:leading-[1.15]">{title}</h1>
          <p className="mt-4 hidden max-w-[34rem] text-lg leading-relaxed text-white/90 lg:block">{description}</p>
        </div>

        {panelMedia && <div className="hidden flex-1 items-center justify-center py-10 lg:flex">{panelMedia}</div>}

        {panelFooter && <div className="mt-auto hidden pt-10 lg:block">{panelFooter}</div>}

        {!panelMedia && (
          <>
            <Leaf
              aria-hidden="true"
              strokeWidth={1.25}
              className="pointer-events-none absolute bottom-10 right-28 hidden size-16 rotate-[8deg] text-white/25 lg:block"
            />
            <Leaf
              aria-hidden="true"
              strokeWidth={1.25}
              className="pointer-events-none absolute bottom-12 right-16 hidden size-10 -rotate-[12deg] text-white/20 lg:block"
            />
          </>
        )}
      </aside>

      <section className="flex flex-1 items-center justify-center bg-canvas px-6 py-10 lg:px-12 lg:py-16">
        {children}
      </section>
    </div>
  );
}
