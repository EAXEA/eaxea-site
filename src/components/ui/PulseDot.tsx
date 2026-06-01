import { cn } from "@/lib/cn";

/** Pulsing ember availability dot. Decorative — used in the hero pill and the
 *  contact "müsaitlik" card. */
export default function PulseDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-2", className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-ember" />
    </span>
  );
}
