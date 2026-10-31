import Image from "next/image";
import Link from "next/link";
import { Leaf } from "lucide-react";

/**
 * Kerangka dua kolom untuk halaman Daftar dan Masuk: panel hijau di kiri, form di kanan.
 * `panelMedia` (opsional) tampil di tengah panel; `panelFooter` (opsional) menempel di dasar panel.
 * Keduanya hanya muncul di layar lebar.
 * @param {{ title: string, description: string, panelMedia?: React.ReactNode, panelFooter?: React.ReactNode, variant?: "solid" | "forest" | "leaf", children: React.ReactNode }} props
 */
export function AuthShell({ title, description, panelMedia, panelFooter, variant = "solid", children }) {
  const forest = variant === "forest";
  const leaf = variant === "leaf";
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="relative flex flex-col overflow-hidden bg-brand px-6 py-8 text-white lg:w-[45%] lg:px-12 lg:py-[clamp(1.5rem,5vh,3rem)] 2xl:px-[72px]">
        {forest && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            {/* Organic mesh ambient glow: bercak blur emerald terang, teal, dan aksen lime lembut */}
            <span className="absolute -left-24 -top-24 size-[420px] rounded-full bg-emerald-400/30 blur-[110px]" />
            <span className="absolute -right-20 top-1/3 size-[360px] rounded-full bg-teal-300/25 blur-[100px]" />
            <span className="absolute -bottom-32 left-1/4 size-[460px] rounded-full bg-emerald-500/25 blur-[120px]" />
            <span className="absolute bottom-1/4 -left-10 size-[220px] rounded-full bg-lime-200/10 blur-[80px]" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
            {/* Bulatan dekoratif: besar di belakang judul, sedang di belakang foto, kecil di kiri bawah (ukuran/posisi berupa persentase panel) */}
            <span className="absolute left-[38%] top-[8%] aspect-square w-[55%] rounded-full bg-gradient-to-br from-white/[0.14] to-white/[0.04]" />
            {/* <span className="absolute left-[24%] top-[42%] aspect-square w-[32%] rounded-full bg-gradient-to-br from-white/[0.12] to-white/[0.03]" /> */}
            <span className="absolute left-[16%] top-[65%] aspect-square w-[14%] rounded-full bg-white/[0.08]" />
          </div>
        )}
        {leaf && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            {/* Aksen daun garis minimalis, transparan: ranting di sudut kanan atas dan daun besar di latar bawah */}
            <svg viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="absolute -right-8 -top-8 w-[300px] text-emerald-300/20">
              <path d="M10 230C60 150 130 90 230 10" />
              {[
                [52, 168, 20], [82, 134, 20], [114, 106, 20], [150, 78, 20], [190, 48, 20],
                [70, 160, 200], [102, 126, 200], [136, 98, 200], [172, 68, 200],
              ].map(([x, y, r]) => (
                <path key={`${x}-${y}`} d="M0 0C-14-18-10-42 0-56C10-42 14-18 0 0Z" transform={`translate(${x} ${y}) rotate(${r})`} />
              ))}
            </svg>
            <svg viewBox="0 0 120 160" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="absolute -bottom-10 -left-6 w-[220px] rotate-[18deg] text-emerald-300/10">
              <path d="M60 156C20 120 14 70 60 6C106 70 100 120 60 156ZM60 156V30M60 110L34 84M60 86L86 62" />
            </svg>
          </div>
        )}
        <Link href="/" aria-label="Laras Karya, ke halaman awal" className="inline-flex w-fit">
          {/* Logo berwarna dijadikan putih lewat filter, jadi tidak perlu aset baru */}
          <Image
            src="/logo-laras-karya.png"
            alt="Laras Karya"
            width={462}
            height={138}
            priority
            className="h-14 w-auto brightness-0 invert lg:h-[clamp(2.5rem,7vh,3.5rem)]"
          />
        </Link>

        <div className="mt-8 lg:mt-[clamp(1rem,4vh,2.5rem)]">
          <h1 className="text-3xl font-bold leading-tight tracking-tight lg:text-[length:clamp(1.75rem,5.5vh,3rem)] lg:leading-[1.15]">{title}</h1>
          <p className="mt-4 hidden max-w-[34rem] text-lg leading-relaxed text-white/90 lg:block lg:text-[length:clamp(0.95rem,2.4vh,1.125rem)]">{description}</p>
        </div>

        {panelMedia && <div className="hidden min-h-0 flex-1 items-center justify-center py-4 lg:flex">{panelMedia}</div>}

        {panelFooter && (
          <div className={`mt-auto hidden pt-4 lg:block ${panelMedia ? "" : "lg:mb-24"}`}>{panelFooter}</div>
        )}

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

      <section className="flex flex-1 items-center justify-center bg-canvas px-6 py-10 lg:px-12 lg:py-3">
        {children}
      </section>
    </div>
  );
}