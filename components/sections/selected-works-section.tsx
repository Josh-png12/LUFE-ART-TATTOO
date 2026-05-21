"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { selectedWorks } from "@/lib/site-data";
import { SHARED_BLUR_DATA_URL } from "@/lib/performance";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function SelectedWorksSection() {
  return (
    <section
      id="selected-works"
      className="section-space relative z-10 fracture-border [content-visibility:auto] [contain-intrinsic-size:1px_1800px]"
    >
      <div className="container-shell space-y-14">
        <Reveal>
          <SectionHeading
            eyebrow="Selected Works"
            title="Piezas tratadas como imagenes de campana."
            description="Escala, silencio y direccion editorial. Una seleccion corta para sentir el peso visual del estudio antes de entrar al archivo completo."
          />
        </Reveal>

        <div className="space-y-16">
          {selectedWorks.map((piece, index) => (
            <Reveal key={piece.id} delay={index * 0.04}>
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`${index % 2 === 1 ? "lg:order-2" : ""} relative overflow-hidden rounded-[2.2rem] border border-white/8 bg-black/40`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(192,0,0,0.12),transparent_34%)]" />
                  <Image
                    src={piece.src}
                    alt={piece.alt}
                    width={1200}
                    height={1500}
                    quality={78}
                    placeholder="blur"
                    blurDataURL={SHARED_BLUR_DATA_URL}
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
                </motion.div>

                <div className={`${index % 2 === 1 ? "lg:order-1" : ""} space-y-6 px-1 lg:px-8`}>
                  <p className="text-[10px] uppercase tracking-[0.38em] text-white/35">
                    {piece.category} / {piece.location}
                  </p>
                  <h3 className="font-[var(--font-display)] text-5xl leading-none text-white sm:text-6xl">
                    {piece.title}
                  </h3>
                  <p className="max-w-lg text-base leading-8 text-white/62">{piece.note}</p>
                  <div className="fracture-border pb-6">
                    <p className="max-w-lg font-[var(--font-display)] text-2xl leading-tight text-white/84">
                      {piece.atmosphere}
                    </p>
                  </div>
                  <p className="max-w-md text-sm leading-7 text-white/48">
                    Cada selected work se presenta como una imagen central: presencia, tension,
                    contraste y memoria.
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
