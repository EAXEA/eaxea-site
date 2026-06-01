"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const STATEMENT =
  "Standart ajans işi yapmam. Markaları bir dijital sahneye taşıyorum: tasarım, kod ve hareketin tek bir sinematik dile dönüştüğü, hızlı ve okunaklı deneyimler.";

/**
 * Scroll-scrubbed manifesto: words brighten from faint to full as the section
 * passes through the viewport. Plain bright text under reduced motion.
 */
export default function IntroStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const words = STATEMENT.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current!.querySelectorAll("[data-w]"),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 md:px-8 md:py-40">
      <p className="eyebrow mb-10">[ Yaklaşım ]</p>
      <div
        ref={ref}
        className="display max-w-5xl text-[clamp(1.7rem,4.2vw,3.4rem)] leading-[1.18] tracking-tight"
      >
        {words.map((w, i) => (
          <span key={i} data-w className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </div>
    </section>
  );
}
