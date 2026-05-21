import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/site-data";

export function ProcessSection() {
  return (
    <section className="section-space relative z-10 fracture-border [content-visibility:auto] [contain-intrinsic-size:1px_1200px]">
      <div className="container-shell space-y-14">
        <Reveal>
          <SectionHeading
            eyebrow="The Process"
            title="Every piece begins as an idea and becomes permanence."
            description="No es una linea de tiempo mecanica. Es un ritual de direccion visual, precision tecnica y memoria emocional."
          />
        </Reveal>

        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <Reveal key={step.index} delay={index * 0.06}>
              <div className="grid gap-6 rounded-[2rem] border border-white/8 bg-gradient-to-r from-white/[0.03] via-transparent to-accent/[0.03] px-6 py-8 md:grid-cols-[0.28fr_0.72fr] md:px-8 lg:px-12">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.38em] text-white/28">
                    {step.index}
                  </p>
                  <h3 className="font-[var(--font-display)] text-4xl text-white sm:text-5xl">
                    {step.title}
                  </h3>
                </div>
                <div className="grid gap-5 md:grid-cols-[0.5fr_0.5fr] md:items-end">
                  <p className="font-[var(--font-display)] text-2xl leading-tight text-white/88 sm:text-3xl">
                    {step.description}
                  </p>
                  <p className="max-w-xl text-sm leading-7 text-white/58">{step.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
