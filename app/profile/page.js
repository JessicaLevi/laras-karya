import { CertificationSection } from "@/components/profile/certification-section";
import { ContactSection } from "@/components/profile/contact-section";
import { EducationSection } from "@/components/profile/education-section";
import { ExperienceSection } from "@/components/profile/experience-section";
import { LanguageSection } from "@/components/profile/language-section";
import { ProfileHeader } from "@/components/profile/profile-header";
import { SkillsSection } from "@/components/profile/skills-section";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { PROFILE } from "@/lib/profile-data";

export const metadata = { title: "Profil Saya" };

export default function ProfilePage() {
  const p = PROFILE;

  return (
    <main className="flex-1 bg-surface">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-10 xl:px-8">
      <ProfileHeader
        name={p.name}
        initials={p.initials}
        headline={p.headline}
        status={p.status}
        completeness={p.completeness}
      />

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <ExperienceSection items={p.experiences} />
          <EducationSection items={p.education} />
          <CertificationSection items={p.certifications} />
        </div>
        <div className="space-y-6">
          <ContactSection {...p.contact} />
          <SkillsSection skills={p.skills} />
          <LanguageSection items={p.languages} />
        </div>
      </div>

      <section
        aria-label="Simpan perubahan"
        className="mt-6 flex flex-col gap-4 rounded-3xl border border-line bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8"
      >
        <p className="text-lg font-semibold text-ink">Sudah selesai memperbarui profil?</p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-full border-brand bg-white px-6 text-sm font-semibold text-brand hover:bg-brand-light hover:text-brand"
          >
            Batal
          </Button>
          <Button type="button" className="h-12 rounded-full px-6 text-sm font-semibold">
            Simpan Perubahan
          </Button>
        </div>
      </section>
    </div>
    <Footer />
  </main>
);
}
