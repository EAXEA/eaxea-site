import Link from "next/link";
import type { CaseStudy } from "@/data/work";
import { cn } from "@/lib/cn";

/**
 * Selected-work row. Big editorial line that reveals an accent bar + meta on
 * hover. Used on the home preview and the /work index.
 */
export default function WorkCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative block border-t border-line py-8 transition-colors duration-500 hover:border-line-strong md:py-10"
      style={{ ["--accent" as string]: study.accent }}
    >
      {/* hover wash */}
      <span
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--accent) 10%, transparent), transparent 55%)",
        }}
      />
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-xs text-faint md:text-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1">
          <h3
            className={cn(
              "display text-[clamp(2rem,6vw,4.5rem)] uppercase leading-[0.95]",
              "text-fg transition-transform duration-500 md:group-hover:translate-x-3"
            )}
          >
            {study.title}
          </h3>
        </div>

        <div className="hidden flex-col items-end gap-1 text-right md:flex">
          <span className="text-sm text-muted">{study.category}</span>
          <span
            className="font-mono text-[0.65rem] uppercase tracking-widest"
            style={{ color: study.accent }}
          >
            {study.status}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
            {study.phase === "ongoing" ? "Devam ediyor" : "Tamamlandı"}
          </span>
        </div>

        <span
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:scale-110"
          style={{
            borderColor: "var(--accent)",
            color: "var(--accent)",
          }}
        >
          <span className="transition-transform duration-500 group-hover:rotate-45">
            ↗
          </span>
        </span>
      </div>

      {/* mobile meta + accent line */}
      <div className="mt-3 flex items-center gap-3 md:hidden">
        <span
          className="h-1.5 w-8 rounded-full"
          style={{ background: study.accent }}
        />
        <span className="text-xs text-muted">
          {study.category} · {study.status} ·{" "}
          {study.phase === "ongoing" ? "Devam ediyor" : "Tamamlandı"}
        </span>
      </div>
    </Link>
  );
}
