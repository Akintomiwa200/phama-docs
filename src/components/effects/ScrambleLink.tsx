"use client";

import { useRef } from "react";
import Link from "next/link";
import { NAV_TIMING, prefersReducedMotion } from "@/lib/scramble";
import { paintLine, runTextScramble, type TransitionHandle } from "./scrambleRender";

type ScrambleLinkProps = {
  href: string;
  label: string;
  className?: string;
};

/**
 * Nav link that decodes in place on hover/focus. Ignores re-triggers while scrambling.
 */
export function ScrambleLink({ href, label, className }: ScrambleLinkProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const busyRef = useRef(false);
  const handleRef = useRef<TransitionHandle | null>(null);

  const scramble = () => {
    if (prefersReducedMotion()) return;
    if (busyRef.current) return;
    const el = textRef.current;
    if (!el) return;

    busyRef.current = true;
    handleRef.current?.cancel();
    const handle = runTextScramble(el, label, NAV_TIMING);
    handleRef.current = handle;
    void handle.done.then(() => {
      busyRef.current = false;
      // Ensure clean final text
      if (textRef.current) {
        paintLine(
          textRef.current,
          [...label].map((c) => ({ char: c, dud: false }))
        );
      }
    });
  };

  return (
    <Link
      href={href}
      aria-label={label}
      className={className}
      onMouseEnter={scramble}
      onFocus={scramble}
    >
      <span ref={textRef} aria-hidden="true">
        {label}
      </span>
    </Link>
  );
}
