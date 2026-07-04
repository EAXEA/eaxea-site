import type { Metadata } from "next";
import { site } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import AnimatedHeading from "@/components/motion/AnimatedHeading";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import { Spark } from "@/components/ui/Logo";
import { capabilities, principles, productionCredits } from "@/data/studio";

export const metadata: Metadata = {
  title: "Stüdyo",
  description:
    "EAXEA — premium, motion-first dijital deneyimler üreten bağımsız bir creative development stüdyosu. Web design, full-stack, vibe coding ve video prodüksiyon.",
};

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ Stüdyo ]"
        title="Creative development"
        intro={site.description}
      />

      {/* Manifesto + visual */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-24 md:grid-cols-12 md:px-8 md:pb-32">
        <Reveal className="md:col-span-7">
          <p className="text-2xl leading-snug text-fg/90 md:text-3xl">
            Ben {site.founder}. Tasarımla kodun, sanatla mühendisliğin kesiştiği
            yerde çalışıyorum.{" "}
            <span className="text-muted">
              {site.name}, markaları dijital sahneye taşıyan bağımsız bir
              creative development pratiği. Fikirden çalışan, hızlı ve hatırda
              kalan ürünlere kadar tek elden ilerlerim.
            </span>
          </p>

          <div className="mt-12 flex flex-wrap gap-2">
            {capabilities.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-ember hover:text-fg"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.1}>
          <div className="glow-ring relative grid aspect-square place-items-center overflow-hidden rounded-3xl bg-surface">
            <div className="absolute inset-0 opacity-30">
              <div className="spark absolute -right-1/4 -top-1/4 size-2/3 rounded-full blur-3xl" />
            </div>
            <Spark className="size-24 opacity-90" />
            <span className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-widest text-muted">
              {site.location}
            </span>
          </div>
        </Reveal>
      </section>

      {/* Principles */}
      <section className="border-y border-line bg-bg-2">
        <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
          <div className="mb-16">
            <p className="eyebrow mb-5">[ İlkeler ]</p>
            <AnimatedHeading
              as="h2"
              text="Nasıl çalışırım"
              className="text-[clamp(2.2rem,6vw,4.5rem)] uppercase"
            />
          </div>
          <Reveal stagger className="grid gap-10 md:grid-cols-3 md:gap-8">
            {principles.map((p, i) => (
              <div key={i} data-reveal-item className="flex flex-col gap-4">
                <span className="font-mono text-sm text-ember">
                  0{i + 1}
                </span>
                <h3 className="display text-2xl uppercase">{p.t}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Production credits — proof behind the Video & Film service */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">[ Kamera arkası ]</p>
            <AnimatedHeading
              as="h2"
              text="Ekran geçmişi"
              className="text-[clamp(2.2rem,6vw,4.5rem)] uppercase"
            />
          </div>
          <p className="max-w-sm text-muted">
            {"Web'den önce kurgu masası vardı. Belgeselden HBO Max yapımına, kurumsal filmden teknik animasyona seçili prodüksiyon işleri."}
          </p>
        </div>

        <Reveal stagger className="flex flex-col">
          {productionCredits.map((c) => (
            <div
              key={c.title}
              data-reveal-item
              className="grid gap-2 border-t border-line py-6 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-mono text-xs text-faint md:col-span-1">
                {c.year}
              </span>
              <h3 className="display text-xl uppercase md:col-span-3 md:text-2xl">
                {c.title}
              </h3>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-magenta md:col-span-3">
                {c.tag}
              </span>
              <p className="text-sm leading-relaxed text-muted md:col-span-5">
                {c.note}
              </p>
            </div>
          ))}
          <div className="border-t border-line" />
        </Reveal>
      </section>

      <ServicesSection />
      <ProcessSection />
    </>
  );
}
