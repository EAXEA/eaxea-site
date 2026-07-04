import Marquee from "@/components/motion/Marquee";

const items = [
  "Web Design",
  "Full-Stack",
  "Hızlı MVP",
  "Video & Film",
  "Motion",
  "Animasyon",
  "Next.js",
  "WebGL",
  "Brand",
];

export default function MarqueeStrip() {
  return (
    <section className="border-y border-line bg-bg-2 py-8 md:py-12">
      <Marquee items={items} duration={32} />
    </section>
  );
}
