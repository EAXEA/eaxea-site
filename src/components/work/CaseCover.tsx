"use client";

import { useEffect, useRef } from "react";
import type { CaseStudy } from "@/data/work";
import GradientCover from "@/components/work/GradientCover";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Case-page cover band. Works without media keep the plain branded gradient;
 * works with a real capture float the 9:16 product video on top of it like a
 * device frame. Autoplays muted + looping (same contract as ShowcaseCard),
 * stays on the poster under reduced motion.
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
    <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] md:aspect-[21/9]">
      <GradientCover
        accent={study.accent}
        label={`${study.category} · ${study.year}`}
        className="absolute inset-0"
      />
      <video
        ref={videoRef}
        className="absolute left-1/2 top-1/2 h-[84%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 object-cover shadow-2xl md:left-auto md:right-[7%] md:translate-x-0"
        style={{ aspectRatio: "9 / 16" }}
        poster={`/showcase/${study.slug}.webp`}
        src={`/showcase/${study.slug}.webm`}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
