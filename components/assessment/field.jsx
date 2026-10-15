/** Label pertanyaan + penanda wajib/opsional + petunjuk + pesan error. */
export function Field({ label, htmlFor, required, optional, hint, error, children, as = "div" }) {
  const Wrapper = as;
  const Label = as === "fieldset" ? "legend" : "label";
  return (
    <Wrapper className="mb-6">
      <Label htmlFor={as === "fieldset" ? undefined : htmlFor} className="mb-3 block text-[15px] font-bold text-ink">
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
        {optional ? <span className="text-[13px] font-medium text-ink/60"> (opsional)</span> : null}
      </Label>
      {children}
      {hint ? <p className="mt-1.5 text-xs leading-relaxed text-ink/70">{hint}</p> : null}
      {error ? <p className="mt-1.5 text-xs font-semibold text-red-700" role="alert">{error}</p> : null}
    </Wrapper>
  );
}
