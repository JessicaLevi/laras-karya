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
  { label: "Instagram", Icon: Instagram },
  { label: "X (Twitter)", Icon: Twitter },
  { label: "LinkedIn", Icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-brand text-emerald-100/80">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 xl:px-8 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Membangun jembatan bagi perempuan Indonesia untuk berkontribusi
              aktif dan sukses di sektor pekerjaan ramah lingkungan demi masa
              depan bumi yang berkelanjutan.
            </p>
          </div>
          <nav aria-label="Navigasi footer">
            <h3 className="text-xs font-bold tracking-wider text-white">
              NAVIGASI
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/#tentang" className="hover:text-white">
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
                  Employer
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
              {SOCIALS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-100/30 hover:bg-white/10"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-emerald-100/20 py-6 text-xs sm:flex-row">
          <p>
            © 2026 Laras Karya. Platform Karier Sektor Hijau untuk Perempuan
            Indonesia.
          </p>
          <p>Hak Cipta Dilindungi</p>
        </div>
      </div>
    </footer>
  );
}
