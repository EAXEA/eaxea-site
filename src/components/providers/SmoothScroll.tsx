"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scroll, synced to GSAP's ticker so ScrollTrigger and Lenis
 * share one rAF loop. Disabled entirely when the user prefers reduced motion.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      anchors: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalculate triggers once everything (fonts, images) settles.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener("load", refresh);
    };
  }, []);

  // On route change, jump to top and recompute triggers for the new page.
  // Use Lenis' own scrollTo so its internal position stays in sync (a raw
  // window.scrollTo would desync the smooth-scroll state).
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let target: HTMLElement | null = null;
      try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); } catch { /* Invalid fragments fall back to page start. */ }
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target ?? 0, { immediate: true });
      } else if (target) {
        target.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return <>{children}</>;
}
