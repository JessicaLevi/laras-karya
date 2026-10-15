  import Navbar from "@/components/landing/navbar";
  import Hero from "@/components/landing/hero";
  import { Questions, Jobs, CtaBanner } from "@/components/landing/sections";
  import Footer from "@/components/landing/footer";

  export default function LandingPage() {
    return (
      <>
        <Navbar />
        <main>
          <Hero />
          <Questions />
          <Jobs />
          <CtaBanner />
        </main>
        <Footer />
      </>
    );
  }