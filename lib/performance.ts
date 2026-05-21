"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export const SHARED_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJScgeTE9JzAlJyB4Mj0nMTAwJScgeTI9JzEwMCUnPjxzdG9wIHN0b3AtY29sb3I9JyMwYjBiMGInLz48c3RvcCBvZmZzZXQ9JTEwMCUnIHN0b3AtY29sb3I9JyMxNTE1MTUnLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCBmaWxsPSd1cmwoI2cpJyB3aWR0aD0nNDAnIGhlaWdodD0nNDAnLz48L3N2Zz4=";

function subscribeMediaQuery(query: string, callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);

  return () => media.removeEventListener("change", callback);
}

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const update = () => setMatches(window.matchMedia(query).matches);
    let frame = 0;

    const schedule = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    const unsubscribe = subscribeMediaQuery(query, schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useDesktopExperience() {
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = usePrefersReducedMotion();

  return useMemo(
    () => ({
      isDesktop,
      finePointer,
      reducedMotion,
      enable3D: isDesktop && finePointer && !reducedMotion,
      enableEnhancedMotion: finePointer && !reducedMotion
    }),
    [finePointer, isDesktop, reducedMotion]
  );
}

export function usePageVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => setVisible(document.visibilityState !== "hidden");
    update();
    document.addEventListener("visibilitychange", update);

    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return visible;
}

export function useInViewport<T extends Element>(
  options?: IntersectionObserverInit & { freezeOnceVisible?: boolean }
) {
  const targetRef = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const freeze = options?.freezeOnceVisible && isInView;
  const root = options?.root ?? null;
  const rootMargin = options?.rootMargin ?? "0px 0px -10% 0px";
  const threshold = options?.threshold ?? 0.2;

  useEffect(() => {
    if (freeze || !targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold
      }
    );

    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [freeze, root, rootMargin, threshold]);

  return { targetRef, isInView };
}
