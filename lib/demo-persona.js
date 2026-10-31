import { PROFILE, PROFILE_CAREER } from "@/lib/profile-data";

/**
 * Jawaban asesmen untuk tokoh contoh (PROFILE di lib/profile-data.js), dipakai tombol
 * "Isi data contoh" di /assessment/1?demo=1. Semua isi diturunkan dari PROFILE, jadi hasil
 * asesmen, profil, rekomendasi, dan surat lamaran bercerita tentang orang yang sama.
 * SEMENTARA untuk fase front-end; hapus saat asesmen sudah tersambung ke backend.
 */
const [current, previous] = PROFILE.experiences;
const [degreeLevel, ...majorWords] = PROFILE.education[0].degree.split(" ");

export const DEMO_ASSESSMENT = {
  step_1: { ...PROFILE_CAREER, consent: true },
  step_2: {
    province: "DKI Jakarta",
    city: PROFILE.contact.location.split(",")[0].trim(),
    open_to_relocate: false,
    education: {
      degree_level: degreeLevel.toLowerCase(), // "S1" -> "s1"
      major: majorWords.join(" "),
      institution: PROFILE.education[0].school,
    },
    certifications: PROFILE.certifications.map(({ name, issuer }) => ({ name, issuer })),
    experience_story:
      `Saat ini saya ${current.role} di ${current.company}. ${current.description} ` +
      `Sebelumnya saya ${previous.role} di ${previous.company}. ${previous.description} ` +
      "Saya ingin beralih ke peran keberlanjutan yang lebih strategis di sektor hijau.",
  },
  step_3: {
    work_arrangement: "hybrid",
    interest_sectors: ["energi-terbarukan", "konservasi-lingkungan"],
    skills: PROFILE.skills.map((s) => s.label),
    experience_level: "mid",
  },
};
