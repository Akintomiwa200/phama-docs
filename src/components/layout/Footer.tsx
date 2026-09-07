import Link from "next/link";

const platformLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Company", href: "/company" },
  { label: "Research Lab", href: "/research" },
  { label: "Journey", href: "/journey" },
  { label: "News", href: "/news" },
];

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter (X)", href: "#" },
  { label: "Medium", href: "#" },
  { label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative isolate h-[520px] overflow-hidden bg-[#f0f0ff] sm:h-[580px] lg:h-[620px]">
      {/* =========================================================
          VERY SOFT BACKGROUND GLOW
          ========================================================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[18%]
          h-[320px]
          w-[420px]
          rounded-full
          opacity-70
          blur-[90px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(184,169,255,0.50) 0%, rgba(184,169,255,0.20) 42%, rgba(184,169,255,0) 75%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[18%]
          top-[5%]
          h-[300px]
          w-[380px]
          rounded-full
          opacity-50
          blur-[100px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(220,202,255,0.45) 0%, rgba(220,202,255,0) 72%)",
        }}
      />

      {/* =========================================================
          CONTENT
          ========================================================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1280px]
          px-6
          pt-[25px]
          sm:px-8
          lg:px-10
          xl:px-12
        "
      >
        <div
          className="
            flex
            flex-col
            gap-10
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          {/* =====================================================
              LEFT
              ===================================================== */}
          <div className="max-w-[330px]">
            <h2
              className="
                max-w-[330px]
                text-[19px]
                font-[600]
                leading-[1.04]
                tracking-[-0.045em]
                text-[#090909]
                sm:text-[20px]
                lg:text-[21px]
              "
            >
              We are advancing brain-inspired AI to
              <br className="hidden sm:block" />
              solve meaningful, real-world problems.
            </h2>

            <Link
              href="/contact"
              className="
                mt-[14px]
                inline-flex
                h-[27px]
                items-center
                rounded-full
                bg-[#111111]
                px-[14px]
                text-[8px]
                font-[500]
                tracking-[-0.01em]
                text-white
                transition-transform
                duration-200
                hover:scale-[1.03]
              "
            >
              Let's connect
            </Link>
          </div>

          {/* =====================================================
              RIGHT NAVIGATION
              ===================================================== */}
          <div
            className="
              flex
              gap-[55px]
              pr-0
              sm:pr-[20px]
              lg:gap-[70px]
              lg:pr-[35px]
            "
          >
            {/* Platform */}
            <nav aria-label="Footer navigation">
              <ul className="space-y-[6px]">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        text-[8px]
                        font-[400]
                        leading-none
                        tracking-[-0.01em]
                        text-[#151515]
                        transition-opacity
                        hover:opacity-50
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social */}
            <nav aria-label="Social links">
              <ul className="space-y-[6px]">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        text-[8px]
                        font-[400]
                        leading-none
                        tracking-[-0.01em]
                        text-[#151515]
                        transition-opacity
                        hover:opacity-50
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* =========================================================
          HUGE BOTTOM WORDMARK

          This intentionally sits below the viewport boundary,
          reproducing the Figma composition where only the upper
          portion of the wordmark is visible.
          ========================================================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[42px]
          left-1/2
          z-0
          w-max
          -translate-x-1/2
          select-none
          whitespace-nowrap
        "
      >
        <span
          className="
            block
            text-[145px]
            font-[500]
            leading-[0.72]
            tracking-[-0.075em]
            text-white
            sm:text-[190px]
            lg:text-[245px]
            xl:text-[285px]
          "
        >
          Neuro
          <span className="tracking-[-0.09em]">ai</span>
        </span>
      </div>
    </footer>
  );
}
