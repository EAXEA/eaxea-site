import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work, getCaseStudy, adjacentWork } from "@/data/work";
import { site } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";
import AnimatedHeading from "@/components/motion/AnimatedHeading";
import Button from "@/components/ui/Button";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: `${study.title} — ${site.name}`,
      description: study.summary,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const { next } = adjacentWork(slug);

  return (
    <article style={{ ["--accent" as string]: study.accent }}>
      {/* Hero */}
      <header className="relative overflow-hidden px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] opacity-30 blur-[100px]"
          style={{
            background: `radial-gradient(60% 60% at 50% 0%, ${study.accent}, transparent 70%)`,
          }}
        />
        <div className="mx-auto max-w-[1400px]">
          <Link
            href="/work"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <span aria-hidden>←</span> Tüm işler
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <p className="eyebrow">{study.category}</p>
            <span
              className="rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest"
              style={{
                borderColor: study.accent,
                color: study.accent,
              }}
            >
              {study.status}
            </span>
          </div>
          <AnimatedHeading
            as="h1"
            text={study.title}
            className="text-[clamp(3rem,12vw,10rem)] uppercase"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              {study.intro}
            </p>
          </Reveal>

          {study.url && (
            <Reveal delay={0.2} className="mt-10">
              <Button href={study.url} external>
                Siteyi ziyaret et
              </Button>
            </Reveal>
          )}
        </div>
      </header>

      {/* Meta grid */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal
          stagger
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          <Meta label="Müşteri" value={study.client} />
          <Meta label="Yıl" value={study.year} />
          <Meta label="Rol" value={study.role.join(", ")} />
          <Meta label="Stack" value={study.stack.join(" · ")} />
        </Reveal>
      </section>

      {/* Metrics */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <Reveal stagger className="grid grid-cols-3 gap-6">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              data-reveal-item
              className="flex flex-col gap-2 border-t border-line pt-5"
            >
              <span
                className="display text-[clamp(2rem,6vw,4rem)]"
                style={{ color: study.accent }}
              >
                {m.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {m.label}
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Body: challenge / approach / outcome */}
      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 pb-28 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5">[ Problem ]</p>
            <h2 className="display text-3xl uppercase">Zorluk</h2>
            <p className="mt-5 leading-relaxed text-muted">{study.challenge}</p>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:border-l md:border-line md:pl-16">
          <Reveal>
            <p className="eyebrow mb-5">[ Çözüm ]</p>
            <h2 className="display text-3xl uppercase">Yaklaşım</h2>
          </Reveal>
          <Reveal stagger className="mt-8 flex flex-col">
            {study.approach.map((a, i) => (
              <div
                key={i}
                data-reveal-item
                className="flex gap-5 border-t border-line py-5"
              >
                <span className="font-mono text-sm text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-fg/90">{a}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-12">
            <p className="eyebrow mb-5">[ Sonuç ]</p>
            <ul className="flex flex-col gap-3">
              {study.outcome.map((o) => (
                <li key={o} className="flex items-start gap-3 text-fg/90">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full"
                    style={{ background: study.accent }}
                  />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          className="group mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-16 md:px-8 md:py-24"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Sıradaki proje
          </span>
          <span className="display text-[clamp(2.5rem,8vw,6rem)] uppercase text-fg transition-colors group-hover:text-ember">
            {next.title}
          </span>
        </Link>
      </section>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div data-reveal-item className="bg-surface p-6 md:p-7">
      <p className="font-mono text-xs uppercase tracking-widest text-faint">
        {label}
      </p>
      <p className="mt-2 text-fg/90">{value}</p>
    </div>
  );
}
