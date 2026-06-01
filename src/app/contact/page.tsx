import type { Metadata } from "next";
import { site } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import PulseDot from "@/components/ui/PulseDot";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bir proje fikrin mi var? Konuşalım.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="[ İletişim ]"
        title="Konuşalım"
        intro="Bir fikrin, bir markan ya da yarım kalmış bir projen mi var? Birkaç satır yaz, sahneye nasıl çıkaracağımızı birlikte düşünelim."
      />

      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 pb-32 md:grid-cols-12 md:px-8">
        <Reveal className="md:col-span-7">
          <ContactForm />
        </Reveal>

        <aside className="flex flex-col gap-10 md:col-span-5 md:border-l md:border-line md:pl-16">
          <Reveal>
            <p className="eyebrow mb-4">Direkt</p>
            <a
              href={`mailto:${site.email}`}
              className="display block text-2xl lowercase text-fg transition-colors hover:text-ember md:text-3xl"
            >
              {site.email}
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="eyebrow mb-4">Bağlan</p>
            <ul className="flex flex-col gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-line py-3 text-fg/90 transition-colors hover:text-ember"
                  >
                    <span>{s.label}</span>
                    <span className="text-muted transition-transform group-hover:translate-x-1">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <PulseDot />
                <span className="font-mono text-xs uppercase tracking-widest text-fg">
                  Müsaitlik
                </span>
              </div>
              <p className="mt-3 text-sm text-muted">{site.availability}</p>
              <p className="mt-1 text-sm text-muted">{site.location}</p>
              <p className="mt-3 border-t border-line pt-3 text-sm text-fg/80">
                {site.responseTime}
              </p>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
