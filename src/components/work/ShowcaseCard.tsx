"use client";

import Link from "next/link";
import type { CaseStudy } from "@/data/work";
import GradientCover from "@/components/work/GradientCover";
import { useShowcaseVideo } from "@/hooks/useShowcaseVideo";

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
  const { ref: videoRef, pausedByUser, controllable, toggle } = useShowcaseVideo(`/showcase/${study.slug}.webm`);

  return (
    <div className="group/card relative">
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
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${study.title} ekran önizlemesi`}
          />
        ) : (
          <GradientCover accent={study.accent} className="absolute inset-0" />
        )}
        {/* readability scrim */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-bg/25" />

        {/* index + status — desktop only (keeps the mobile album cover clean) */}
        <span className="absolute left-4 top-4 hidden font-mono text-xs text-white/70 md:block">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* desktop overlaid title. Sized for the 6-up strip at xl and the 3-up grid at md. */}
        <div className="absolute inset-x-0 bottom-0 hidden p-4 md:block">
          <span
            className="mb-3 inline-block rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest backdrop-blur"
            style={{
              color: study.accent,
              borderColor: "color-mix(in oklab, var(--accent) 50%, transparent)",
              background: "color-mix(in oklab, var(--accent) 12%, rgba(3,25,32,0.45))",
            }}
          >
            {study.status}
          </span>
          <h3 className="display text-[clamp(1.2rem,1.7vw,1.7rem)] uppercase leading-[0.95] text-fg">
            {study.title}
          </h3>
          <p className="mt-1.5 text-xs text-fg/65">{study.category}</p>
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
        <p className="mt-1 text-[0.65rem] text-muted">{study.status}</p>
      </div>
    </Link>
    {study.media && controllable && (
      <button
        type="button"
        onClick={toggle}
        aria-label={`${study.title} önizlemesi: ${pausedByUser ? "oynat" : "duraklat"}`}
        className="absolute right-2 top-2 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line bg-bg/70 px-3 text-[0.65rem] uppercase tracking-widest text-muted backdrop-blur transition-[opacity,color,border-color] hover:border-line-strong hover:text-fg md:opacity-0 md:group-hover/card:opacity-100 md:focus-visible:opacity-100 md:[.group\/card:focus-within_&]:opacity-100"
      >
        {pausedByUser ? "Oynat" : "Duraklat"}
      </button>
    )}
    </div>
  );
}
