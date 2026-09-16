"use client";

import { useEffect, useRef, useState } from "react";

/** Load and play only visible previews; respect motion/data preferences. */
export function useShowcaseVideo(src: string) {
  const ref = useRef<HTMLVideoElement>(null);
  const [pausedByUser, setPausedByUser] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    let disposed = false;
    const update = () => {
      if (disposed || !visible || document.hidden || motion.matches || connection?.saveData || pausedByUser) {
        video.pause();
        return;
      }
      if (!video.getAttribute("src")) video.src = src;
      void video.play().then(() => {
        if (disposed || !visible || document.hidden || motion.matches || pausedByUser) video.pause();
      }).catch(() => { /* Poster remains visible if playback is unavailable. */ });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.05 });
    observer.observe(video);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, [src, pausedByUser]);

  return { ref, pausedByUser, toggle: () => setPausedByUser((value) => !value) };
}
