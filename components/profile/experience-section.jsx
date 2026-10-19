"use client";

import { useRef, useState } from "react";
import { Briefcase } from "lucide-react";

import ExperienceDialog from "@/components/profile/experience-dialog";
import { ItemActions, PillButton, SectionCard } from "@/components/profile/section-card";
import { useToast } from "@/context/toast-context";

/**
 * Bentuk pemakaian tidak berubah: <ExperienceSection items={p.experiences} />
 *
 * Membutuhkan dua hal dari section-card.jsx:
 *  - PillButton meneruskan onClick
 *  - ItemActions menerima onEdit dan onDelete
 */
export function ExperienceSection({ items }) {
  const { showToast } = useToast();
  const [list, setList] = useState(items);
  const [dialog, setDialog] = useState({ open: false, mode: "add", item: null });
  const counter = useRef(0);

  const openAdd = () => setDialog({ open: true, mode: "add", item: null });
  const openEdit = (exp) => setDialog({ open: true, mode: "edit", item: exp });
  const close = () => setDialog((d) => ({ ...d, open: false }));

  function handleSubmit(values) {
    if (dialog.mode === "edit") {
      // description tidak ada di modal, jadi dipertahankan lewat spread
      setList((l) => l.map((it) => (it.id === dialog.item.id ? { ...it, ...values } : it)));
      showToast({ message: "Pengalaman kerja diperbarui." });
    } else {
      const id = `exp-new-${++counter.current}`;
      setList((l) => [{ id, description: "", ...values }, ...l]);
      showToast({ message: "Pengalaman kerja ditambahkan." });
    }
    // TODO (backend): simpan ke Supabase, atau ke draf profil bila memakai tombol "Simpan Perubahan" di bawah halaman.
    close();
  }

  function removeItem(exp) {
    const index = list.findIndex((i) => i.id === exp.id);
    setList((l) => l.filter((i) => i.id !== exp.id));
    // Hapus langsung, tapi beri kesempatan membatalkan.
    showToast({
      message: `Pengalaman di ${exp.company} dihapus.`,
      action: {
        label: "Urungkan",
        onClick: () =>
          setList((l) => {
            const next = [...l];
            next.splice(Math.min(index, next.length), 0, exp);
            return next;
          }),
      },
    });
  }

  return (
    <div>
      <SectionCard
        id="pengalaman-title"
        title="Pengalaman Kerja"
        icon={Briefcase}
        action={<PillButton onClick={openAdd}>Tambah Pengalaman</PillButton>}
      >
        {list.length === 0 ? (
          <p className="text-sm text-ink/70">Belum ada pengalaman kerja yang ditambahkan.</p>
        ) : (
          <ul className="divide-y divide-line">
            {list.map((exp) => (
              <li key={exp.id} className="py-5 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-ink">{exp.role}</h3>
                  <ItemActions label={exp.role} onEdit={() => openEdit(exp)} onDelete={() => removeItem(exp)} />
                </div>
                <p className="mt-0.5 text-sm text-ink/70">
                  <span className="font-medium text-brand">{exp.company}</span>
                  <span className="mx-2 text-ink/30" aria-hidden="true">
                    •
                  </span>
                  {exp.period}
                </p>
                {exp.description && <p className="mt-2 text-sm text-ink">{exp.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <ExperienceDialog
        open={dialog.open}
        mode={dialog.mode}
        initial={dialog.item}
        onClose={close}
        onSubmit={handleSubmit}
        onDelete={() => {
          removeItem(dialog.item);
          close();
        }}
      />
    </div>
  );
}