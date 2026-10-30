/**
 * Label situasi karier untuk ditampilkan ke pengguna.
 * SATU-SATUNYA tempat teks ini ditulis: dipakai ringkasan asesmen (/assessment/4)
 * dan badge status di /profile, jadi keduanya tidak bisa berbeda.
 * Fungsi murni tanpa import, aman dipakai di server maupun browser.
 */
export function toCareerLabel(careerSituation, careerBreak) {
  switch (careerSituation) {
    case "switch_or_return":
      return careerBreak === "yes" ? "Kembali bekerja setelah jeda karier" : "Berpindah karier";
    case "practical_experience":
      return "Belajar dari pengalaman praktik";
    case "fresh_start":
      return "Lulusan baru atau mulai dari nol";
    default:
      return "–";
  }
}
