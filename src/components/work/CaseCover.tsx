"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CaseStudy } from "@/data/work";
import GradientCover from "@/components/work/GradientCover";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Case-page cover band. Three tiers:
 * - no media           -> plain branded gradient (unchanged)
 * - media only         -> blurred poster backdrop + floating 9:16 capture
 * - media + mediaWide  -> desktop/phone duo: framed desktop still on the left,
 *                         live portrait capture on the right (md and up)
 * Autoplays muted + looping (same contract as ShowcaseCard), stays on the
 * poster under reduced motion.
 */
export default function CaseCover({ study }: { study: CaseStudy }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || prefersReducedMotion()) return;
    v.play().catch(() => {});
  }, []);

  if (!study.media) {
    return (
      <div className="aspect-[21/9] w-full">
        <GradientCover
          accent={study.accent}
          label={`${study.category} · ${study.year}`}
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden bg-bg sm:aspect-[16/9] md:aspect-[21/9]"
      style={{ ["--accent" as string]: study.accent }}
    >
      {/* blurred poster backdrop — the work's own colors bleed into the band */}
      <Image
        src={`/showcase/${study.slug}.webp`}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="scale-110 object-cover blur-2xl brightness-[0.45]"
      />
      {/* accent tint + vignette to seat it on the dark page */}
      <div
        className="pointer-events-none absolute -left-[10%] -top-[20%] aspect-square w-[70%] rounded-full opacity-35 blur-[80px]"
        style={{
          background: `radial-gradient(closest-side, ${study.accent}, transparent 70%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(6,6,8,0.7)_100%)]" />

      {/* left: framed desktop still (duo works only, desktop viewports) */}
      {study.mediaWide && (
        <div className="absolute left-[4%] top-1/2 hidden w-[54%] -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 shadow-2xl md:block">
          <div className="flex h-7 items-center gap-1.5 bg-black/70 px-3">
            <span className="size-2 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-white/25" />
          </div>
          <Image
            src={`/showcase/${study.slug}-wide.webp`}
            alt={`${study.title} — masaüstü görünüm`}
            width={1280}
            height={800}
            className="block w-full"
          />
        </div>
      )}

      {/* right: live portrait capture */}
      <video
        ref={videoRef}
        className={
          study.mediaWide
            ? "absolute left-1/2 top-1/2 h-[84%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 object-cover shadow-2xl md:left-auto md:right-[5%] md:h-[76%] md:translate-x-0"
            : "absolute left-1/2 top-1/2 h-[84%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 object-cover shadow-2xl md:left-auto md:right-[7%] md:translate-x-0"
        }
        style={{ aspectRatio: "9 / 16" }}
        poster={`/showcase/${study.slug}.webp`}
        src={`/showcase/${study.slug}.webm`}
        muted
        loop
        playsInline
        preload="metadata"
      />

      <span className="absolute bottom-4 left-4 font-mono text-[0.6rem] uppercase tracking-widest text-white/65">
        {study.category} · {study.year}
      </span>
    </div>
  );
}
