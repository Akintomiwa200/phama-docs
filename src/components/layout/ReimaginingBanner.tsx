// Decorative, oversized display text that intentionally bleeds off both
// edges of the viewport and scrolls endlessly right-to-left as a marquee.
// No extra libraries: two identical copies sit on a `w-max` track that
// animates `translateX(0 → -50%)`, which loops invisibly.

const TEXT = "mapping the african metabolome";

export function ReimaginingBanner() {
  return (
    <section
      aria-hidden="true"
      className="overflow-hidden bg-white py-6 dark:bg-gray-950 sm:py-10"
    >
      <div className="animate-marquee-right mx-auto flex w-max">
        {[...Array(2)].map((_, i) => (
          <p
            key={i}
            className={[
              "select-none whitespace-nowrap text-center font-bold leading-none tracking-tight",
              "text-gray-100 dark:text-gray-900",
              "text-[16vw] sm:text-[12vw] lg:text-[10vw]",
            ].join(" ")}
          >
            {TEXT}
          </p>
        ))}
      </div>
    </section>
  );
}