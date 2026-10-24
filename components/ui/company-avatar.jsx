// Avatar inisial perusahaan. Sementara pengganti logo; warna mengikuti sektor.
const TONES = {
  "Energi Terbarukan": "bg-amber-100 text-amber-800",
  "Bangunan Hijau": "bg-sky-100 text-sky-800",
  Konservasi: "bg-emerald-100 text-emerald-800",
  Agroforestri: "bg-lime-100 text-lime-800",
  "Pertanian Berkelanjutan": "bg-lime-100 text-lime-800",
  "Ekonomi Hijau": "bg-teal-100 text-teal-800",
  "Emisi Karbon": "bg-slate-200 text-slate-800",
  "Pengelolaan Limbah": "bg-orange-100 text-orange-800",
};

function initials(name = "") {
  return name
    .replace(/^(PT|CV|Yayasan)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function CompanyAvatar({ company, sector, className = "h-12 w-12 text-base" }) {
  const tone = TONES[sector] ?? "bg-brand-light text-brand";
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-xl font-bold ${tone} ${className}`}
    >
      {initials(company)}
    </span>
  );
}