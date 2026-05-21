"use client";

import { useDesktopExperience } from "@/lib/performance";
import { AmbientAudioProvider } from "@/components/providers/ambient-audio-provider";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { AudioToggle } from "@/components/ui/audio-toggle";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { IntroLoader } from "@/components/ui/intro-loader";
import { LenisProvider } from "@/components/providers/lenis-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { enableEnhancedMotion, finePointer, reducedMotion } = useDesktopExperience();

  return (
    <AmbientAudioProvider>
      <LenisProvider>
        <IntroLoader reducedMotion={reducedMotion} />
        <CustomCursor enabled={enableEnhancedMotion && finePointer} />
        <AmbientBackground reducedMotion={reducedMotion} />
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[95] hidden justify-end px-5 py-5 sm:flex lg:px-8">
          <div className="pointer-events-auto">
            <AudioToggle compact />
          </div>
        </div>
        {children}
      </LenisProvider>
    </AmbientAudioProvider>
  );
}
