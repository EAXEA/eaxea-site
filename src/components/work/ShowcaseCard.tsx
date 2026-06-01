"use client";

import Link from "next/link";
import { useRef } from "react";
import type { CaseStudy } from "@/data/work";

/**
 * Homepage showcase card. Credibility-first: the REAL product still (the loop's
 * own first frame) is the default poster; the motion preview only plays on
 * desktop hover. Touch devices keep the static poster (tap navigates). No global
 * autoplay — videos use preload="none" and load on hover.
 */
export default function ShowcaseCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const play = () => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  };
  const stop = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0; // snap back to the real-product poster frame
    }
  };

  return (
    <Link
      href={`/work/${study.slug}`}
      onMouseEnter={play}
      onMouseLeave={stop}
      className="group relative block overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-500 hover:border-line-strong"
      style={{ ["--accent" as string]: study.accent }}
    >
      {/* media: 9:16, poster = loop frame 0 (no jump on hover) */}
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          poster={`/showcase/${study.slug}.webp`}
          src={`/showcase/${study.slug}.webm`}
          muted
          loop
          playsInline
          preload="none"
        />
        {/* readability scrim */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

        {/* index */}
        <span className="absolute left-4 top-4 font-mono text-xs text-white/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* status pill */}
        <span
          className="absolute right-4 top-4 rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest backdrop-blur"
          style={{
            color: study.accent,
            borderColor: "color-mix(in oklab, var(--accent) 50%, transparent)",
            background: "color-mix(in oklab, var(--accent) 12%, rgba(0,0,0,0.35))",
          }}
        >
          {study.status}
        </span>

        {/* play affordance — fades out on hover */}
        <span className="pointer-events-none absolute right-4 bottom-4 grid size-10 place-items-center rounded-full border border-white/30 bg-black/30 text-white/90 backdrop-blur transition-opacity duration-300 group-hover:opacity-0 md:flex">
          <span aria-hidden>▶</span>
        </span>

        {/* title block */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="display text-[clamp(1.6rem,2.6vw,2.4rem)] uppercase leading-[0.95] text-white">
            {study.title}
          </h3>
          <p className="mt-1.5 text-sm text-white/65">{study.category}</p>
          {/* accent bar grows on hover */}
          <span
            className="mt-3 block h-[3px] w-10 origin-left rounded-full transition-transform duration-500 group-hover:scale-x-[2.4]"
            style={{ background: study.accent }}
          />
        </div>
      </div>
    </Link>
  );
}
