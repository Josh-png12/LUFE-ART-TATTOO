"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import type { TattooPiece } from "@/lib/site-data";
import { SHARED_BLUR_DATA_URL } from "@/lib/performance";

type GalleryModalProps = {
  piece: TattooPiece | null;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
};

export function GalleryModal({ piece, onClose, onNext, onPrevious }: GalleryModalProps) {
  useEffect(() => {
    if (!piece) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && onNext) onNext();
      if (event.key === "ArrowLeft" && onPrevious) onPrevious();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious, piece]);

  return (
    <AnimatePresence>
      {piece ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-panel relative grid max-w-5xl gap-6 overflow-hidden rounded-[2rem] p-4 md:grid-cols-[1.15fr_0.85fr] md:p-6"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 p-2 text-white/70 transition hover:text-white"
              aria-label="Cerrar imagen"
            >
              <X className="h-4 w-4" />
            </button>
            {onPrevious ? (
              <button
                type="button"
                onClick={onPrevious}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 text-white/70 transition hover:text-white"
                aria-label="Ver pieza anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            ) : null}
            {onNext ? (
              <button
                type="button"
                onClick={onNext}
                className="absolute right-16 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 text-white/70 transition hover:text-white"
                aria-label="Ver siguiente pieza"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : null}
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] bg-white/5">
              <Image
                src={piece.src}
                alt={piece.alt}
                fill
                quality={78}
                placeholder="blur"
                blurDataURL={SHARED_BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-end gap-5 p-3 md:p-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-accent/80">{piece.category}</p>
                <h3 className="font-[var(--font-display)] text-4xl text-white">{piece.title}</h3>
                <p className="max-w-md text-sm leading-7 text-white/70">{piece.note}</p>
              </div>
              <div className="fracture-border pb-6">
                <p className="text-sm leading-7 text-white/55">
                  Cada pieza se trata como una composicion de autor: direccion artistica,
                  anatomia, contraste y permanencia emocional.
                </p>
              </div>
              <a
                href="https://wa.me/573003320209"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-3 rounded-full border border-accent/40 bg-accent/[0.12] px-5 py-3 text-xs uppercase tracking-[0.28em] text-white transition hover:bg-accent/[0.22]"
              >
                Reservar esta direccion
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
