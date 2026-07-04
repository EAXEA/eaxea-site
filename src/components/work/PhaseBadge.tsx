import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/data/work";

/**
 * Completion-state chip that complements the free-form status badge:
 * "Devam ediyor" gets a pulsing ember dot, "Tamamlandı" a calm green one.
 */
export default function PhaseBadge({
  phase,
  className,
}: {
  phase: CaseStudy["phase"];
  className?: string;
}) {
  const ongoing = phase === "ongoing";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted",
        className
      )}
    >
      <span className="relative flex size-1.5">
        {ongoing && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-60" />
        )}
        <span
          className="relative inline-flex size-1.5 rounded-full"
          style={{ background: ongoing ? "var(--color-ember)" : "#34D399" }}
        />
      </span>
      {ongoing ? "Devam ediyor" : "Tamamlandı"}
    </span>
  );
}
