"use client";

import { useEffect, useRef, useState } from "react";
import {
  DECODE_PHRASES,
  HEADLINE_TIMING,
  HOLD_AFTER_LOCK_MS,
  countNonSpace,
  flattenLines,
  prefersReducedMotion,
  type PhraseLines,
} from "@/lib/scramble";
import {
  paintPhrase,
  runLineTransition,
  type TransitionHandle,
} from "./scrambleRender";
import { ScrambleLink } from "./ScrambleLink";

const NAV = [
  { label: "Work", href: "/dashboard" },
  { label: "Index", href: "/search" },
  { label: "Notes", href: "#decode" },
  { label: "Contact", href: "#footer" },
] as const;

export function DecodePoster() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const handleRef = useRef<TransitionHandle | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phraseIndexRef = useRef(0);
  const reducedRef = useRef(false);
  const pausedRef = useRef(false);
  const runningRef = useRef(false);

  const [status, setStatus] = useState({ resolved: 0, total: 0, locked: false });
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion();
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!line1 || !line2) return;

    const lineEls: [HTMLElement, HTMLElement] = [line1, line2];
    const first = DECODE_PHRASES[0];
    const firstTotal = countNonSpace(flattenLines(first));

    if (reducedRef.current) {
      paintPhrase(lineEls, first);
      setStatus({ resolved: firstTotal, total: firstTotal, locked: true });
      setPhraseIndex(0);
      return;
    }

    let generation = 0;

    const clearHold = () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    };

    const goTo = (index: number, from: PhraseLines) => {
      if (pausedRef.current || reducedRef.current) return;
      runningRef.current = true;
      handleRef.current?.cancel();
      clearHold();
      const gen = ++generation;

      const to = DECODE_PHRASES[index];
      phraseIndexRef.current = index;
      setPhraseIndex(index);

      const handle = runLineTransition(
        lineEls,
        from,
        to,
        HEADLINE_TIMING,
        (resolved, total, locked) => {
          if (gen !== generation) return;
          setStatus({ resolved, total, locked });
        }
      );
      handleRef.current = handle;

      void handle.done.then(() => {
        if (gen !== generation) return;
        runningRef.current = false;
        if (pausedRef.current || reducedRef.current) return;
        const total = countNonSpace(flattenLines(to));
        setStatus({ resolved: total, total, locked: true });

        holdTimerRef.current = setTimeout(() => {
          if (gen !== generation) return;
          if (pausedRef.current || reducedRef.current) return;
          const next = (index + 1) % DECODE_PHRASES.length;
          goTo(next, to);
        }, HOLD_AFTER_LOCK_MS);
      });
    };

    // Empty → phrase 1 on load
    const empty: PhraseLines = ["", ""];
    goTo(0, empty);

    const onVisibility = () => {
      if (document.hidden) {
        pausedRef.current = true;
        generation += 1;
        handleRef.current?.cancel();
        clearHold();
        const current = DECODE_PHRASES[phraseIndexRef.current];
        paintPhrase(lineEls, current);
        const total = countNonSpace(flattenLines(current));
        setStatus({ resolved: total, total, locked: true });
      } else {
        pausedRef.current = false;
        if (reducedRef.current) return;
        const current = DECODE_PHRASES[phraseIndexRef.current];
        paintPhrase(lineEls, current);
        clearHold();
        const resumeGen = generation;
        holdTimerRef.current = setTimeout(() => {
          if (resumeGen !== generation) return;
          if (pausedRef.current || reducedRef.current) return;
          const next = (phraseIndexRef.current + 1) % DECODE_PHRASES.length;
          goTo(next, current);
        }, HOLD_AFTER_LOCK_MS);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      generation += 1;
      handleRef.current?.cancel();
      clearHold();
    };
  }, []);

  return (
    <section
      id="decode"
      className="decode-poster"
      aria-label="Signal decode poster"
    >
      <header className="decode-poster__header">
        <span className="decode-poster__wordmark">decode/</span>
        <nav aria-label="Primary" className="decode-poster__nav">
          {NAV.map((item) => (
            <ScrambleLink
              key={item.label}
              href={item.href}
              label={item.label}
              className="decode-poster__link"
            />
          ))}
        </nav>
      </header>

      <main className="decode-poster__main">
        <span className="decode-poster__mark decode-poster__mark--tl" aria-hidden="true">
          +
        </span>
        <span className="decode-poster__mark decode-poster__mark--tr" aria-hidden="true">
          +
        </span>
        <span className="decode-poster__mark decode-poster__mark--bl" aria-hidden="true">
          +
        </span>
        <span className="decode-poster__mark decode-poster__mark--br" aria-hidden="true">
          +
        </span>

        <div className="decode-poster__content">
          <div className="decode-poster__label">
            <span className="decode-poster__beacon" aria-hidden="true" />
            <span>Transmission 04 / 07</span>
          </div>

          <h1 className="decode-poster__headline">
            <span className="sr-only">Ship the strange idea.</span>
            <span aria-hidden="true" className="decode-poster__lines">
              <span ref={line1Ref} className="decode-poster__line" />
              <span ref={line2Ref} className="decode-poster__line" />
            </span>
          </h1>

          <p className="decode-poster__lede">
            A tiny text effect for headlines and menus. Characters resolve left
            to right out of a cipher of glyphs, then hold.
          </p>
        </div>
      </main>

      <footer className="decode-poster__footer" aria-hidden="true">
        <span className="decode-poster__status">
          {status.locked ? "Locked " : "Decoding "}
          <span className="decode-poster__num">
            {status.locked ? status.total : status.resolved}/{status.total || "—"}
          </span>
        </span>
        <span className="decode-poster__counter">
          Phrase{" "}
          <span className="decode-poster__num">
            {phraseIndex + 1} / {DECODE_PHRASES.length}
          </span>
        </span>
      </footer>
    </section>
  );
}
