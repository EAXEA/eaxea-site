"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const STATEMENT =
  "Standart ajans işi yapmam. Tasarım, kod ve hareketi tek bir sinematik dilde birleştiririm: hızlı, okunaklı ve hatırda kalan deneyimler.";

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
        // 0.4 keeps the faint→bright scrub effect while clearing the 3:1
        // large-text contrast threshold even at the dimmest (initial) state.
        { opacity: 0.4 },
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
