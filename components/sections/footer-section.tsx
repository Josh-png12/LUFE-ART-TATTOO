import Image from "next/image";
import { SHARED_BLUR_DATA_URL } from "@/lib/performance";
import { siteConfig } from "@/lib/site-data";

export function FooterSection() {
  return (
    <footer className="relative z-10 [content-visibility:auto] [contain-intrinsic-size:1px_520px]">
      <div className="container-shell py-12 sm:py-16">
        <div className="glass-panel relative overflow-hidden rounded-[2.6rem] px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(192,0,0,0.16),transparent_28%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.04),transparent_18%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <Image
                  src="/images/brand/logo.jpeg"
                  alt="LUFE ART TATTOO"
                  width={72}
                  height={72}
                  quality={78}
                  placeholder="blur"
                  blurDataURL={SHARED_BLUR_DATA_URL}
                  className="h-16 w-16 rounded-full border border-white/10 bg-black/60 p-1 sm:h-20 sm:w-20"
                />
                <div>
                  <p className="font-[var(--font-display)] text-3xl text-white sm:text-4xl">
                    LUFE ART TATTOO
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/38">
                    Premium Tattoo Studio
                  </p>
                </div>
              </div>
              <p className="font-[var(--font-display)] text-4xl leading-none text-white sm:text-6xl lg:text-7xl">
                La piel tambien recuerda.
              </p>
              <p className="max-w-xl text-sm leading-7 text-white/58">
                Riohacha, Colombia. Piezas custom, blackwork, fine line, anime y realismo con
                enfoque de lujo, direccion artistica y permanencia visual.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-white/58 sm:max-w-md sm:justify-self-end">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                className="transition hover:text-white"
              >
                WhatsApp: {siteConfig.whatsappDisplay}
              </a>
              <a href={siteConfig.instagramUrl} className="transition hover:text-white">
                Instagram: @lufeartattoo
              </a>
              <p>Disponible para clientes en Colombia e internacional.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
