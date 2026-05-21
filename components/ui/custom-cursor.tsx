"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CustomCursor({ enabled = false }: { enabled?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 26, stiffness: 240, mass: 0.35 });
  const springY = useSpring(y, { damping: 26, stiffness: 240, mass: 0.35 });
  const frameRef = useRef<number | null>(null);
  const nextPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      nextPositionRef.current = { x: event.clientX - 10, y: event.clientY - 10 };

      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        x.set(nextPositionRef.current.x);
        y.set(nextPositionRef.current.y);
        frameRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [enabled, x, y]);

  useEffect(() => {
    if (!enabled) return;

    const handleOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      setHovered(Boolean(target?.closest("a, button, input, textarea, [data-cursor='active']")));
    };

    const handleOut = () => setHovered(false);

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-4 w-4 rounded-full border border-white/35 bg-white/[0.06] mix-blend-screen"
        style={{ x: springX, y: springY }}
        animate={{ scale: hovered ? 1.35 : 1, opacity: hovered ? 0.95 : 0.72 }}
        transition={{ duration: 0.22 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[89] h-10 w-10 rounded-full border border-accent/25 bg-accent/[0.08]"
        style={{ x: springX, y: springY }}
        animate={hovered ? { scale: 1.24, opacity: 0.9 } : { scale: [1, 1.08, 1], opacity: 0.62 }}
        transition={{ duration: hovered ? 0.24 : 2.8, repeat: hovered ? 0 : Number.POSITIVE_INFINITY }}
      />
    </>
  );
}
