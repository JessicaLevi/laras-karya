import { Building2 } from "lucide-react";
import PublicShell from "@/components/layout/public-shell";
import ComingSoon from "@/components/shared/coming-soon";

export const metadata = {
  title: "Employer | Laras Karya",
  description: "Halaman Employer sedang dikembangkan.",
  // Halaman sementara: jangan diindeks mesin pencari. Hapus baris ini saat halaman sudah jadi.
  robots: { index: false, follow: true },
};

export default function EmployerPage() {
  return (
    <PublicShell active="/employer">
      <ComingSoon
        icon={Building2}
        title="Halaman Employer sedang dikembangkan"
        description="Kami sedang menyiapkan fitur untuk HR perusahaan swasta dan instansi pemerintah: memasang lowongan green jobs, mengelola pelamar, dan menemukan talenta perempuan yang sesuai."
      />
    </PublicShell>
  );
}
