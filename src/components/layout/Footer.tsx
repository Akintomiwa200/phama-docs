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
    <footer
      className="
        relative
        isolate
        h-[520px]
        w-full
        overflow-hidden
        bg-[#f1f1ff]
        dark:bg-gray-950
        sm:h-[525px]
        lg:h-[530px]
      "
    >
      {/* =====================================================
          FIGMA BACKGROUND GLOW
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[5%]
          top-[24%]
          h-[430px]
          w-[700px]
          rounded-full
          blur-[105px]
        "
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(171,150,255,0.78) 0%, rgba(174,154,255,0.58) 30%, rgba(190,175,255,0.28) 55%, rgba(190,175,255,0) 78%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[28%]
          top-[30%]
          h-[360px]
          w-[650px]
          rounded-full
          blur-[120px]
        "
        style={{
          background:
            "radial-gradient(ellipse, rgba(183,164,255,0.46) 0%, rgba(183,164,255,0.22) 42%, rgba(183,164,255,0) 75%)",
        }}
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[2%]
          top-[2%]
          h-[400px]
          w-[500px]
          rounded-full
          blur-[110px]
        "
        style={{
          background:
            "radial-gradient(ellipse, rgba(229,222,255,0.62) 0%, rgba(229,222,255,0) 72%)",
        }}
      />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          h-full
          w-full
          max-w-[1040px]
          px-5
          pt-[58px]
          sm:px-6
          lg:pt-[58px]
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
          "
        >
          {/* =================================================
              LEFT CONTENT
              ================================================= */}

          <div className="w-[390px]">
            <h2
              className="
                m-0
                max-w-[390px]
                text-[24px]
                font-[600]
                leading-[1.02]
                tracking-[-0.055em]
                text-[#090909]
                dark:text-gray-100
                sm:text-[25px]
                lg:text-[26px]
              "
            >
              We are advancing brain-inspired AI to
              <br />
              solve meaningful, real-world problems.
            </h2>

            <Link
              href="/contact"
              className="
                mt-[30px]
                inline-flex
                h-[40px]
                items-center
                justify-center
                rounded-full
                bg-[#111111]
                px-[21px]
                text-[11px]
                font-[500]
                leading-none
                tracking-[-0.02em]
                text-white
                transition-all
                duration-200
                hover:scale-[1.03]
                hover:bg-black
              "
            >
              Let&apos;s connect
            </Link>
          </div>

          {/* =================================================
              RIGHT NAVIGATION
              ================================================= */}

          <div
            className="
              flex
              gap-[72px]
              pt-[2px]
            "
          >
            {/* Platform */}

            <nav aria-label="Footer navigation">
              <ul className="m-0 list-none space-y-[12px] p-0">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        block
                        text-[11px]
                        font-[400]
                        leading-none
                        tracking-[-0.025em]
                        text-[#161616]
                        dark:text-gray-300
                        transition-opacity
                        duration-200
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
              <ul className="m-0 list-none space-y-[12px] p-0">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        block
                        whitespace-nowrap
                        text-[11px]
                        font-[400]
                        leading-none
                        tracking-[-0.025em]
                        text-[#161616]
                        dark:text-gray-300
                        transition-opacity
                        duration-200
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

      {/* =====================================================
          LARGE NEUROAI WORDMARK
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-92px]
          left-[10%]
          z-0
          select-none
          whitespace-nowrap
        "
      >
        <span
          className="
            block
            text-[245px]
            font-[500]
            leading-[0.72]
            tracking-[-0.085em]
            text-white
            dark:text-gray-900
            sm:text-[260px]
            lg:text-[285px]
          "
        >
          Neurofi
          <span className="tracking-[-0.11em]">ai</span>
        </span>
      </div>
    </footer>
  );
}
