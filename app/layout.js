import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar"; // Pastikan path ke komponen Navbar kamu sudah benar
import "./globals.css";

// 1. Menggunakan Plus_Jakarta_Sans dengan variable "--font-jakarta" dan weight [400, 500, 600, 700]
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Laras Karya",
  description: "Platform Karir Sektor Hijau untuk Perempuan Indonesia",
};

export default function RootLayout({ children }) {
  return (
    // 3. lang diubah menjadi "id" & variabel font dipasang di class <html>
    <html
      lang="id"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 2. Menambahkan <Navbar /> sebelum {children} */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}