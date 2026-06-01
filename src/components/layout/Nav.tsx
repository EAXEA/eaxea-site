"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 320 && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 transition-all duration-500 md:px-8",
            scrolled && "glass mt-2 rounded-full md:mx-4"
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors",
                    active
                      ? "text-fg"
                      : "text-muted hover:text-fg"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-2 rounded-full bg-fg px-5 py-2 text-sm font-medium text-[#0a0506] transition-colors hover:bg-ember"
            >
              Konuşalım
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            <span
              className={cn(
                "h-px w-6 bg-fg transition-all duration-300",
                open && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-fg transition-all duration-300",
                open && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay — inert when closed so it stays out of the tab order */}
      <div
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 transition-all duration-500 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex flex-col gap-2">
          {[{ label: "Ana sayfa", href: "/" }, ...site.nav].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display text-5xl uppercase text-fg transition-colors hover:text-ember"
              style={{
                transform: open ? "translateY(0)" : "translateY(20px)",
                opacity: open ? 1 : 0,
                transition: `all 0.5s var(--ease-out-expo) ${0.08 * i + 0.1}s`,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-12 font-mono text-xs uppercase tracking-widest text-muted">
          {site.email}
        </div>
      </div>
    </>
  );
}
