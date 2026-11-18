"use client";

import { useEffect, useRef } from "react";
import {
  HEADLINE_TIMING,
  HOLD_AFTER_LOCK_MS,
  prefersReducedMotion,
  type PhraseLines,
} from "@/lib/scramble";
import {
  paintPhrase,
  runLineTransition,
  type TransitionHandle,
} from "./scrambleRender";

const HERO_PHRASES: readonly PhraseLines[] = [
  ["African Metabolome", "Database."],
  ["Decode the", "signal map."],
  ["Spectra that", "hold still."],
  ["Ship the", "strange idea."],
] as const;

/**
 * Homepage hero headline: cycles phrases with the same cipher scramble
 * as the decode poster (monospace so glyphs never shift layout).
 */
export function HeroScrambleHeadline() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!line1 || !line2) return;

    const lineEls: [HTMLElement, HTMLElement] = [line1, line2];
    let generation = 0;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let handle: TransitionHandle | null = null;
    let paused = false;
    let phraseIndex = 0;
    const reduced = prefersReducedMotion();

    const clearHold = () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
    };

    if (reduced) {
      paintPhrase(lineEls, HERO_PHRASES[0]);
      return;
    }

    const goTo = (index: number, from: PhraseLines) => {
      if (paused) return;
      handle?.cancel();
      clearHold();
      const gen = ++generation;
      const to = HERO_PHRASES[index];
      phraseIndex = index;

      handle = runLineTransition(lineEls, from, to, HEADLINE_TIMING);
      void handle.done.then(() => {
        if (gen !== generation || paused) return;
        holdTimer = setTimeout(() => {
          if (gen !== generation || paused) return;
          goTo((index + 1) % HERO_PHRASES.length, to);
        }, HOLD_AFTER_LOCK_MS);
      });
    };

    goTo(0, ["", ""]);

    const onVisibility = () => {
      if (document.hidden) {
        paused = true;
        generation += 1;
        handle?.cancel();
        clearHold();
        paintPhrase(lineEls, HERO_PHRASES[phraseIndex]);
      } else {
        paused = false;
        const current = HERO_PHRASES[phraseIndex];
        paintPhrase(lineEls, current);
        clearHold();
        const resumeGen = generation;
        holdTimer = setTimeout(() => {
          if (resumeGen !== generation || paused) return;
          goTo((phraseIndex + 1) % HERO_PHRASES.length, current);
        }, HOLD_AFTER_LOCK_MS);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      generation += 1;
      handle?.cancel();
      clearHold();
    };
  }, []);

  return (
    <div className="relative">
      <h1
        className="
          font-mono
          text-[clamp(28px,5.5vw,52px)]
          font-[600]
          leading-[1.02]
          tracking-[-0.04em]
          text-black
          dark:text-gray-100
        "
      >
        <span className="sr-only">African Metabolome Database.</span>
        <span aria-hidden="true" className="block">
          <span
            ref={line1Ref}
            className="block min-h-[1.02em] whitespace-pre"
          />
          <span
            ref={line2Ref}
            className="block min-h-[1.02em] whitespace-pre text-[#9b9b9f] dark:text-gray-500 [&_.dud]:text-[#C8F031]"
          />
        </span>
      </h1>
      <div className="mt-4 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#75746C] dark:text-gray-500">
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 shrink-0 bg-[#C8F031] [animation:decode-beacon_1.1s_steps(1,end)_infinite] motion-reduce:animate-none"
        />
        Transmission 04 / 07
      </div>
    </div>
  );
}
