import Reveal from "@/components/motion/Reveal";
import AnimatedHeading from "@/components/motion/AnimatedHeading";
import { processSteps } from "@/data/process";

export default function ProcessSection() {
  return (
    <section className="border-y border-line bg-bg-2">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <div className="mb-16">
          <p className="eyebrow mb-5">[ Süreç ]</p>
          <AnimatedHeading
            as="h2"
            text="Fikirden sahneye"
            className="text-[clamp(2.2rem,6vw,4.5rem)] uppercase"
          />
        </div>

        <Reveal stagger className="grid gap-10 md:grid-cols-4 md:gap-6">
          {processSteps.map((s) => (
            <div key={s.n} data-reveal-item className="flex flex-col gap-4">
              <span className="font-mono text-sm text-ember">{s.n}</span>
              <div className="hairline" />
              <h3 className="display text-2xl uppercase">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
