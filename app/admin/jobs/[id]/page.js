import { notFound } from "next/navigation";

import { requireAdminPage } from "@/lib/admin";
import { isUuid } from "@/lib/is-uuid";
import JobForm from "../job-form";

export const metadata = { title: "Ubah Lowongan | Admin Laras Karya" };

export default async function EditJobPage({ params }) {
  const { supabase } = await requireAdminPage();
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const [jobRes, sectorsRes] = await Promise.all([
    supabase.from("jobs").select("*").eq("id", id).maybeSingle(),
    supabase.from("sectors").select("code,label").order("label"),
  ]);
  if (!jobRes.data) notFound();

  return (
    <section className="max-w-3xl">
      <h1 className="mb-4 text-xl font-bold">Ubah Lowongan</h1>
      <JobForm job={jobRes.data} sectors={sectorsRes.data ?? []} />
    </section>
  );
}
