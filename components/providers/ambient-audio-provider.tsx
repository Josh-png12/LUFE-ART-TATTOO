"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type AmbientAudioContextValue = {
  enabled: boolean;
  toggle: () => void;
  ready: boolean;
};

const AmbientAudioContext = createContext<AmbientAudioContextValue | null>(null);

export function AmbientAudioProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bassGainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    return () => {
      oscillatorRef.current?.stop();
      noiseSourceRef.current?.stop();
      contextRef.current?.close();
    };
  }, []);

  const initAudio = async () => {
    if (contextRef.current) return;

    const audioContext = new window.AudioContext();
    const mainGain = audioContext.createGain();
    const bassGain = audioContext.createGain();
    const lowPass = audioContext.createBiquadFilter();
    const roomFilter = audioContext.createBiquadFilter();
    const bassOscillator = audioContext.createOscillator();

    mainGain.gain.value = 0;
    bassGain.gain.value = 0;
    lowPass.type = "lowpass";
    lowPass.frequency.value = 620;
    roomFilter.type = "bandpass";
    roomFilter.frequency.value = 1800;
    roomFilter.Q.value = 0.4;

    bassOscillator.type = "triangle";
    bassOscillator.frequency.value = 44;

    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2.5, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;

    for (let index = 0; index < data.length; index += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.035 * white) / 1.035;
      data[index] = last * 0.55;
    }

    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    noiseSource.connect(lowPass);
    lowPass.connect(roomFilter);
    roomFilter.connect(mainGain);
    bassOscillator.connect(bassGain);
    mainGain.connect(audioContext.destination);
    bassGain.connect(audioContext.destination);

    bassOscillator.start();
    noiseSource.start();

    contextRef.current = audioContext;
    gainRef.current = mainGain;
    bassGainRef.current = bassGain;
    noiseSourceRef.current = noiseSource;
    oscillatorRef.current = bassOscillator;
    setReady(true);
  };

  const toggle = async () => {
    await initAudio();

    if (!contextRef.current || !gainRef.current || !bassGainRef.current) return;

    await contextRef.current.resume();
    const next = !enabled;
    const now = contextRef.current.currentTime;

    gainRef.current.gain.cancelScheduledValues(now);
    bassGainRef.current.gain.cancelScheduledValues(now);
    gainRef.current.gain.linearRampToValueAtTime(next ? 0.028 : 0, now + 1.1);
    bassGainRef.current.gain.linearRampToValueAtTime(next ? 0.012 : 0, now + 1.35);

    setEnabled(next);
  };

  const value = useMemo(
    () => ({
      enabled,
      toggle,
      ready
    }),
    [enabled, ready]
  );

  return <AmbientAudioContext.Provider value={value}>{children}</AmbientAudioContext.Provider>;
}

export function useAmbientAudio() {
  const context = useContext(AmbientAudioContext);

  if (!context) {
    throw new Error("useAmbientAudio must be used within AmbientAudioProvider.");
  }

  return context;
}
