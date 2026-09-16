"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Load and play only visible previews; respect motion/data preferences. */
export function useShowcaseVideo(src: string) {
  const ref = useRef<HTMLVideoElement>(null);
  // The user's pause lives in a ref as well as state: the observer effect reads
  // it without listing it as a dependency, so toggling no longer tears down and
  // rebuilds the IntersectionObserver on every click.
  const pausedByUserRef = useRef(false);
  const updateRef = useRef<() => void>(() => {});
  const [pausedByUser, setPausedByUser] = useState(false);
  // Under reduced motion or data saver nothing can play, so a pause control
  // would be a button that does nothing. Callers hide it instead.
  const [controllable, setControllable] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    let disposed = false;

    const blocked = () => motion.matches || connection?.saveData === true;
    const shouldPause = () =>
      disposed || !visible || document.hidden || blocked() || pausedByUserRef.current;

    const update = () => {
      setControllable(!blocked());
      if (shouldPause()) {
        video.pause();
        return;
      }
      if (!video.getAttribute("src")) video.src = src;
      void video
        .play()
        .then(() => {
          if (shouldPause()) video.pause();
        })
        .catch(() => {
          /* Poster remains visible if playback is unavailable. */
        });
    };
    updateRef.current = update;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.05 }
    );
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
  }, [src]);

  const toggle = useCallback(() => {
    pausedByUserRef.current = !pausedByUserRef.current;
    setPausedByUser(pausedByUserRef.current);
    updateRef.current();
  }, []);

  return { ref, pausedByUser, controllable, toggle };
}
