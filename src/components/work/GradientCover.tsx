import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Branded gradient cover for works that don't have a real showcase still/video
 * yet. Derives its hue from the study accent so each project reads distinct,
 * then layers a violet glow + vignette to match the cinematic base. Used as the
 * ShowcaseCard media fallback and as the case-study hero cover. Purely
 * decorative — callers supply their own title/labels on top.
 */
export default function GradientCover({
  accent,
  label,
  title,
  className,
}: {
  accent: string;
  /** small mono label, bottom-left (e.g. category · year) */
  label?: string;
  /** faint oversized wordmark centered in the cover */
  title?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden={!title}
      className={cn("relative size-full overflow-hidden bg-bg", className)}
      style={{ ["--accent" as string]: accent } as CSSProperties}
    >
      {/* primary accent glow */}
      <div
        className="absolute -left-[10%] -top-[20%] aspect-square w-[80%] rounded-full opacity-70 blur-[70px]"
        style={{
          background: `radial-gradient(closest-side, ${accent}, transparent 70%)`,
        }}
      />
      {/* secondary violet glow for depth */}
      <div
        className="absolute -bottom-[25%] right-[-12%] aspect-square w-[65%] rounded-full opacity-45 blur-[80px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-violet), transparent 75%)",
        }}
      />
      {/* faint oversized wordmark */}
      {title && (
        <div className="absolute inset-0 grid place-items-center px-6">
          <span className="display select-none text-center text-[clamp(2rem,9vw,5.5rem)] uppercase leading-[0.9] text-fg/90">
            {title}
          </span>
        </div>
      )}
      {/* vignette to seat it on the dark page */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(6,6,8,0.65)_100%)]" />
      {label && (
        <span className="absolute bottom-4 left-4 font-mono text-[0.6rem] uppercase tracking-widest text-white/65">
          {label}
        </span>
      )}
    </div>
  );
}
