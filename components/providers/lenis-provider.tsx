"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useDesktopExperience } from "@/lib/performance";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const { enableEnhancedMotion, isDesktop } = useDesktopExperience();

  useEffect(() => {
    if (!enableEnhancedMotion || !isDesktop) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: false,
      touchMultiplier: 1
    });
    let frame = 0;

    const update = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [enableEnhancedMotion, isDesktop]);

  return <>{children}</>;
}
