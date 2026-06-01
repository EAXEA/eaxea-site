import Link from "next/link";
import type { ReactNode } from "react";
import Magnetic from "@/components/motion/Magnetic";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  arrow?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300";

const variants: Record<Variant, string> = {
  primary: "bg-ember text-[#0a0506] hover:bg-fg",
  ghost: "border border-line-strong text-fg hover:border-ember hover:text-ember",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
  arrow = true,
}: Props) {
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  const cls = cn(base, variants[variant], className);

  return (
    <Magnetic strength={0.3}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
