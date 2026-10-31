import PublicShell from "@/components/layout/public-shell";
import Hero from "@/components/landing/hero";
import { Questions, Jobs, CtaBanner } from "@/components/landing/sections";

export default function LandingPage() {
  return (
    <PublicShell active="/">
      <main>
        <Hero />
        <Questions />
        <Jobs />
        <CtaBanner />
      </main>
    </PublicShell>
  );
}
