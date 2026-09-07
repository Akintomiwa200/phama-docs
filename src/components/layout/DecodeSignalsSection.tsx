// No extra libraries needed — pure Tailwind (arbitrary gradient/shadow
// values) plus one inline SVG for the wavy "signal" connector. Server
// component: nothing here is interactive.

export function DecodeSignalsSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex max-w-6xl items-center justify-center gap-4 sm:gap-6">
        {/* soft lavender halo glow sitting behind both shapes */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[radial-gradient(circle_at_35%_45%,rgba(124,111,238,0.28),transparent_70%)] blur-3xl"
        />

        {/* main card — holds the copy */}
        <div
          className={[
            "relative z-10 flex min-h-[280px] w-full max-w-2xl items-center",
            "rounded-[2.5rem] border-[6px] border-white p-8 sm:p-10",
            "bg-[linear-gradient(135deg,#ffffff_0%,#d6cdfb_30%,#7c6fee_65%,#aecdf5_100%)]",
            "shadow-[0_25px_70px_-20px_rgba(124,111,238,0.5)]",
            "dark:border-gray-900",
          ].join(" ")}
        >
          <p className="max-w-md text-[17px] font-medium leading-relaxed text-white sm:text-lg">
            The brain is a highly complex system. Our platform is
            purpose-built to decode neural signals and enable scalable,
            neuroscience-driven AI engineering.
          </p>
        </div>

        {/* wavy "neural signal" connector between the two shapes */}
        <svg
          aria-hidden
          viewBox="0 0 40 260"
          className="relative z-10 hidden h-[200px] w-10 shrink-0 sm:block"
        >
          <path
            d="M20 10 C 2 45, 38 75, 20 110 S 2 175, 20 210 S 38 245, 20 250"
            fill="none"
            stroke="#b3a8f2"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* smaller detached card — echoes the main shape's gradient */}
        <div
          aria-hidden
          className={[
            "relative z-10 hidden h-[200px] w-36 shrink-0",
            "rounded-[2rem] border-[6px] border-white",
            "bg-[linear-gradient(160deg,#7c6fee_0%,#5b4fe0_50%,#aecdf5_100%)]",
            "shadow-[0_25px_70px_-20px_rgba(124,111,238,0.5)]",
            "dark:border-gray-900 sm:block",
          ].join(" ")}
        />
      </div>
    </section>
  );
}
