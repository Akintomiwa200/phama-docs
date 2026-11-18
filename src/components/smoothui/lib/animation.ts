/**
 * Shared motion presets.
 *
 * `motion` (imported as `motion/react`) is the animation package, so
 * transitions are kept as plain objects here and passed through to `motion`
 * components.
 */

export const DURATION_INSTANT = {
  duration: 0.12,
  ease: "easeOut",
} as const;

export const SPRING_DEFAULT = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.9,
} as const;

export const SPRING_SNAPPY = {
  type: "spring",
  stiffness: 520,
  damping: 38,
  mass: 0.7,
} as const;
