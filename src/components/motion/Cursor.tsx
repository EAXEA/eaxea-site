"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Custom trailing cursor (desktop, pointer-fine only). A small dot tracks the
 * pointer instantly; a larger ring eases behind it and expands over links,
 * buttons and anything tagged [data-cursor].
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const d = dot.current!;
    const r = ring.current!;
    const xTo = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      gsap.set(d, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const grow = () => gsap.to(r, { scale: 2.4, duration: 0.3, ease: "power3" });
    const shrink = () => gsap.to(r, { scale: 1, duration: 0.3, ease: "power3" });

    // Delegated on document (which survives client-side navigation) instead of
    // binding to a one-time querySelectorAll snapshot — so links/buttons added
    // on later routes still grow the ring. pointerover/out bubble; closest()
    // matches the interactive ancestor.
    const SELECTOR = "a, button, [data-cursor], input, textarea";
    const onOver = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest?.(SELECTOR)) grow();
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest?.(SELECTOR)) shrink();
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 1 });

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 size-9 rounded-full border border-ember/70 opacity-0 mix-blend-difference"
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-ember opacity-0"
      />
    </div>
  );
}
