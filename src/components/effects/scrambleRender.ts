import {
  charAtTime,
  type CharState,
  type ScrambleTiming,
  type SlotPlan,
  type PhraseLines,
  planTransition,
} from "@/lib/scramble";

/**
 * Paint one line into `el` from CharState[] using only text nodes + .dud spans.
 * Never assigns HTML strings.
 */
export function paintLine(el: HTMLElement, states: CharState[]) {
  const frag = document.createDocumentFragment();
  let textBuf = "";

  const flushText = () => {
    if (!textBuf) return;
    frag.appendChild(document.createTextNode(textBuf));
    textBuf = "";
  };

  for (const s of states) {
    if (s.dud) {
      flushText();
      const span = document.createElement("span");
      span.className = "dud";
      span.textContent = s.char;
      frag.appendChild(span);
    } else {
      textBuf += s.char;
    }
  }
  flushText();

  while (el.firstChild) el.removeChild(el.firstChild);
  el.appendChild(frag);
}

export type TransitionHandle = {
  cancel: () => void;
  done: Promise<void>;
};

type GlyphRuntime = {
  glyph: string;
  lastAt: number;
};

/**
 * Animate from `from` → `to` into two line elements. Returns a cancelable handle.
 * Status callback receives resolved/total non-space counts for the *target* phrase.
 */
export function runLineTransition(
  lineEls: [HTMLElement, HTMLElement],
  from: PhraseLines,
  to: PhraseLines,
  timing: ScrambleTiming,
  onFrame?: (resolved: number, total: number, locked: boolean) => void
): TransitionHandle {
  const { slots, line1Len } = planTransition(from, to, timing);
  const runtimes: GlyphRuntime[] = slots.map(() => ({ glyph: "", lastAt: -Infinity }));
  const totalNonSpace = countTargetNonSpace(slots);
  let raf = 0;
  let cancelled = false;
  let resolveDone!: () => void;
  const done = new Promise<void>((r) => {
    resolveDone = r;
  });

  const t0 = performance.now();

  const tick = (now: number) => {
    if (cancelled) return;
    const t = now - t0;

    const line1: CharState[] = [];
    const line2: CharState[] = [];
    let resolved = 0;
    let allLocked = true;

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const rt = runtimes[i];
      const { state, glyph, lastGlyphAt } = charAtTime(
        slot,
        t,
        rt.lastAt,
        rt.glyph,
        timing.glyphInterval
      );
      rt.glyph = glyph;
      rt.lastAt = lastGlyphAt;

      if (i < line1Len) line1.push(state);
      else line2.push(state);

      if (t >= slot.end) {
        if (slot.to !== " ") resolved += 1;
      } else {
        allLocked = false;
        // still counting only completed non-spaces toward resolved
      }
    }

    // Trim line arrays to target lengths (pad empty with nothing — min-height holds layout)
    paintLine(lineEls[0], line1.slice(0, to[0].length));
    paintLine(lineEls[1], line2.slice(0, to[1].length));

    onFrame?.(resolved, totalNonSpace, allLocked);

    if (allLocked) {
      resolveDone();
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);

  return {
    cancel: () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      resolveDone();
    },
    done,
  };
}

function countTargetNonSpace(slots: SlotPlan[]) {
  let n = 0;
  for (const s of slots) {
    if (s.to !== " ") n += 1;
  }
  return n;
}

/** Instant static paint of a phrase (reduced motion / initial). */
export function paintPhrase(lineEls: [HTMLElement, HTMLElement], phrase: PhraseLines) {
  paintLine(lineEls[0], [...phrase[0]].map((c) => ({ char: c, dud: false })));
  paintLine(lineEls[1], [...phrase[1]].map((c) => ({ char: c, dud: false })));
}

/**
 * Single-line scramble (nav links): from text → same text.
 */
export function runTextScramble(
  el: HTMLElement,
  text: string,
  timing: ScrambleTiming
): TransitionHandle {
  const from: PhraseLines = [text, ""];
  const to: PhraseLines = [text, ""];
  // Reuse planner but only paint line 0 into el
  const { slots } = planTransition(from, to, timing);
  const runtimes: GlyphRuntime[] = slots.map(() => ({ glyph: "", lastAt: -Infinity }));
  let raf = 0;
  let cancelled = false;
  let resolveDone!: () => void;
  const done = new Promise<void>((r) => {
    resolveDone = r;
  });
  const t0 = performance.now();

  const tick = (now: number) => {
    if (cancelled) return;
    const t = now - t0;
    const states: CharState[] = [];
    let allLocked = true;

    for (let i = 0; i < text.length; i++) {
      const slot = slots[i];
      const rt = runtimes[i];
      const { state, glyph, lastGlyphAt } = charAtTime(
        slot,
        t,
        rt.lastAt,
        rt.glyph,
        timing.glyphInterval
      );
      rt.glyph = glyph;
      rt.lastAt = lastGlyphAt;
      states.push(state);
      if (t < slot.end) allLocked = false;
    }

    paintLine(el, states);

    if (allLocked) {
      resolveDone();
      return;
    }
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);

  return {
    cancel: () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      resolveDone();
    },
    done,
  };
}
