// Aksi halaman profil (tambah, edit, hapus, simpan, batal).
//
// Sementara semua aksi hanya mengubah data di state `page.js` dan belum terhubung ke Supabase:
// tiap fungsi menerima profil saat ini lalu mengembalikan profil yang baru (tidak mengubah aslinya).
// Nanti tiap fungsi diganti menjadi Server Action ("use server") yang menulis ke database.
// Catatan: file "use server" hanya boleh mengekspor fungsi async.

const LANGUAGE_LEVELS = {
  Native: { percent: 100, tone: "brand" },
  Profesional: { percent: 80, tone: "blue" },
  Menengah: { percent: 55, tone: "neutral" },
  Dasar: { percent: 30, tone: "amber" },
};

/** Ambil beberapa kolom dari FormData sebagai objek teks yang sudah dirapikan. */
function pick(formData, keys) {
  return Object.fromEntries(keys.map((key) => [key, String(formData.get(key) ?? "").trim()]));
}

function newId(prefix) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function updateById(list, id, changes) {
  return list.map((item) => (item.id === id ? { ...item, ...changes } : item));
}

function removeById(list, id) {
  return list.filter((item) => item.id !== id);
}

function initialsOf(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/* ---------- Identitas (header) ---------- */

export function editProfileHeader(profile, formData) {
  const fields = pick(formData, ["name", "headline", "status"]);
  return { ...profile, ...fields, initials: initialsOf(fields.name) };
}

/* ---------- Pengalaman kerja ---------- */

const EXPERIENCE_FIELDS = ["role", "company", "period", "description"];

export function addExperience(profile, formData) {
  const item = { id: newId("exp"), ...pick(formData, EXPERIENCE_FIELDS) };
  return { ...profile, experiences: [item, ...profile.experiences] };
}

export function editExperience(profile, formData, id) {
  return { ...profile, experiences: updateById(profile.experiences, id, pick(formData, EXPERIENCE_FIELDS)) };
}

export function deleteExperience(profile, id) {
  return { ...profile, experiences: removeById(profile.experiences, id) };
}

/* ---------- Pendidikan ---------- */

const EDUCATION_FIELDS = ["degree", "school", "period", "gpa"];

export function addEducation(profile, formData) {
  const item = { id: newId("edu"), ...pick(formData, EDUCATION_FIELDS) };
  return { ...profile, education: [item, ...profile.education] };
}

export function editEducation(profile, formData, id) {
  return { ...profile, education: updateById(profile.education, id, pick(formData, EDUCATION_FIELDS)) };
}

export function deleteEducation(profile, id) {
  return { ...profile, education: removeById(profile.education, id) };
}

/* ---------- Sertifikasi ---------- */

const CERTIFICATION_FIELDS = ["name", "issuer", "year"];

export function addCertification(profile, formData) {
  const item = { id: newId("cert"), ...pick(formData, CERTIFICATION_FIELDS) };
  return { ...profile, certifications: [...profile.certifications, item] };
}

export function editCertification(profile, formData, id) {
  return { ...profile, certifications: updateById(profile.certifications, id, pick(formData, CERTIFICATION_FIELDS)) };
}

export function deleteCertification(profile, id) {
  return { ...profile, certifications: removeById(profile.certifications, id) };
}

/* ---------- Informasi kontak ---------- */

export function editContact(profile, formData) {
  return { ...profile, contact: { ...profile.contact, ...pick(formData, ["email", "phone", "location", "linkedin"]) } };
}

/* ---------- Keahlian ---------- */

export function addSkill(profile, formData) {
  const { label } = pick(formData, ["label"]);
  const exists = profile.skills.some((skill) => skill.label.toLowerCase() === label.toLowerCase());
  if (!label || exists) return profile;
  return { ...profile, skills: [...profile.skills, { id: newId("skill"), label, highlight: false }] };
}

export function deleteSkill(profile, id) {
  return { ...profile, skills: removeById(profile.skills, id) };
}

/* ---------- Bahasa ---------- */

export function addLanguage(profile, formData) {
  const { name, level } = pick(formData, ["name", "level"]);
  const { percent, tone } = LANGUAGE_LEVELS[level] ?? LANGUAGE_LEVELS.Profesional;
  return { ...profile, languages: [...profile.languages, { id: newId("lang"), name, level, tone, percent }] };
}

/* ---------- Simpan / Batal ---------- */

export function saveProfile(draft) {
  // TODO: simpan `draft` ke Supabase di sini.
  return draft;
}

export function cancelProfile(saved) {
  // Buang semua perubahan yang belum disimpan: kembali ke data terakhir yang tersimpan.
  return saved;
}

/* ---------- Resume (PDF) ---------- */

// Karakter di luar Latin-1 tidak ada di font bawaan PDF, jadi diganti "?" agar tidak rusak.
function safe(value) {
  return String(value ?? "").replace(/[^\x20-\x7E -ÿ–—•]/g, "?");
}

/**
 * Buat file PDF (A4) dari profil. Sementara dibuat di browser dengan jsPDF (npm i jspdf).
 * Nanti bisa diganti pembuatan di server lalu disimpan ke Supabase Storage.
 * `resumes` = daftar resume yang sudah ada, dipakai agar nama berkas diberi nomor dan tidak kembar.
 * @returns {Promise<{ id: string, name: string, createdAt: string, blob: Blob }>}
 */
// Nama berkas yang unik: "Nama Resume.pdf", lalu "Nama Resume (2).pdf", "Nama Resume (3).pdf", dan seterusnya.
function uniqueResumeName(cleanName, resumes) {
  const taken = new Set(resumes.map((resume) => resume.name));
  const base = `${cleanName} Resume`;
  let name = `${base}.pdf`;
  for (let number = 2; taken.has(name); number += 1) name = `${base} (${number}).pdf`;
  return name;
}

export async function generateResume(profile, resumes = []) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;
  const BRAND = [4, 95, 75];
  const INK = [27, 36, 32];
  const MUTED = [107, 114, 128];
  const LINE = [229, 231, 235];
  let y = margin;

  const color = (rgb) => doc.setTextColor(rgb[0], rgb[1], rgb[2]);

  function ensureSpace(height) {
    if (y + height > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function paragraph(text, { size = 10, style = "normal", tone = INK, gap = 0 } = {}) {
    if (!text) return;
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    color(tone);
    const lineHeight = size * 1.4;
    doc.splitTextToSize(safe(text), contentW).forEach((line) => {
      ensureSpace(lineHeight);
      doc.text(line, margin, y, { baseline: "top" });
      y += lineHeight;
    });
    y += gap;
  }

  // Baris judul tebal di kiri dengan keterangan (periode / tahun) rata kanan.
  function row(left, right) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const rightW = right ? doc.getTextWidth(safe(right)) : 0;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(safe(left), contentW - rightW - (right ? 16 : 0));
    ensureSpace(lines.length * 15 + 30);
    color(INK);
    lines.forEach((line, i) => doc.text(line, margin, y + i * 15, { baseline: "top" }));
    if (right) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      color(MUTED);
      doc.text(safe(right), pageW - margin, y + 1.5, { align: "right", baseline: "top" });
    }
    y += lines.length * 15;
  }

  function section(title) {
    ensureSpace(70);
    y += 16;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    color(BRAND);
    doc.text(title.toUpperCase(), margin, y, { baseline: "top", charSpace: 0.6 });
    y += 18;
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageW - margin, y);
    y += 12;
  }

  // Identitas
  paragraph(profile.name, { size: 24, style: "bold", tone: BRAND });
  paragraph(profile.headline, { size: 12, tone: MUTED, gap: 4 });
  const { email, phone, location, linkedin } = profile.contact;
  paragraph([email, phone, location, linkedin].filter(Boolean).join("   |   "), { size: 9.5, tone: MUTED });
  y += 8;
  doc.setDrawColor(BRAND[0], BRAND[1], BRAND[2]);
  doc.setLineWidth(2);
  doc.line(margin, y, pageW - margin, y);
  y += 4;

  if (profile.experiences.length > 0) {
    section("Pengalaman Kerja");
    profile.experiences.forEach((exp) => {
      row(exp.role, exp.period);
      paragraph(exp.company, { size: 10, style: "bold", tone: BRAND, gap: 2 });
      paragraph(exp.description, { size: 10, gap: 10 });
    });
  }

  if (profile.education.length > 0) {
    section("Pendidikan");
    profile.education.forEach((edu) => {
      row(edu.degree, edu.period);
      paragraph(edu.school, { size: 10, style: "bold", tone: BRAND, gap: 2 });
      paragraph(edu.gpa, { size: 10, gap: 10 });
    });
  }

  if (profile.certifications.length > 0) {
    section("Sertifikasi");
    profile.certifications.forEach((cert) => {
      row(cert.name, cert.year);
      paragraph(cert.issuer, { size: 10, tone: MUTED, gap: 10 });
    });
  }

  if (profile.skills.length > 0) {
    section("Keahlian");
    paragraph(profile.skills.map((skill) => skill.label).join(", "), { size: 10 });
  }

  if (profile.languages.length > 0) {
    section("Bahasa");
    paragraph(profile.languages.map((lang) => `${lang.name} (${lang.level})`).join(", "), { size: 10 });
  }

  // Keterangan kaki halaman
  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    color(MUTED);
    doc.text("Dibuat dengan Laras Karya", margin, pageH - 28);
    doc.text(`${page} / ${totalPages}`, pageW - margin, pageH - 28, { align: "right" });
  }

  const cleanName = safe(profile.name).replace(/[\\/:*?"<>|]/g, "").trim() || "Profil";
  doc.setProperties({ title: `${cleanName} - Resume`, author: cleanName, creator: "Laras Karya" });

  return {
    id: newId("resume"),
    name: uniqueResumeName(cleanName, resumes),
    createdAt: new Date().toISOString(),
    blob: doc.output("blob"),
  };
}

/** Unduh resume yang sudah dibuat sebagai file PDF. */
export function downloadResume(resume) {
  const url = URL.createObjectURL(resume.blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = resume.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Hapus satu resume dari daftar. */
export function deleteResume(resumes, id) {
  // TODO: hapus juga berkasnya dari Supabase Storage.
  return removeById(resumes, id);
}