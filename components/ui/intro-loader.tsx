"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAmbientAudio } from "@/components/providers/ambient-audio-provider";
import { AudioToggle } from "@/components/ui/audio-toggle";
import { SHARED_BLUR_DATA_URL } from "@/lib/performance";

export function IntroLoader({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(false);
  const { ready } = useAmbientAudio();

  useEffect(() => {
    const hasSeenLoader = window.sessionStorage.getItem("lufe-loader-seen") === "1";

    if (reducedMotion || hasSeenLoader) {
      setVisible(false);
      return;
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!entered) return;

    window.sessionStorage.setItem("lufe-loader-seen", "1");
    const timeout = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timeout);
  }, [entered]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(192,0,0,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_40%,rgba(0,0,0,0.9)_100%)]" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[140px]"
            animate={{ opacity: [0.16, 0.28, 0.16], scale: [0.96, 1.02, 1] }}
            transition={{ duration: 4.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="mb-8 text-[10px] uppercase tracking-[0.42em] text-white/38"
            >
              A cinematic tattoo experience
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                className="absolute inset-[32%_44%_22%_44%] rounded-full bg-accent/45 blur-xl"
                animate={{ opacity: [0.24, 0.88, 0.32], scaleY: [0.92, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <Image
                src="/images/brand/logo.jpeg"
                alt="LUFE ART TATTOO logo"
                width={280}
                height={280}
                priority
                placeholder="blur"
                blurDataURL={SHARED_BLUR_DATA_URL}
                className="relative z-10 h-auto w-[210px] sm:w-[260px]"
              />
              <motion.div
                className="absolute left-1/2 top-[76%] h-11 w-4 -translate-x-1/2 rounded-b-full rounded-t-[42%] bg-gradient-to-b from-accent via-accent to-accent-dark"
                initial={{ opacity: 0, y: -8, scaleY: 0.75 }}
                animate={{ opacity: [0, 1, 0.8], y: [0, 12, 18], scaleY: [0.75, 1, 1] }}
                transition={{ duration: 1.55, delay: 0.65, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="mt-10 font-[var(--font-display)] text-4xl text-white sm:text-5xl"
            >
              ENTER LUFE ART TATTOO
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-4 max-w-xl text-sm leading-7 text-white/56"
            >
              Darkness, identity and permanence. Enter slowly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.85 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => setEntered(true)}
                className="rounded-full border border-accent/40 bg-accent/[0.12] px-8 py-4 text-xs uppercase tracking-[0.34em] text-white transition hover:bg-accent/[0.2]"
              >
                Enter
              </button>
              <AudioToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-10 flex gap-3"
            >
              {Array.from({ length: 7 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="h-1.5 w-1.5 rounded-full bg-white/50"
                  animate={{ opacity: [0.12, 0.7, 0.12], y: [0, -10, 0] }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.08,
                    repeat: Number.POSITIVE_INFINITY
                  }}
                />
              ))}
            </motion.div>

            <p className="mt-4 text-[10px] uppercase tracking-[0.32em] text-white/28">
              Ambient sound {ready ? "ready" : "optional"}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
