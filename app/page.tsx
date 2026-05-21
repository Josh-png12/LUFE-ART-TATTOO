import dynamic from "next/dynamic";
import { AboutSection } from "@/components/sections/about-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { SelectedWorksSection } from "@/components/sections/selected-works-section";
import { SkinStoriesSection } from "@/components/sections/skin-stories-section";
import { SectionHeading } from "@/components/ui/section-heading";

const PortfolioSection = dynamic(
  () => import("@/components/sections/portfolio-section").then((mod) => mod.PortfolioSection),
  {
    loading: () => (
      <section className="section-space relative z-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Portfolio"
            title="Cargando portafolio."
            description="Preparando la galeria editorial de LUFE ART TATTOO."
          />
        </div>
      </section>
    )
  }
);

const BookingSection = dynamic(
  () => import("@/components/sections/booking-section").then((mod) => mod.BookingSection)
);

const InstagramSection = dynamic(
  () => import("@/components/sections/instagram-section").then((mod) => mod.InstagramSection)
);

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <HeroSection />
      <SelectedWorksSection />
      <ProcessSection />
      <PortfolioSection />
      <AboutSection />
      <SkinStoriesSection />
      <BookingSection />
      <InstagramSection />
      <FooterSection />
    </main>
  );
}
