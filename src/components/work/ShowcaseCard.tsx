"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CaseStudy } from "@/data/work";
import GradientCover from "@/components/work/GradientCover";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Showcase card. The product capture autoplays (muted, looping) as soon as it
 * mounts — no play button, no hover gate. Honors reduced-motion (stays on the
 * poster). Layout: small square "album cover" with the title captioned below on
 * mobile; tall 9:16 card with the title overlaid on desktop.
 */
export default function ShowcaseCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || prefersReducedMotion()) return;
    // muted autoplay needs no user gesture; start as soon as the card mounts.
    v.play().catch(() => {});
  }, []);

  return (
    <Link
      href={`/work/${study.slug}`}
      className="group block"
      style={{ ["--accent" as string]: study.accent }}
    >
      {/* cover — square album-style on mobile, tall 9:16 on desktop */}
      <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-500 group-hover:border-line-strong md:aspect-[9/16] md:rounded-2xl">
        {study.media ? (
          <video
            ref={videoRef}
            className="absolute inset-0 size-full object-cover"
            poster={`/showcase/${study.slug}.webp`}
            src={`/showcase/${study.slug}.webm`}
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <GradientCover accent={study.accent} className="absolute inset-0" />
        )}
        {/* readability scrim */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

        {/* index + status — desktop only (keeps the mobile album cover clean) */}
        <span className="absolute left-4 top-4 hidden font-mono text-xs text-white/70 md:block">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="absolute right-4 top-4 hidden rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest backdrop-blur md:block"
          style={{
            color: study.accent,
            borderColor: "color-mix(in oklab, var(--accent) 50%, transparent)",
            background: "color-mix(in oklab, var(--accent) 12%, rgba(0,0,0,0.35))",
          }}
        >
          {study.status}
        </span>

        {/* desktop overlaid title */}
        <div className="absolute inset-x-0 bottom-0 hidden p-5 md:block">
          <h3 className="display text-[clamp(1.6rem,2.6vw,2.4rem)] uppercase leading-[0.95] text-white">
            {study.title}
          </h3>
          <p className="mt-1.5 text-sm text-white/65">{study.category}</p>
          <span
            className="mt-3 block h-[3px] w-10 origin-left rounded-full transition-transform duration-500 group-hover:scale-x-[2.4]"
            style={{ background: study.accent }}
          />
        </div>
      </div>

      {/* mobile caption — album-cover style */}
      <div className="mt-2 md:hidden">
        <h3 className="display text-xs uppercase leading-tight text-fg">
          {study.title}
        </h3>
        <p className="mt-0.5 truncate text-[0.65rem] text-muted">
          {study.category}
        </p>
      </div>
    </Link>
  );
}
