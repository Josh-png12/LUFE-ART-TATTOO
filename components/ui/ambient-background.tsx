"use client";

import { motion } from "framer-motion";

export function AmbientBackground({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute left-[-8%] top-[10%] h-[22rem] w-[22rem] rounded-full bg-accent/10 blur-[96px] will-change-transform"
        animate={
          reducedMotion ? { opacity: 0.45 } : { x: [0, 26, 0], y: [0, -14, 0], scale: [1, 1.04, 1] }
        }
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-8%] right-[-4%] hidden h-[18rem] w-[18rem] rounded-full bg-white/[0.05] blur-[88px] md:block will-change-transform"
        animate={
          reducedMotion ? { opacity: 0.3 } : { x: [0, -18, 0], y: [0, 12, 0], scale: [1, 0.98, 1] }
        }
        transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 top-[32%] mx-auto h-px w-[72%] bg-gradient-to-r from-transparent via-white/18 to-transparent"
        animate={reducedMotion ? { opacity: 0.12 } : { opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  );
}
