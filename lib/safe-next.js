/**
 * Tujuan setelah masuk/daftar (?next=). Hanya menerima alamat internal seperti "/recommended-jobs";
 * selain itu dipakai `fallback`. Mencegah open redirect (mis. ?next=https://situs-lain.com).
 * Fungsi murni, aman dipakai di server maupun browser.
 */
export function safeNextPath(value, fallback) {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}
