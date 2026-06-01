import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import IntroStatement from "@/components/sections/IntroStatement";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedWork from "@/components/sections/FeaturedWork";
import ProcessSection from "@/components/sections/ProcessSection";
import JsonLd from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <MarqueeStrip />
      <IntroStatement />
      <ServicesSection />
      <FeaturedWork />
      <ProcessSection />
    </>
  );
}
