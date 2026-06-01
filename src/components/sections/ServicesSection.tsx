import { services } from "@/data/services";
import Reveal from "@/components/motion/Reveal";
import AnimatedHeading from "@/components/motion/AnimatedHeading";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-5">[ Hizmetler ]</p>
          <AnimatedHeading
            as="h2"
            text="Üç şey, çok iyi."
            className="text-[clamp(2.2rem,6vw,4.5rem)] uppercase"
          />
        </div>
        <p className="max-w-sm text-muted">
          Fikirden lansmana kadar tek elden: tasarım dili, mühendislik ve
          hareket sistemi.
        </p>
      </div>

      <Reveal stagger className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.id}
            data-reveal-item
            className="group relative flex flex-col gap-6 bg-surface p-8 transition-colors duration-500 hover:bg-surface-2 md:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-faint">{s.index}</span>
              <span
                className="size-2.5 rounded-full transition-transform duration-500 group-hover:scale-150"
                style={{ background: s.accent }}
              />
            </div>

            <div>
              <h3 className="display text-2xl uppercase md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{s.tagline}</p>
            </div>

            <p className="text-sm leading-relaxed text-muted">
              {s.description}
            </p>

            <ul className="mt-auto flex flex-col gap-2 border-t border-line pt-5">
              {s.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 text-sm text-fg/80"
                >
                  <span
                    className="size-1 rounded-full"
                    style={{ background: s.accent }}
                  />
                  {d}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
