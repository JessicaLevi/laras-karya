import { LIMITS } from "@/lib/assessment-options";

/**
 * Bantuan untuk keahlian yang diketik bebas oleh user (di luar daftar).
 * Fungsi murni tanpa React, jadi bisa dipakai di browser maupun Server Action.
 */

/** Rapikan tulisan: hapus spasi di awal/akhir dan spasi ganda. */
export function tidySkillName(raw) {
  return raw.replace(/\s+/g, " ").trim();
}

/** Bentuk pembanding: huruf kecil, tanpa aksen dan tanda baca. */
function comparable(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const sameSkill = (a, b) => comparable(a) === comparable(b);

function editDistance(a, b) {
  // Jarak Levenshtein: jumlah huruf yang perlu diubah, ditambah, atau dihapus
  let previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
    }
    previous = current;
  }
  return previous[b.length];
}

/** Kemiripan 0–1 antara dua nama skill (1 = sama). */
export function skillSimilarity(a, b) {
  const x = comparable(a);
  const y = comparable(b);
  if (!x || !y) return 0;
  return 1 - editDistance(x, y) / Math.max(x.length, y.length);
}

/**
 * Skill di daftar yang mirip dengan ketikan user, mis. "Analisa data" → "Analisis Data".
 * Dipakai untuk saran "Mungkin maksud Anda" sebelum user menambah skill di luar daftar.
 */
export function findSimilarSkills(query, options, { limit = 3, threshold = 0.7 } = {}) {
  return options
    .map((option) => ({ option, score: skillSimilarity(query, option) }))
    .filter((item) => item.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.option);
}

const ALLOWED = /^[\p{L}\p{N} &-]+$/u;

/** Pesan error untuk satu skill ketikan, atau null jika boleh ditambahkan. */
export function customSkillProblem(raw) {
  const name = tidySkillName(raw);
  if (name.length < LIMITS.customSkillMinLength) return `Minimal ${LIMITS.customSkillMinLength} karakter.`;
  if (name.length > LIMITS.customSkillMaxLength) return `Maksimal ${LIMITS.customSkillMaxLength} karakter.`;
  if (!ALLOWED.test(name)) return "Gunakan huruf, angka, spasi, & atau - saja.";
  return null;
}
