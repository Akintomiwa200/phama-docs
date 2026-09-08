import Link from "next/link";

const platformLinks = [
  { label: "Domains Hub", href: "/dashboard" },
  { label: "Metabolites & Spectra", href: "/medications" },
  { label: "Data Repositories", href: "/reports" },
  { label: "Analytical Bio-Map", href: "/analytics" },
  { label: "Metadata & DOIs", href: "/settings" },
];

const socialLinks = [
  { label: "MetaboLights", href: "https://www.ebi.ac.uk/metabolights/" },
  { label: "GNPS Social", href: "https://gnps.ucsd.edu/" },
  { label: "Metabolomics Workbench", href: "https://www.metabolomicsworkbench.org/" },
  { label: "Zenodo AMDB Node", href: "#" },
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
      {/* FIGMA BACKGROUND GLOW */}
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
            "radial-gradient(ellipse at center, rgba(255,150,185,0.78) 0%, rgba(255,160,190,0.58) 30%, rgba(255,180,205,0.28) 55%, rgba(255,180,205,0) 78%)",
        }}
      />

      {/* MAIN CONTENT */}
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
          {/* LEFT CONTENT */}
          <div className="w-[410px]">
            <h2
              className="
                m-0
                max-w-[410px]
                text-[25px]
                font-[600]
                leading-[1.05]
                tracking-[-0.055em]
                text-[#090909]
                dark:text-gray-100
                sm:text-[27px]
                lg:text-[29px]
              "
            >
              Building a unified multi-domain
              <br />
              metabolomics platform for African
              <br />
              plants, crops, livestock, &amp; health.
            </h2>

            <Link
              href="/reports"
              className="
                mt-[30px]
                inline-flex
                h-[46px]
                items-center
                justify-center
                rounded-full
                bg-[#111111]
                px-[24px]
                text-[14px]
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
              Submit Data &amp; Claim DOI
            </Link>
          </div>

          {/* RIGHT NAVIGATION */}
          <div
            className="
              flex
              gap-[72px]
              pt-[2px]
            "
          >
            {/* Platform */}
            <nav aria-label="Footer navigation">
              <ul className="m-0 list-none space-y-[14px] p-0">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="
                        block
                        text-[15px]
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

            {/* Repositories */}
            <nav aria-label="Repository links">
              <ul className="m-0 list-none space-y-[14px] p-0">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        block
                        whitespace-nowrap
                        text-[15px]
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
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* LARGE AMDB WORDMARK */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-6px]
          left-1/2
          z-0
          -translate-x-1/2
          select-none
          whitespace-nowrap
        "
      >
        <span
          className="
            block
            text-[16vw]
            font-[500]
            leading-[0.72]
            tracking-[-0.085em]
            text-white
            dark:text-gray-900
          "
        >
          Metabol
          <span className="tracking-[-0.11em]">ome</span>
        </span>
      </div>
    </footer>
  );
}
