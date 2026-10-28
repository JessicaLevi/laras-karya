import Link from "next/link";

import { cn } from "@/lib/utils";

/* value = warna angka, icon = warna ikon. Dipakai di F05 (Lamaran) dan Beranda. */
const VALUE = {
  green: "text-brand",
  blue: "text-blue-600",
  purple: "text-violet-600",
  red: "text-red-600",
  emerald: "text-emerald-600",
  orange: "text-orange-600",
  pink: "text-ai",
  lime: "text-brand",
};

// ⬇️ DITAMBAH: warna aksen angka saat kartu di-hover / difokus keyboard (hanya mode onClick)
const VALUE_HOVER = {
  green: "group-hover:text-green-600 group-focus-visible:text-green-600",
  blue: "group-hover:text-blue-500 group-focus-visible:text-blue-500",
  purple: "group-hover:text-violet-500 group-focus-visible:text-violet-500",
  red: "group-hover:text-red-500 group-focus-visible:text-red-500",
  emerald: "group-hover:text-teal-600 group-focus-visible:text-teal-600",
  orange: "group-hover:text-amber-600 group-focus-visible:text-amber-600",
  pink: "group-hover:text-pink-600 group-focus-visible:text-pink-600",
  lime: "group-hover:text-green-600 group-focus-visible:text-green-600",
};

const ICON = {
  green: "bg-brand-light text-brand",
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-violet-50 text-violet-600",
  red: "bg-red-50 text-red-600",
  emerald: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-500",
  pink: "bg-pink-50 text-ai",
  lime: "bg-emerald-50 text-emerald-500",
};

/**
 * Jika `href` diisi, seluruh kartu menjadi tautan. Tanpa `href`, tampil seperti biasa.
 * ⬇️ DITAMBAH: jika `onClick` diisi, kartu menjadi tombol interaktif (hover: naik, bayangan lembut,
 * ikon membesar, warna angka berubah); `active` menandai kartu yang sedang dipakai sebagai filter.
 * @param {{ label: string, value: number|string, icon: import("lucide-react").LucideIcon,
 *           tone?: keyof typeof VALUE, iconTone?: keyof typeof ICON, iconClassName?: string,
 *           className?: string, href?: string,
 *           onClick?: () => void, active?: boolean }} props
 */
export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "green",
  iconTone,
  iconClassName,
  className,
  href,
  onClick, // ⬇️ DITAMBAH
  active = false, // ⬇️ DITAMBAH
}) {
  // ⬇️ DITAMBAH: mode interaktif (tombol). Mode href dan mode biasa tidak berubah.
  const interactive = !href && typeof onClick === "function";

  const classes = cn(
    "flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-sm",
    href &&
      "transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
    // ⬇️ DITAMBAH: efek hover kartu (naik 4px + bayangan lembut)
    interactive &&
      "group w-full cursor-pointer text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/10 focus-visible:-translate-y-1 focus-visible:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0",
    // ⬇️ DITAMBAH: penanda kartu yang sedang aktif sebagai filter
    active && "ring-2 ring-brand",
    className,
  );

  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[13px] font-medium text-ink/75">{label}</span>
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-md",
            ICON[iconTone ?? tone],
            // ⬇️ DITAMBAH: ikon membesar saat hover
            interactive &&
              "transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none",
          )}
        >
          <Icon className={cn("size-3.5", iconClassName)} aria-hidden="true" />
        </span>
      </div>
      <span
        className={cn(
          "text-[32px] font-bold leading-none",
          VALUE[tone] ?? VALUE.green,
          // ⬇️ DITAMBAH: warna angka berubah saat hover
          interactive && ["transition-colors duration-300", VALUE_HOVER[tone] ?? VALUE_HOVER.green],
        )}
      >
        {value}
      </span>
    </>
  );

  // ⬇️ DIUBAH: tiga kemungkinan (tautan / tombol interaktif / kartu biasa)
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  if (interactive) {
    return (
      <button type="button" onClick={onClick} aria-pressed={active} className={classes}>
        {content}
      </button>
    );
  }
  return <div className={classes}>{content}</div>;
}
