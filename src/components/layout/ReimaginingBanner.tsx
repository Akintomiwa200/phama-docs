// Decorative, oversized display text that intentionally bleeds off both
// edges of the viewport — no extra libraries needed, just `overflow-hidden`
// on the wrapper and a very large, very light-weight-in-color heading.

export function ReimaginingBanner() {
  return (
    <section
      aria-hidden="true"
      className="overflow-hidden bg-white py-6 dark:bg-gray-950 sm:py-10"
    >
      <p
        className={[
          "select-none whitespace-nowrap text-center font-bold leading-none tracking-tight",
          "text-gray-100 dark:text-gray-900",
          "text-[16vw] sm:text-[12vw] lg:text-[10vw]",
        ].join(" ")}
      >
        reimagining intelligence
      </p>
    </section>
  );
}