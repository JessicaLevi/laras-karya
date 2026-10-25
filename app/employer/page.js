import { Building2 } from "lucide-react";
import PublicShell from "@/components/layout/public-shell";
import ComingSoon from "@/components/shared/coming-soon";

export const metadata = {
  title: "Perusahaan | Laras Karya",
  description: "Halaman Perusahaan sedang dikembangkan.",
  // Halaman sementara: jangan diindeks mesin pencari. Hapus baris ini saat halaman sudah jadi.
  robots: { index: false, follow: true },
};

export default function EmployerPage() {
  return (
    <PublicShell active="/employer">
      <ComingSoon
        icon={Building2}
        title="Halaman Perusahaan sedang dikembangkan"
        description="Kami sedang menyiapkan fitur untuk HR perusahaan swasta dan instansi pemerintah: memasang lowongan hijau, mengelola pelamar, dan menemukan talenta perempuan yang cocok."
      />
    </PublicShell>
  );
}
