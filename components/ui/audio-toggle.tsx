"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAmbientAudio } from "@/components/providers/ambient-audio-provider";

export function AudioToggle({ compact = false }: { compact?: boolean }) {
  const { enabled, toggle } = useAmbientAudio();

  return (
    <button
      type="button"
      onClick={toggle}
      className={`group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] text-white/72 transition hover:border-accent/35 hover:text-white ${
        compact ? "px-4 py-2 text-[10px] uppercase tracking-[0.28em]" : "px-5 py-3 text-xs uppercase tracking-[0.3em]"
      }`}
      aria-pressed={enabled}
      aria-label={enabled ? "Desactivar sonido ambiental" : "Activar sonido ambiental"}
    >
      <motion.span
        animate={{ scale: enabled ? [1, 1.08, 1] : 1 }}
        transition={{ duration: 2.2, repeat: enabled ? Number.POSITIVE_INFINITY : 0 }}
        className="relative"
      >
        {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </motion.span>
      <span>{enabled ? "Ambient On" : "Ambient Off"}</span>
    </button>
  );
}
