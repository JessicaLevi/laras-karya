import Hero from "@/components/landing/hero";
import { Questions, Jobs, CtaBanner } from "@/components/landing/sections";
import Footer from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Questions />
      <Jobs />
      <CtaBanner />
      <Footer />
    </main>
  );
}