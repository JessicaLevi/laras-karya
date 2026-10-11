const fs = require('fs');
const path = require('path');

// [route folder, page title shown to users]
const pages = [
  ['', 'Onboarding'],
  ['login', 'Masuk dan Daftar'],
  ['assessment/1', 'Asesmen - Langkah 1'],
  ['assessment/2', 'Asesmen - Langkah 2'],
  ['assessment/3', 'Asesmen - Ringkasan'],
  ['assessment/loading', 'AI Sedang Menganalisis'],
  ['home', 'Beranda'],
  ['jobs', 'Rekomendasi Lowongan'],
  ['jobs/[id]', 'Detail Lowongan'],
  ['bookmarks', 'Lowongan Tersimpan'],
  ['learning-path', 'Jalur Belajar'],
  ['applications', 'Pelacak Lamaran'],
  ['applications/prepare', 'Persiapan Lamaran'],
  ['profile', 'Profil'],
  ['employer', 'Employer'],
];

for (const [route, title] of pages) {
  const dir = path.join('app', route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'page.js'),
    `export default function Page() {\n  return (\n    <main style={{ padding: 24 }}>\n      <h1>${title}</h1>\n    </main>\n  );\n}\n`
  );
}