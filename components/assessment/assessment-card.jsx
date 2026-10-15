import { StepIndicator } from "@/components/assessment/step-indicator";

/** Kartu putih berisi indikator langkah, judul, deskripsi, dan isi form. */
export function AssessmentCard({ step, title, description, children }) {
  return (
    <section className="rounded-[22px] border border-black/5 bg-white px-5 py-8 shadow-sm sm:px-11 sm:py-11">
      {step ? <StepIndicator current={step} /> : null}
      <h1 className="text-[26px] font-bold leading-tight tracking-tight text-brand sm:text-[31px]">{title}</h1>
      {description ? <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{description}</p> : null}
      <hr className="my-6 border-black/10" />
      {children}
    </section>
  );
}
