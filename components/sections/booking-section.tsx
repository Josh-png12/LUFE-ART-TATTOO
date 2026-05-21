"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircleMore, Upload } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const steps = [
  {
    key: "style",
    label: "Tattoo style",
    options: ["Blackwork", "Fine Line", "Anime", "Realismo", "Custom"]
  },
  {
    key: "area",
    label: "Body area",
    options: ["Brazo", "Pierna", "Pecho", "Espalda", "Otro"]
  },
  {
    key: "size",
    label: "Approximate size",
    options: ["Pequeno", "Mediano", "Grande", "Media manga", "Pieza completa"]
  },
  {
    key: "reference",
    label: "Upload reference",
    options: []
  },
  {
    key: "details",
    label: "Additional details",
    options: []
  },
  {
    key: "contact",
    label: "WhatsApp contact",
    options: []
  }
] as const;

type FormState = {
  style: string;
  area: string;
  size: string;
  reference: string;
  referenceFileName: string;
  details: string;
  contact: string;
};

const initialState: FormState = {
  style: "Blackwork",
  area: "Brazo",
  size: "Mediano",
  reference: "",
  referenceFileName: "",
  details: "",
  contact: ""
};

export function BookingSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const current = steps[activeStep];

  const whatsappHref = useMemo(() => {
    const message = [
      "Hola LUFE ART TATTOO, quiero reservar una sesion.",
      `Estilo: ${form.style}`,
      `Zona del cuerpo: ${form.area}`,
      `Tamano aproximado: ${form.size}`,
      `Archivo de referencia: ${form.referenceFileName || "Sin archivo adjunto desde la web."}`,
      `Referencia: ${form.reference || "La compartire por WhatsApp."}`,
      `Detalles: ${form.details || "Por definir."}`,
      `Contacto: ${form.contact || "Responder a este numero."}`
    ].join("\n");

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [form]);

  return (
    <section
      id="booking"
      className="section-space relative z-10 [content-visibility:auto] [contain-intrinsic-size:1px_1200px]"
    >
      <div className="container-shell grid gap-10 xl:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Booking"
            title="Una reserva pensada como una entrada al proceso."
            description="No es un formulario frio. Es un brief cinematografico para ordenar la idea y llevarla a una conversacion real por WhatsApp."
          />
          <div className="mt-8 rounded-[1.8rem] border border-accent/20 bg-accent/[0.08] p-6 text-white/70 shadow-glow">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">WhatsApp</p>
            <p className="mt-3 font-[var(--font-display)] text-3xl text-white">
              {siteConfig.whatsappDisplay}
            </p>
            <p className="mt-3 max-w-md text-sm leading-7">
              Tu idea entra con contexto, direccion y tono. El mensaje abre listo para seguir la
              propuesta, validar agenda y preparar la sesion.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass-panel rounded-[2rem] p-5 sm:p-7">
            <div className="mb-6 flex flex-wrap gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.28em] transition",
                    activeStep === index
                      ? "border-accent/40 bg-accent/[0.12] text-white"
                      : "border-white/10 bg-white/[0.03] text-white/45 hover:text-white"
                  )}
                >
                  0{index + 1} {step.label}
                </button>
              ))}
            </div>

            <div className="rounded-[1.8rem] border border-white/8 bg-black/30 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Step 0{activeStep + 1}
                  </p>
                  <h3 className="mt-3 font-[var(--font-display)] text-3xl text-white">
                    {current.label}
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-black/30 p-3 text-white/60">
                  {current.key === "reference" ? (
                    <Upload className="h-4 w-4" />
                  ) : (
                    <MessageCircleMore className="h-4 w-4" />
                  )}
                </div>
              </div>

              {current.options.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {current.options.map((option) => {
                    const selected = form[current.key as keyof FormState] === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, [current.key]: option }))
                        }
                        className={cn(
                          "rounded-[1.2rem] border p-4 text-left text-sm transition",
                          selected
                            ? "border-accent/40 bg-accent/[0.12] text-white"
                            : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white"
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {current.key === "reference" ? (
                <div className="mt-6 space-y-4">
                  <label className="block text-sm text-white/65">
                    <span className="mb-3 block text-white/45">
                      Sube la referencia principal para tenerla lista y luego envia el archivo
                      completo por WhatsApp al abrir la conversacion.
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          referenceFileName: event.target.files?.[0]?.name ?? ""
                        }))
                      }
                      className="w-full rounded-[1.2rem] border border-dashed border-white/15 bg-white/[0.03] px-4 py-4 text-white/65 file:mr-4 file:rounded-full file:border-0 file:bg-accent/[0.16] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.24em] file:text-white"
                    />
                  </label>
                  <label className="block text-sm text-white/65">
                    <span className="mb-3 block text-white/45">
                      Comparte un enlace de Drive, Instagram, Pinterest o describe la referencia
                      que vas a enviar por WhatsApp.
                    </span>
                    <input
                      type="text"
                      value={form.reference}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, reference: event.target.value }))
                      }
                      placeholder="https://..."
                      className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-accent/35"
                    />
                  </label>
                </div>
              ) : null}

              {current.key === "details" ? (
                <div className="mt-6">
                  <label className="block text-sm text-white/65">
                    <span className="mb-3 block text-white/45">
                      Describe simbolos, atmosfera, energia, historia o cualquier direccion
                      creativa importante.
                    </span>
                    <textarea
                      value={form.details}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, details: event.target.value }))
                      }
                      rows={5}
                      placeholder="Quiero una pieza con..."
                      className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-accent/35"
                    />
                  </label>
                </div>
              ) : null}

              {current.key === "contact" ? (
                <div className="mt-6 space-y-5">
                  <label className="block text-sm text-white/65">
                    <span className="mb-3 block text-white/45">
                      Deja tu nombre o una nota para identificar la reserva cuando llegue el
                      mensaje.
                    </span>
                    <input
                      type="text"
                      value={form.contact}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, contact: event.target.value }))
                      }
                      placeholder="Nombre, horario ideal o ciudad"
                      className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-accent/35"
                    />
                  </label>

                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-white/62">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      Message Preview
                    </p>
                    <div className="mt-3 whitespace-pre-line">
                      {`Estilo: ${form.style}
Zona del cuerpo: ${form.area}
Tamano: ${form.size}
Archivo: ${form.referenceFileName || "Sin archivo adjunto desde la web."}
Referencia: ${form.reference || "La compartire por WhatsApp."}
Detalles: ${form.details || "Por definir."}
Contacto: ${form.contact || "Responder a este numero."}`}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-white/35">
                    {activeStep + 1} / {steps.length}
                  </div>
                  {activeStep === steps.length - 1 ? (
                    <p className="mt-3 font-[var(--font-display)] text-2xl text-white/84">
                      Your idea deserves permanence.
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-xs uppercase tracking-[0.28em] text-white/65 transition hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </button>
                  {activeStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/[0.14] px-5 py-3 text-xs uppercase tracking-[0.28em] text-white transition hover:bg-accent/[0.22]"
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/[0.14] px-5 py-3 text-xs uppercase tracking-[0.28em] text-white transition hover:bg-accent/[0.22]"
                    >
                      Confirmar por WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
