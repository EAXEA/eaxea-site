"use client";

import { useRef } from "react";
import HeroBackground from "@/components/three/HeroBackground";
import Button from "@/components/ui/Button";
import PulseDot from "@/components/ui/PulseDot";
import { site } from "@/lib/site";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Intro: lines rise in sequence.
      gsap.from("[data-hero-line] > span", {
        yPercent: 120,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from("[data-hero-fade]", {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.7,
      });

      // Parallax the copy out as you scroll past the hero.
      gsap.to("[data-hero-copy]", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-28 md:px-8"
    >
      <HeroBackground />

      <div
        data-hero-copy
        className="relative mx-auto w-full max-w-[1400px]"
      >
        <div
          data-hero-fade
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/40 px-4 py-2 backdrop-blur"
        >
          <PulseDot />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {site.availability}
          </span>
        </div>

        <h1 className="display text-[clamp(2.8rem,11vw,9.5rem)] uppercase">
          <span data-hero-line className="block overflow-hidden">
            <span className="block">Dijital</span>
          </span>
          <span data-hero-line className="block overflow-hidden">
            <span className="block gradient-text">deneyimler</span>
          </span>
          <span data-hero-line className="block overflow-hidden">
            <span className="block">tasarlarım.</span>
          </span>
        </h1>

        <p
          data-hero-fade
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {site.tagline}
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/work">Seçili işler</Button>
          <Button href="/contact" variant="ghost">
            Birlikte çalışalım
          </Button>
        </div>
      </div>

      {/* scroll cue */}
      <div
        data-hero-fade
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-faint">
          Kaydır
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-ember to-transparent" />
      </div>
    </section>
  );
}
