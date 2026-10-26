import { CAREER_SITUATIONS, EDUCATION_LEVELS, EXPERIENCE_LEVELS, LIMITS, SECTORS, WORK_ARRANGEMENTS } from "@/lib/assessment-options";
import { customSkillProblem, sameSkill } from "@/lib/skill-matching";

/**
 * Aturan validasi per langkah (dokumen bagian 3, "Aturan validasi di server").
 * Fungsi murni tanpa React, jadi nanti bisa dipakai ulang di Server Action.
 * Mengembalikan objek { namaField: "pesan error" }; objek kosong berarti valid.
 */

const valuesOf = (list) => list.map((item) => item.value);

export function validateStep1(step) {
  const errors = {};
  if (!valuesOf(CAREER_SITUATIONS).includes(step.career_situation)) {
    errors.career_situation = "Pilih salah satu yang paling menggambarkan Anda.";
  }
  if (step.consent !== true) {
    errors.consent = "Centang persetujuan untuk melanjutkan.";
  }
  return errors;
}

export function validateStep2(step) {
  const errors = {};
  if (!step.province) errors.province = "Pilih provinsi domisili.";
  if (!step.city?.trim()) errors.city = "Isi kota atau kabupaten domisili.";
  if (!valuesOf(EDUCATION_LEVELS).includes(step.education?.degree_level)) {
    errors.degree_level = "Pilih jenjang pendidikan terakhir.";
  }
  // educations.institution di HVN bersifat NOT NULL
  if (!step.education?.institution?.trim()) errors.institution = "Isi nama kampus atau sekolah.";
  if ((step.certifications ?? []).length > LIMITS.maxCertifications) {
    errors.certifications = `Maksimal ${LIMITS.maxCertifications} sertifikat.`;
  }
  const storyLength = step.experience_story?.trim().length ?? 0;
  if (storyLength < LIMITS.storyMin) {
    errors.experience_story = `Ceritakan minimal ${LIMITS.storyMin} karakter.`;
  } else if (storyLength > LIMITS.storyMax) {
    errors.experience_story = `Maksimal ${LIMITS.storyMax} karakter.`;
  }
  return errors;
}

export function validateStep3(step, skillOptions) {
  const errors = {};
  if (!valuesOf(WORK_ARRANGEMENTS).includes(step.work_arrangement)) {
    errors.work_arrangement = "Pilih pola kerja yang Anda inginkan.";
  }
  const sectorCodes = valuesOf(SECTORS);
  if (!step.interest_sectors?.length || step.interest_sectors.some((s) => !sectorCodes.includes(s))) {
    errors.interest_sectors = "Pilih minimal satu bidang industri.";
  }
  const known = new Set(skillOptions.map((s) => s.toLowerCase()));
  const skills = step.skills ?? [];
  const customSkills = step.custom_skills ?? [];
  if (skills.length + customSkills.length === 0) {
    errors.skills = "Pilih atau tambahkan minimal satu keahlian.";
  } else if (skills.length > LIMITS.maxSkills) {
    errors.skills = `Maksimal ${LIMITS.maxSkills} keahlian dari daftar.`;
  } else if (skills.some((s) => !known.has(s.toLowerCase()))) {
    errors.skills = "Keahlian dari daftar tidak dikenali. Hapus lalu pilih ulang.";
  }
  // Keahlian di luar daftar (diketik bebas), nanti dipetakan AI ke daftar jika ada padanannya
  if (customSkills.length > LIMITS.maxCustomSkills) {
    errors.custom_skills = `Maksimal ${LIMITS.maxCustomSkills} keahlian di luar daftar.`;
  } else if (customSkills.some((s) => customSkillProblem(s))) {
    errors.custom_skills = "Ada keahlian di luar daftar yang penulisannya belum sesuai.";
  } else if (customSkills.some((s) => skillOptions.some((o) => sameSkill(s, o)))) {
    errors.custom_skills = "Ada keahlian yang sebenarnya sudah ada di daftar. Pilih dari daftar saja.";
  }
  // Wajib: jika kosong, match_score di HVN error (lihat dokumen bagian 2.3)
  if (!valuesOf(EXPERIENCE_LEVELS).includes(step.experience_level)) {
    errors.experience_level = "Pilih tingkat pengalaman kerja.";
  }
  return errors;
}

export const isValid = (errors) => Object.keys(errors).length === 0;
