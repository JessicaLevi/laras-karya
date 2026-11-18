import { requireAdminPage } from "@/lib/admin";
import JobForm from "../job-form";

export const metadata = { title: "Tambah Lowongan | Admin Laras Karya" };

export default async function NewJobPage() {
  const { supabase } = await requireAdminPage();
  const { data: sectors } = await supabase.from("sectors").select("code,label").order("label");

  return (
    <section className="max-w-3xl">
      <h1 className="mb-4 text-xl font-bold">Tambah Lowongan</h1>
      <JobForm sectors={sectors ?? []} />
    </section>
  );
}
