"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  portfolioCategories,
  tattooPieces,
  type PortfolioCategory,
  type TattooPiece
} from "@/lib/site-data";
import { SHARED_BLUR_DATA_URL } from "@/lib/performance";
import { cn } from "@/lib/utils";

const GalleryModal = dynamic(
  () => import("@/components/ui/gallery-modal").then((mod) => mod.GalleryModal),
  { ssr: false }
);

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("All");
  const [activePiece, setActivePiece] = useState<TattooPiece | null>(null);

  const visiblePieces = useMemo(() => {
    if (activeCategory === "All") return tattooPieces;
    return tattooPieces.filter((piece) => piece.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="portfolio"
      className="section-space relative z-10 [content-visibility:auto] [contain-intrinsic-size:1px_1200px]"
    >
      <div className="container-shell space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            title="El archivo completo de una identidad que ya se siente viva."
            description="Cada imagen se presenta con escala, silencio y tension editorial. Filtra por lenguaje artistico y entra en cada pieza como si fuera una sala propia."
          />
        </Reveal>

        <Reveal delay={0.08} className="flex flex-wrap gap-3">
          {portfolioCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em] transition",
                activeCategory === category
                  ? "border-accent/40 bg-accent/[0.12] text-white"
                  : "border-white/10 bg-white/[0.03] text-white/55 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </Reveal>

        <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
          {visiblePieces.map((piece, index) => (
            <Reveal key={piece.id} delay={index * 0.04} className="mb-5 break-inside-avoid">
              <motion.button
                type="button"
                onClick={() => setActivePiece(piece)}
                className="group glass-panel relative w-full overflow-hidden rounded-[1.8rem] text-left"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative min-h-[420px] overflow-hidden">
                  <Image
                    src={piece.src}
                    alt={piece.alt}
                    width={900}
                    height={1200}
                    quality={74}
                    placeholder="blur"
                    blurDataURL={SHARED_BLUR_DATA_URL}
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 30vw"
                    className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03] will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent opacity-85 transition duration-500 group-hover:opacity-95" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">{piece.category}</p>
                    <div className="mt-3 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-[var(--font-display)] text-3xl text-white">{piece.title}</h3>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-white/62">{piece.note}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-white/60">
                        View
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
      {activePiece ? (
        <GalleryModal
          piece={activePiece}
          onClose={() => setActivePiece(null)}
          onPrevious={() => {
            const index = visiblePieces.findIndex((piece) => piece.id === activePiece.id);
            setActivePiece(visiblePieces[(index - 1 + visiblePieces.length) % visiblePieces.length]);
          }}
          onNext={() => {
            const index = visiblePieces.findIndex((piece) => piece.id === activePiece.id);
            setActivePiece(visiblePieces[(index + 1) % visiblePieces.length]);
          }}
        />
      ) : null}
    </section>
  );
}
