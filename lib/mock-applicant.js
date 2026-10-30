// DATA SEMENTARA (mock). Nanti diganti data dari Supabase (tabel profiles).
import { PROFILE } from "@/lib/profile-data";

export const MOCK_APPLICANT = {
  name: PROFILE.name,
  phone: PROFILE.contact.phone,
  lastJob: { title: "Environmental Coordinator", company: "PT EcoSolutions", years: 2 },
  education: { degree: "S1 Ilmu Lingkungan", school: "Universitas Indonesia" },
};

// Draf surat lamaran. Nanti dihasilkan oleh AI, dan pengguna tetap bisa mengeditnya.
export function buildCoverLetter(job, a) {
  return [
    "Dengan hormat,",
    `Melalui surat ini saya mengekspresikan ketertarikan mendalam untuk posisi ${job.title} di ${job.company}. Dengan latar belakang pendidikan ${a.education.degree} dari ${a.education.school} serta pengalaman praktis sebagai ${a.lastJob.title} selama ${a.lastJob.years} tahun, saya yakin dapat memberikan kontribusi signifikan terhadap target keberlanjutan dan implementasi standar ESG perusahaan Anda.`,
    `Hormat saya,\n${a.name}`,
  ].join("\n\n");
}
