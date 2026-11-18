/** Glyph cipher used while characters are still resolving. */
export const SCRAMBLE_GLYPHS =
  "#%&*+=-_/\<>[]{}?!$@0123456789";

export type PhraseLines = readonly [string, string];

export const DECODE_PHRASES: readonly PhraseLines[] = [
  ["Ship the", "strange idea."],
  ["Make the", "default rare."],
  ["Every pixel,", "on purpose."],
  ["Taste is a", "feature."],
] as const;

export type ScrambleTiming = {
  /** Delay multiplier per character index. */
  startStep: number;
  /** Extra random start jitter [0, startJitter). */
  startJitter: number;
  /** Base resolve duration after start. */
  duration: number;
  /** Extra random duration [0, durationJitter). */
  durationJitter: number;
  /** Minimum ms between glyph re-rolls for a resolving slot. */
  glyphInterval: number;
};

export const HEADLINE_TIMING: ScrambleTiming = {
  startStep: 28,
  startJitter: 120,
  duration: 180,
  durationJitter: 420,
  glyphInterval: 50,
};

export const NAV_TIMING: ScrambleTiming = {
  startStep: 22,
  startJitter: 60,
  duration: 120,
  durationJitter: 200,
  glyphInterval: 50,
};

export const HOLD_AFTER_LOCK_MS = 2600;

export function randomIn(max: number) {
  return Math.random() * max;
}

export function randomGlyph(set: string = SCRAMBLE_GLYPHS) {
  return set[Math.floor(Math.random() * set.length)] ?? "#";
}

/** Flatten two lines into one character sequence (line1 then line2). */
export function flattenLines(lines: PhraseLines): string {
  return lines[0] + lines[1];
}

export function countNonSpace(text: string): number {
  let n = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== " ") n += 1;
  }
  return n;
}

export type SlotPlan = {
  start: number;
  end: number;
  from: string; // "" if source shorter
  to: string;
};

/**
 * Build per-character timing across both lines as one sequence.
 * Index i walks line1 then line2.
 */
export function planTransition(
  from: PhraseLines,
  to: PhraseLines,
  timing: ScrambleTiming
): { slots: SlotPlan[]; line1Len: number; line2Len: number } {
  const a = flattenLines(from);
  const b = flattenLines(to);
  const len = Math.max(a.length, b.length);
  const slots: SlotPlan[] = [];

  for (let i = 0; i < len; i++) {
    const fromChar = a[i] ?? "";
    const toChar = b[i] ?? "";
    const start = i * timing.startStep + randomIn(timing.startJitter);
    const end = start + timing.duration + randomIn(timing.durationJitter);
    slots.push({ start, end, from: fromChar, to: toChar });
  }

  return {
    slots,
    line1Len: to[0].length,
    line2Len: to[1].length,
  };
}

export type CharState = {
  char: string;
  dud: boolean;
};

/**
 * Resolve the character shown at global index `i` at time `t` (ms from transition start).
 */
export function charAtTime(
  slot: SlotPlan,
  t: number,
  lastGlyphAt: number,
  currentGlyph: string,
  glyphInterval: number
): { state: CharState; glyph: string; lastGlyphAt: number } {
  const { start, end, from, to } = slot;

  // Both spaces: stay space forever
  if (from === " " && to === " ") {
    return { state: { char: " ", dud: false }, glyph: " ", lastGlyphAt };
  }

  if (t < start) {
    return {
      state: { char: from, dud: false },
      glyph: currentGlyph,
      lastGlyphAt,
    };
  }

  if (t >= end) {
    return {
      state: { char: to, dud: false },
      glyph: currentGlyph,
      lastGlyphAt,
    };
  }

  // Resolving — never show a glyph once target is space after end (handled above).
  // During scramble, if target is space we still scramble until end then space.
  let glyph = currentGlyph;
  let stamp = lastGlyphAt;
  if (t - lastGlyphAt >= glyphInterval || !currentGlyph) {
    glyph = randomGlyph();
    stamp = t;
  }

  return {
    state: { char: glyph, dud: true },
    glyph,
    lastGlyphAt: stamp,
  };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
