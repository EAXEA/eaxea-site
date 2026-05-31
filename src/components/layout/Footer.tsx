import Link from "next/link";
import { site } from "@/lib/site";
import { Spark } from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import AnimatedHeading from "@/components/motion/AnimatedHeading";
import Reveal from "@/components/motion/Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-2 pt-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* CTA */}
        <div className="flex flex-col gap-10 pb-20">
          <p className="eyebrow">Bir fikrin mi var?</p>
          <AnimatedHeading
            as="h2"
            text="Hadi sahneye çıkaralım."
            className="text-[clamp(2.5rem,8vw,7rem)]"
          />
          <Reveal>
            <Button href="/contact" className="text-base">
              Projeni anlat
            </Button>
          </Reveal>
        </div>

        <div className="hairline" />

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2 font-display text-xl font-bold">
              <Spark /> {site.name}
            </div>
            <p className="max-w-xs text-sm text-muted">{site.positioning}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ember">
              {site.availability}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Menü</p>
            {[{ label: "Ana sayfa", href: "/" }, ...site.nav].map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {i.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-1">Bağlan</p>
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hairline" />

        <div className="flex flex-col items-start justify-between gap-4 py-8 font-mono text-xs uppercase tracking-widest text-faint md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {site.name} · {site.founder}
          </span>
          <span>{site.location}</span>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="pointer-events-none select-none px-5 md:px-8">
        <div className="display w-full text-center text-[20vw] leading-none text-fg/[0.035]">
          {site.name}
        </div>
      </div>
    </footer>
  );
}
