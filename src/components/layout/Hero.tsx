import Link from "next/link";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section
      className="
        relative isolate min-h-[100svh] overflow-hidden
        bg-white
        dark:bg-gray-950
        pt-[150px]
        sm:pt-[175px]
        lg:pt-[185px]
      "
    >
      {/* =========================================================
          FIGMA GRADIENT ORB
          ========================================================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute z-0
          left-[50%] top-[135px]
          h-[470px] w-[470px]
          -translate-x-1/2
          sm:top-[145px]
          sm:h-[570px] sm:w-[570px]
          lg:left-[51%]
          lg:top-[110px]
          lg:h-[690px] lg:w-[690px]
          xl:h-[730px] xl:w-[730px]
        "
      >
        {/* Large soft lavender body */}
        <div
          className="
            absolute inset-0 rounded-full
            opacity-[0.78]
            blur-[35px]
            sm:blur-[45px]
          "
          style={{
            background: `
              radial-gradient(
                circle at 48% 48%,
                rgba(213, 209, 255, 0.92) 0%,
                rgba(225, 222, 255, 0.78) 38%,
                rgba(235, 233, 255, 0.52) 62%,
                rgba(246, 245, 255, 0.22) 78%,
                rgba(255, 255, 255, 0) 100%
              )
            `,
          }}
        />

        {/* Blue / violet concentration */}
        <div
          className="
            absolute
            left-[5%] top-[30%]
            h-[55%] w-[55%]
            rounded-full
            blur-[38px]
            sm:blur-[48px]
          "
          style={{
            background: `
              radial-gradient(
                circle at 48% 50%,
                rgba(70, 67, 236, 0.86) 0%,
                rgba(82, 77, 235, 0.66) 22%,
                rgba(108, 100, 240, 0.30) 48%,
                rgba(120, 110, 240, 0) 76%
              )
            `,
          }}
        />

        {/* Pink transition */}
        <div
          className="
            absolute
            left-[10%] top-[33%]
            h-[30%] w-[30%]
            rounded-full
            blur-[28px]
            sm:blur-[36px]
          "
          style={{
            background: `
              radial-gradient(
                circle,
                rgba(236, 91, 177, 0.72) 0%,
                rgba(228, 98, 190, 0.45) 24%,
                rgba(220, 111, 203, 0.12) 55%,
                rgba(220, 111, 203, 0) 75%
              )
            `,
          }}
        />

        {/* Cyan / blue edge on the left */}
        <div
          className="
            absolute
            left-[0%] top-[20%]
            h-[42%] w-[24%]
            rounded-full
            blur-[32px]
            sm:blur-[40px]
          "
          style={{
            background: `
              radial-gradient(
                ellipse,
                rgba(91, 190, 255, 0.42) 0%,
                rgba(105, 167, 255, 0.20) 40%,
                rgba(105, 167, 255, 0) 78%
              )
            `,
          }}
        />

        {/* Very soft white fade around the perimeter */}
        <div
          className="
            absolute inset-[-10%]
            rounded-full
            blur-[40px]
          "
          style={{
            background: `
              radial-gradient(
                circle,
                transparent 48%,
                rgba(255,255,255,0.22) 72%,
                rgba(255,255,255,0.82) 91%,
                #fff 100%
              )
            `,
          }}
        />
      </div>

      {/* =========================================================
          MAIN CONTENT
          ========================================================= */}
      <div
        className="
          relative z-10 mx-auto
          flex w-full max-w-[1280px]
          min-h-[calc(100svh-150px)]
          flex-col
          px-6
          sm:min-h-[calc(100svh-175px)]
          sm:px-8
          lg:min-h-[calc(100svh-185px)]
          lg:px-10
          xl:px-12
        "
      >
        {/* Heading */}
        <div className="relative">
          <h1
            className="
              text-[42px]
              font-[600]
              leading-[0.92]
              tracking-[-0.055em]
              text-black
              dark:text-gray-100
              sm:text-[48px]
              lg:text-[54px]
              xl:text-[58px]
            "
          >
            Building Intelligent
            <br />

            Systems for{" "}
            <span className="font-[400] text-[#9b9b9f] dark:text-gray-500">
              Longevity
            </span>

            <br />

            Science
          </h1>
        </div>

        {/* =======================================================
            SEARCH
            ======================================================= */}
        <div className="flex flex-1 items-center justify-center pb-16">
          <div className="flex w-full max-w-lg items-center gap-2 rounded-full border border-gray-200 bg-white/70 p-1.5 pl-4 shadow-xl shadow-indigo-500/5 backdrop-blur-xl transition-colors focus-within:border-indigo-300 dark:border-gray-700 dark:bg-gray-900/70 dark:focus-within:border-indigo-500">
            <Search className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search drugs, reports and insights..."
              className="w-full bg-transparent py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
            <button
              type="button"
              className="shrink-0 rounded-full bg-gray-900 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Search
            </button>
          </div>
        </div>

        {/* =======================================================
            BOTTOM CONTENT
            ======================================================= */}
        <div
          className="
            flex flex-col
            items-start
            justify-between
            gap-8
            pb-12
            sm:flex-row
            sm:items-end
            lg:pb-14
          "
        >
          {/* Description */}
          <p
            className="
              max-w-[300px]
              text-[10px]
              font-[400]
              leading-[1.25]
              tracking-[-0.01em]
              text-[#66666b]
              dark:text-gray-400
              sm:max-w-[310px]
              lg:text-[11px]
            "
          >
            AI-powered neuroscience research integrating optogenetics and
            chemistry to uncover next-generation therapeutics.
          </p>

          {/* CTA */}
          <Link
            href="/platform"
            className="
              inline-flex
              h-[32px]
              items-center
              justify-center
              rounded-full
              bg-[#111111]
              px-[17px]
              text-[10px]
              font-[500]
              tracking-[-0.01em]
              text-white
              transition-all
              duration-200
              hover:bg-black
              hover:scale-[1.02]
              active:scale-[0.98]
              sm:h-[34px]
              sm:px-[18px]
            "
          >
            Discover Platform
          </Link>
        </div>
      </div>
    </section>
  );
}
