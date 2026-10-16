const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+62|62|0)8\d{8,12}$/;

/**
 * Validasi kolom "Email atau Nomor HP".
 * @param {string} value
 * @returns {string | undefined} pesan galat, atau undefined jika valid
 */
export function validateIdentifier(value) {
  const id = value.trim().replace(/[\s-]/g, "");
  if (!id) return "Email atau nomor HP wajib diisi.";
  if (!EMAIL_RE.test(id) && !PHONE_RE.test(id)) return "Masukkan email atau nomor HP yang valid.";
  return undefined;
}
