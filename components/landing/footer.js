import Link from "next/link";
import { Logo } from "./navbar";

// lucide-react versi baru tidak lagi menyediakan ikon brand, jadi dibuat inline.
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-4 w-4 text-white",
  "aria-hidden": true,
};
const Instagram = () => (
  <svg {...svgProps}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" />
  </svg>
);
const Twitter = () => (
  <svg {...svgProps}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);
const Linkedin = () => (
  <svg {...svgProps}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "X (Twitter)", href: "https://x.com", Icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
];

/**
 * Ilustrasi garis (line art) gedung hijau: panel surya, taman atap, taman vertikal, turbin angin, dan sirkuit.
 * Dekoratif saja (aria-hidden), warna mengikuti `currentColor`, jadi atur lewat className (mis. text-white/10).
 */
function EcoBuildingArt({ className }) {
  return (
    <svg
      viewBox="0 0 420 252"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 248H420"/><rect x="6" y="160" width="62" height="88"/><path d="M6 190H68M6 220H68"/><rect x="16" y="198" width="9" height="14"/><rect x="36" y="198" width="9" height="14"/><rect x="52" y="198" width="9" height="14"/><rect x="16" y="168" width="9" height="14"/><rect x="36" y="168" width="9" height="14"/><rect x="52" y="168" width="9" height="14"/><path d="M14 160c0-9 8-9 8 0M24 160c0-9 8-9 8 0"/><path d="M34 190c0-9 8-9 8 0M44 190c0-9 8-9 8 0"/><path d="M54 220c0-9 8-9 8 0M64 220c0-9 8-9 8 0"/><rect x="76" y="92" width="94" height="156"/><path d="M76 126H170M76 160H170M76 194H170"/><rect x="86" y="102" width="18" height="22"/><rect x="114" y="102" width="18" height="22"/><rect x="142" y="102" width="18" height="22"/><rect x="86" y="136" width="18" height="22"/><rect x="114" y="136" width="18" height="22"/><rect x="142" y="136" width="18" height="22"/><rect x="86" y="170" width="18" height="22"/><rect x="114" y="170" width="18" height="22"/><rect x="142" y="170" width="18" height="22"/><rect x="86" y="204" width="18" height="22"/><rect x="114" y="204" width="18" height="22"/><rect x="142" y="204" width="18" height="22"/><path d="M80 92l14-18h30l-14 18M114 92l14-18h30l-14 18"/><path d="M86 92l14-18M120 92l14-18M94 74l-14 18"/><path d="M160 92c0-8 6-12 10-4M150 92c0-10 8-14 14-6"/><rect x="170" y="176" width="64" height="72"/><path d="M170 176l14-14h40l10 14"/><path d="M176 176l12-14M196 176l12-14M216 176l12-14"/><rect x="180" y="190" width="10" height="14"/><rect x="198" y="190" width="10" height="14"/><rect x="216" y="190" width="10" height="14"/><path d="M186 230c0-12 10-12 10 0M206 230c0-12 10-12 10 0M196 248v-18"/><path d="M290 248V112"/><circle cx="290" cy="108" r="4"/><path d="M290 108V62M290 108l40 23M290 108l-40 23"/><path d="M346 248V160"/><circle cx="346" cy="157" r="3"/><path d="M346 157v-30M346 157l26 15M346 157l-26 15"/><path d="M250 248c-7-9-5-20 0-27c5 7 7 18 0 27z"/><path d="M262 248c-7-9-5-20 0-27c5 7 7 18 0 27z"/><path d="M372 248c-7-9-5-20 0-27c5 7 7 18 0 27z"/><path d="M386 248c-7-9-5-20 0-27c5 7 7 18 0 27z"/><path d="M404 248c-7-9-5-20 0-27c5 7 7 18 0 27z"/><path d="M258 248c-2-10-1-16 4-22M380 248c-2-10-1-16 4-22"/><path d="M12 120H40V96H70"/><circle cx="12" cy="120" r="3"/><circle cx="70" cy="96" r="3"/><path d="M20 140H52"/><circle cx="20" cy="140" r="3"/><circle cx="232" cy="96" r="13" strokeDasharray="4 3" strokeWidth="5"/><circle cx="232" cy="96" r="9"/><circle cx="232" cy="96" r="3"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand text-emerald-100/80">
      {/* Aksen eco building di kedua sudut bawah; disembunyikan di layar kecil agar tidak menabrak teks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden md:block">
        <EcoBuildingArt className="absolute bottom-0 left-0 w-[min(30vw,340px)] text-white/[0.13]" />
        <EcoBuildingArt className="absolute bottom-0 right-0 w-[min(30vw,340px)] -scale-x-100 text-white/[0.13]" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Menjembatani perempuan Indonesia menuju karier di sektor hijau.
            </p>
          </div>
          <nav aria-label="Navigasi footer">
            <h3 className="text-xs font-bold tracking-wider text-white">
              NAVIGASI
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white">
                  Karier Hijau
                </Link>
              </li>
              <li>
                <Link href="/employer" className="hover:text-white">
                  Perusahaan
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <h3 className="text-xs font-bold tracking-wider text-white">
              KONTAK
            </h3>
            <p className="mt-4 text-sm">hubungi@laraskarya.id</p>
            <p className="mt-3 text-sm">Jakarta, Indonesia</p>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-100/30 transition hover:bg-white/10"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-emerald-100/20 py-6 text-xs sm:flex-row">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <p>© 2026 Laras Karya. Hak cipta dilindungi.</p>
            <Link href="/privacy" className="hover:text-white">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-white">
              Syarat &amp; Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
