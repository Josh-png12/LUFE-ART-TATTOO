"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useDesktopExperience, SHARED_BLUR_DATA_URL, useInViewport } from "@/lib/performance";
import { AudioToggle } from "@/components/ui/audio-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig, tattooPieces } from "@/lib/site-data";

const DesktopLogoScene = dynamic(
  () => import("@/components/three/desktop-logo-scene").then((mod) => mod.DesktopLogoScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[430px] w-full items-center justify-center">
        <Image
          src="/images/brand/logo.jpeg"
          alt="LUFE ART TATTOO logo"
          width={280}
          height={280}
          quality={82}
          placeholder="blur"
          blurDataURL={SHARED_BLUR_DATA_URL}
          className="h-auto w-full max-w-[220px]"
        />
      </div>
    )
  }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { enable3D, reducedMotion } = useDesktopExperience();
  const { targetRef, isInView } = useInViewport<HTMLDivElement>({ freezeOnceVisible: false });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const tone = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden fracture-border"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(192,0,0,0.12),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.92))]"
          style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.9, 1]) }}
        />
        <motion.div
          className="absolute inset-0 opacity-40 will-change-transform"
          animate={reducedMotion ? { scale: 1 } : { scale: [1, 1.03, 1], x: [0, 8, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Image
            src={tattooPieces[0].src}
            alt=""
            fill
            priority
            placeholder="blur"
            blurDataURL={SHARED_BLUR_DATA_URL}
            quality={72}
            sizes="100vw"
            className="object-cover object-center opacity-24"
          />
        </motion.div>
        <motion.div
          className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-accent/[0.1] blur-[120px]"
          animate={reducedMotion ? undefined : { x: [0, 18, 0], opacity: [0.22, 0.34, 0.22] }}
          transition={{ duration: 13, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[10%] top-[12%] hidden h-32 w-32 rounded-full bg-white/[0.06] blur-[110px] md:block"
          animate={reducedMotion ? undefined : { y: [0, 12, 0], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/42 to-black" />
      </div>

      <div className="container-shell relative z-10 flex min-h-screen flex-col justify-between py-6">
        <header className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <Image
              src="/images/brand/logo.jpeg"
              alt="LUFE ART TATTOO"
              width={48}
              height={48}
              quality={80}
              placeholder="blur"
              blurDataURL={SHARED_BLUR_DATA_URL}
              className="h-12 w-12 rounded-full border border-white/10 bg-black/60 object-cover p-1"
            />
            <div>
              <p className="font-[var(--font-display)] text-xl tracking-[0.2em] text-white">
                LUFE ART TATTOO
              </p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
                Riohacha, Colombia
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <AudioToggle compact />
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-xs uppercase tracking-[0.28em] text-white/70 transition hover:border-accent/40 hover:text-white"
            >
              WhatsApp Directo
            </a>
          </div>
        </header>

        <div className="grid items-center gap-12 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
          <div className="max-w-2xl space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
              className="text-xs uppercase tracking-[0.42em] text-white/45"
            >
              Luxury tattoo direction / underground editorial atmosphere
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-display)] text-[3.8rem] leading-[0.88] text-white sm:text-7xl lg:text-[6.8rem]"
            >
              El arte deja marcas.
              <span className="block text-white/78">Nosotros las hacemos eternas.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.72, duration: 0.68 }}
              className="max-w-xl text-base leading-8 text-white/62 sm:text-lg"
            >
              Una experiencia de estudio construida como una identidad visual: oscura,
              precisa, emocional y controlada. Tinta como permanencia, no como decoracion.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.82, duration: 0.66 }}
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            >
              <MagneticButton href="#booking">Reservar sesion</MagneticButton>
              <MagneticButton href="#portfolio" variant="ghost">
                Explorar portfolio
              </MagneticButton>
              <MagneticButton href={siteConfig.instagramUrl} variant="ghost" external>
                Instagram
              </MagneticButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.92, duration: 0.7 }}
              className="fracture-border max-w-lg pb-6 pt-2"
            >
              <p className="font-[var(--font-display)] text-2xl leading-tight text-white/84">
                A premium tattoo studio shaped like an artistic identity.
              </p>
            </motion.div>
          </div>

          <div ref={targetRef} className="relative">
            <motion.div
              className="absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_center,rgba(192,0,0,0.18),transparent_56%)]"
              style={{ opacity: useTransform(scrollYProgress, [0, 1], [0.5, 0.82]) }}
            />
            <div className="glass-panel relative overflow-hidden rounded-[2.4rem] border-white/8 p-4 sm:p-6">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%,rgba(192,0,0,0.03)_100%)]" />
              {enable3D && isInView ? (
                <div className="min-h-[430px]">
                  <DesktopLogoScene active={isInView} tone={tone} />
                </div>
              ) : (
                <div className="relative">
                  <motion.div
                    animate={reducedMotion ? undefined : { y: [0, -6, 0], rotate: [0, 0.7, 0] }}
                    transition={{ duration: 8.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="mx-auto max-w-[290px] will-change-transform"
                  >
                    <Image
                      src="/images/brand/logo.jpeg"
                      alt="LUFE ART TATTOO logo"
                      width={600}
                      height={600}
                      priority
                      quality={84}
                      placeholder="blur"
                      blurDataURL={SHARED_BLUR_DATA_URL}
                      className="h-auto w-full"
                    />
                  </motion.div>
                </div>
              )}
              <div className="fracture-border mt-5 flex items-center justify-between pb-1 pt-6 text-xs uppercase tracking-[0.28em] text-white/38">
                <span>Dark Luxury Craft</span>
                <span>Custom Identity Work</span>
              </div>
            </div>
          </div>
        </div>

        <motion.a
          href="#selected-works"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.95, duration: 0.8 }}
          className="mx-auto mb-2 flex w-fit flex-col items-center gap-2 text-white/45 transition hover:text-white/75"
        >
          <span className="text-[10px] uppercase tracking-[0.42em]">Descend</span>
          <motion.span
            animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
            className="rounded-full border border-white/15 p-2 will-change-transform"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
