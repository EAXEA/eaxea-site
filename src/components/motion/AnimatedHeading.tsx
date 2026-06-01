"use client";

import { useRef } from "react";
import type { ElementType } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
};

/**
 * Word-by-word masked reveal for display headings. Each word sits in an
 * overflow-hidden line so it rises into view. Degrades to plain text.
 */
export default function AnimatedHeading({
  text,
  as,
  className,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = as ?? "h2";
  const words = text.split(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      gsap.from(el.querySelectorAll<HTMLElement>("[data-word]"), {
        yPercent: 115,
        duration: 1.05,
        delay,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={cn("display", className)}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <span data-word className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
