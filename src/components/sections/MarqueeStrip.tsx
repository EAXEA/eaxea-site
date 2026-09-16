import Marquee from "@/components/motion/Marquee";

const items = [
  "Landing Page",
  "Kurumsal Web",
  "Custom Code",
  "Next.js",
  "SEO",
  "Erişilebilirlik",
  "Performans",
  "Motion",
];

export default function MarqueeStrip() {
  return (
    <section className="border-y border-line bg-bg-2 py-8 md:py-12">
      <Marquee items={items} duration={32} />
    </section>
  );
}
