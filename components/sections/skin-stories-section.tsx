import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skinStories } from "@/lib/site-data";

export function SkinStoriesSection() {
  return (
    <section
      id="skin-stories"
      className="section-space relative z-10 fracture-border [content-visibility:auto] [contain-intrinsic-size:1px_900px]"
    >
      <div className="container-shell space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow="Skin Stories"
            title="La tinta cambia cuando guarda una historia real."
            description="LUFE ART TATTOO no produce imagenes vacias. Cada pieza nace de simbolos, quiebres, afectos y decisiones que merecen quedarse."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {skinStories.map((story, index) => (
            <Reveal key={story.title} delay={index * 0.05}>
              <article className="glass-panel rounded-[2rem] p-6 sm:p-7">
                <p className="text-[10px] uppercase tracking-[0.34em] text-white/35">Story</p>
                <h3 className="mt-4 font-[var(--font-display)] text-4xl text-white">
                  {story.title}
                </h3>
                <p className="mt-5 font-[var(--font-display)] text-2xl leading-tight text-white/84">
                  {story.meaning}
                </p>
                <p className="mt-6 text-sm leading-7 text-white/58">{story.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
