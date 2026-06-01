import { cn } from "@/lib/cn";

/**
 * Pure-CSS infinite marquee. Renders the items twice and translates -50%,
 * so the loop is seamless. `duration` in seconds; `reverse` flips direction.
 */
export default function Marquee({
  items,
  duration = 28,
  reverse = false,
  className,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const sequence = (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-10">
          <span className="display text-[clamp(2rem,7vw,5.5rem)] uppercase text-fg/90">
            {item}
          </span>
          <span className="spark size-3 rounded-full opacity-80" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn("relative flex overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "marquee-track flex w-max",
          reverse && "marquee-reverse"
        )}
        style={{ ["--duration" as string]: `${duration}s` }}
      >
        {sequence}
        {sequence}
      </div>
    </div>
  );
}
