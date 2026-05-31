"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

// Code-split the 3D bundle: it never ships to clients that won't render it.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/**
 * Decides between the live particle galaxy and a cheap CSS aurora fallback.
 * The fallback is always painted (instant, SEO-safe); the canvas mounts on
 * top only when the device is a non-coarse pointer and motion is allowed.
 */
export default function HeroBackground() {
  const [render3D, setRender3D] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(hover: none)").matches;
    const smallMem =
      typeof navigator !== "undefined" &&
      // @ts-expect-error deviceMemory is non-standard but useful
      typeof navigator.deviceMemory === "number" &&
      // @ts-expect-error
      navigator.deviceMemory <= 4;
    if (!prefersReducedMotion() && !coarse && !smallMem) {
      setRender3D(true);
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Aurora / nebula fallback — also the backdrop behind the canvas */}
      <div className="absolute inset-0 bg-bg" />
      <div
        className="absolute left-1/2 top-[42%] aspect-square w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[80px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,92,40,0.55), rgba(255,45,156,0.25) 45%, rgba(110,91,255,0.18) 70%, transparent 80%)",
        }}
      />
      <div
        className="absolute right-[10%] top-[20%] aspect-square w-[60vmin] rounded-full opacity-50 blur-[90px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(47,224,255,0.4), transparent 75%)",
        }}
      />

      {render3D && <HeroCanvas />}

      {/* vignette + bottom fade into the page */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,6,8,0.7)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
