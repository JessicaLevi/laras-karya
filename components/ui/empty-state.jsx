import Image from "next/image";

// Tampilan kosong yang ramah. Beri `image` (path di /public) kalau sudah ada ilustrasi,
// kalau belum, dipakai ikon `icon` dalam tile hijau.
export function EmptyState({ icon: Icon, image, title, text, children }) {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-mint-line bg-white px-6 py-12 text-center">
      {image ? (
        <Image
          src={image}
          alt=""
          width={240}
          height={180}
          className="mx-auto h-auto w-48 object-contain sm:w-60"
        />
      ) : (
        Icon && (
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-light text-brand">
            <Icon className="h-8 w-8" aria-hidden />
          </span>
        )
      )}
      <p className="mt-5 text-lg font-bold text-ink">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">{text}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}
