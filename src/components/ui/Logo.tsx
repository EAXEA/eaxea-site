import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/** Brand spark (asterisk) — echoes the cinematic reference mark. */
export function Spark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-block size-5 shrink-0",
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="spin-slow size-full">
        <defs>
          <linearGradient id="spark-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-ember)" />
            <stop offset="50%" stopColor="var(--color-magenta)" />
            <stop offset="100%" stopColor="var(--color-cyan)" />
          </linearGradient>
        </defs>
        <g stroke="url(#spark-g)" strokeWidth="2.2" strokeLinecap="round">
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" />
          <line x1="19.1" y1="4.9" x2="4.9" y2="19.1" />
        </g>
      </svg>
    </span>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight",
        className
      )}
    >
      <Spark className="transition-transform duration-500 group-hover:scale-110" />
      <span>{site.name}</span>
    </Link>
  );
}
