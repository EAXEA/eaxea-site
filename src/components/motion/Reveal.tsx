"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** stagger children that carry [data-reveal-item] */
  stagger?: boolean;
  delay?: number;
  y?: number;
};

/**
 * Scroll-triggered reveal. Animates the element (or its [data-reveal-item]
 * children when `stagger`) from below + faded. No-ops under reduced motion;
 * content is visible by default so it degrades gracefully without JS.
 */
export default function Reveal({
  children,
  as,
  className,
  stagger = false,
  delay = 0,
  y = 28,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = as ?? "div";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const targets = stagger
        ? el.querySelectorAll<HTMLElement>("[data-reveal-item]")
        : [el];

      gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration: 1,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} data-reveal>
      {children}
    </Tag>
  );
}
