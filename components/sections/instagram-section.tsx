import { Instagram } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { instagramHighlights, siteConfig } from "@/lib/site-data";

export function InstagramSection() {
  return (
    <section className="section-space relative z-10 fracture-border [content-visibility:auto] [contain-intrinsic-size:1px_700px]">
      <div className="container-shell">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-[2.4rem] p-8 sm:p-10 lg:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(192,0,0,0.16),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_22%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <SectionHeading
                eyebrow="Instagram"
                title="Otra habitacion del universo LUFE."
                description="Detalles de sesion, atmosfera de estudio, nuevas piezas y fragmentos del proceso creativo presentados como una extension viva de la marca."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {instagramHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.6rem] border border-white/10 bg-black/30 p-5 text-sm text-white/66"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg text-sm leading-7 text-white/54">
                Entrar a Instagram no es solo ver un feed. Es seguir la continuidad visual del
                estudio en tiempo real.
              </p>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-4 rounded-full border border-white/12 bg-white/[0.04] px-6 py-4 text-xs uppercase tracking-[0.3em] text-white/72 transition hover:border-accent/35 hover:text-white"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 transition duration-500 group-hover:opacity-100" />
                <Instagram className="relative h-4 w-4" />
                <span className="relative">Entrar a Instagram</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
