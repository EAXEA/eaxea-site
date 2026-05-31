import AnimatedHeading from "@/components/motion/AnimatedHeading";
import Reveal from "@/components/motion/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mx-auto max-w-[1400px] px-5 pb-12 pt-36 md:px-8 md:pb-20 md:pt-44">
      <p className="eyebrow mb-6">{eyebrow}</p>
      <AnimatedHeading
        as="h1"
        text={title}
        className="text-[clamp(2.8rem,10vw,8rem)] uppercase"
      />
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
