import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

/**
 * Kerangka halaman publik (landing, Employer, dan halaman publik lain):
 * navbar + isi + footer. Setiap halaman mengisi <main>-nya sendiri.
 * active = href menu yang sedang dibuka, mis. <PublicShell active="/employer">
 */
export default function PublicShell({ active, children }) {
  return (
    <>
      <Navbar active={active} />
      {children}
      <Footer />
    </>
  );
}
