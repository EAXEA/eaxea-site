"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

type Options = {
  /** Scope selector text + auto-cleanup to this element's subtree. */
  scope?: RefObject<HTMLElement | null>;
  /** Re-run when any of these change. */
  deps?: unknown[];
};

/**
 * Minimal stand-in for @gsap/react's useGSAP: runs the callback inside a
 * gsap.context (scoped + auto-reverting all tweens/ScrollTriggers on cleanup).
 */
export function useGSAP(callback: () => void, options: Options = {}) {
  const { scope, deps = [] } = options;

  useEffect(() => {
    const ctx = gsap.context(callback, scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
