"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useDesktopExperience } from "@/lib/performance";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  external = false
}: MagneticButtonProps) {
  const { enableEnhancedMotion } = useDesktopExperience();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const x = useSpring(0, { stiffness: 180, damping: 16 });
  const y = useSpring(0, { stiffness: 180, damping: 16 });
  const frameRef = useRef<number | null>(null);

  return (
    <motion.div
      style={{
        x: enableEnhancedMotion ? x : 0,
        y: enableEnhancedMotion ? y : 0,
        rotateX: enableEnhancedMotion ? rotateX : 0,
        rotateY: enableEnhancedMotion ? rotateY : 0,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={(event) => {
        if (!enableEnhancedMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - bounds.left - bounds.width / 2;
        const offsetY = event.clientY - bounds.top - bounds.height / 2;

        if (frameRef.current !== null) return;

        frameRef.current = window.requestAnimationFrame(() => {
          x.set(offsetX * 0.07);
          y.set(offsetY * 0.07);
          rotateX.set(offsetY * -0.02);
          rotateY.set(offsetX * 0.02);
          frameRef.current = null;
        });
      }}
      onMouseLeave={() => {
        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
        x.set(0);
        y.set(0);
        rotateX.set(0);
        rotateY.set(0);
      }}
      className="inline-flex"
    >
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={cn(
          "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3 text-sm uppercase tracking-[0.28em] transition-colors will-change-transform",
          variant === "primary"
            ? "border border-accent/40 bg-accent/[0.14] text-white"
            : "border border-white/15 bg-white/[0.03] text-ink",
          className
        )}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-accent/10 via-white/10 to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="relative">{children}</span>
        <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
    </motion.div>
  );
}
