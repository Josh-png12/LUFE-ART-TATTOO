import Image from "next/image";
import { SHARED_BLUR_DATA_URL } from "@/lib/performance";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section className="section-space relative z-10 fracture-border [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[2.3rem] p-5 sm:p-7">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(192,0,0,0.12),transparent_38%)]" />
            <div className="relative overflow-hidden rounded-[1.9rem] border border-white/8 bg-gradient-to-br from-white/[0.05] to-transparent p-8 sm:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_48%,rgba(192,0,0,0.08))]" />
              <div className="relative flex min-h-[480px] flex-col justify-between">
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
                      Artist Presence
                    </p>
                    <h3 className="font-[var(--font-display)] text-5xl text-white">
                      Direccion artistica
                    </h3>
                  </div>
                  <Image
                    src="/images/brand/logo.jpeg"
                    alt="LUFE ART TATTOO logo"
                    width={180}
                    height={180}
                    quality={78}
                    placeholder="blur"
                    blurDataURL={SHARED_BLUR_DATA_URL}
                    className="h-24 w-24 rounded-full border border-white/10 bg-black/40 p-2 opacity-90 sm:h-28 sm:w-28"
                  />
                </div>
                <div className="space-y-5">
                  <p className="font-[var(--font-display)] text-3xl leading-tight text-white/84 sm:text-4xl">
                    La piel no se ocupa. Se compone.
                  </p>
                  <p className="max-w-md text-sm leading-7 text-white/56">
                    Cada tatuaje se piensa como una imagen viva: flujo corporal, contraste,
                    permanencia visual y una atmosfera que no se desgasta cuando pasa el tiempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            eyebrow="About The Artist"
            title="Precision, oscuridad y una lectura clara sobre la piel."
            description="LUFE ART TATTOO trabaja cada proyecto como una pieza de autor. El objetivo no es llenar espacio sino construir identidad con ritmo, escala y permanencia emocional."
          />
          <div className="mt-8 grid gap-5 text-sm leading-7 text-white/65 sm:grid-cols-2">
            <div className="glass-panel rounded-[1.8rem] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">Precision</p>
              <p className="mt-4">
                Disenos adaptados a cuerpo, escala y tension visual para que la pieza respire
                incluso despues de los anos.
              </p>
            </div>
            <div className="glass-panel rounded-[1.8rem] p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">Custom Work</p>
              <p className="mt-4">
                Toda propuesta parte de una conversacion real: referencias, simbolos y una
                direccion artistica exclusiva para cada cliente.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#booking">Comenzar propuesta</MagneticButton>
            <MagneticButton href="#skin-stories" variant="ghost">
              Leer skin stories
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
