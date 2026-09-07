
import React from "react";

export function DecodeSignalsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950">
      {/* =========================================================
          SECTION
          ========================================================= */}

      <div
        className="
          relative
          mx-auto
          flex
          w-full
          max-w-[1440px]
          justify-center
          px-5
          py-[60px]
          sm:px-8
          sm:py-[80px]
          lg:px-12
          lg:py-[100px]
        "
      >
        {/* =======================================================
            ORGANIC FIGMA SHAPE
            ======================================================= */}

        <div
          className="
            relative
            w-full
            max-w-[1080px]
            overflow-visible
          "
        >
          {/* -----------------------------------------------------
              Soft outer glow
              ----------------------------------------------------- */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[-14px]
              rounded-[65px]
              opacity-80
              blur-[13px]
            "
            style={{
              background:
                "linear-gradient(105deg, rgba(224,220,255,0.95) 0%, rgba(214,208,255,0.85) 38%, rgba(190,183,255,0.8) 67%, rgba(221,215,255,0.9) 100%)",
            }}
          />

          {/* -----------------------------------------------------
              SVG shape
              ----------------------------------------------------- */}

          <svg
            viewBox="0 0 1000 500"
            className="
              relative
              z-10
              block
              h-auto
              w-full
            "
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              {/* Main gradient */}

              <linearGradient
                id="neuro-panel-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="50%"
              >
                <stop
                  offset="0%"
                  stopColor="#eeeeff"
                />

                <stop
                  offset="35%"
                  stopColor="#d6d1fa"
                />

                <stop
                  offset="62%"
                  stopColor="#aaa1f4"
                />

                <stop
                  offset="82%"
                  stopColor="#8871ee"
                />

                <stop
                  offset="100%"
                  stopColor="#7045e5"
                />
              </linearGradient>

              {/* Bottom/left soft light */}

              <radialGradient
                id="neuro-panel-light"
                cx="25%"
                cy="78%"
                r="70%"
              >
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                  stopOpacity="0.48"
                />

                <stop
                  offset="55%"
                  stopColor="#ffffff"
                  stopOpacity="0.10"
                />

                <stop
                  offset="100%"
                  stopColor="#ffffff"
                  stopOpacity="0"
                />
              </radialGradient>

              {/* Right purple light */}

              <radialGradient
                id="neuro-panel-purple"
                cx="93%"
                cy="50%"
                r="65%"
              >
                <stop
                  offset="0%"
                  stopColor="#7444e8"
                  stopOpacity="0.95"
                />

                <stop
                  offset="45%"
                  stopColor="#8d72ef"
                  stopOpacity="0.50"
                />

                <stop
                  offset="100%"
                  stopColor="#9c8bf2"
                  stopOpacity="0"
                />
              </radialGradient>

              {/* Soft inner highlight */}

              <linearGradient
                id="neuro-panel-highlight"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                  stopOpacity="0.20"
                />

                <stop
                  offset="50%"
                  stopColor="#ffffff"
                  stopOpacity="0"
                />

                <stop
                  offset="100%"
                  stopColor="#ffffff"
                  stopOpacity="0.10"
                />
              </linearGradient>

              {/* Shape shadow */}

              <filter
                id="neuro-panel-shadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="7"
                  floodColor="#c6bfff"
                  floodOpacity="0.22"
                />
              </filter>

              {/* Clip shape */}

              <clipPath id="neuro-panel-clip">
                <path
                  d="
                    M 105 55

                    H 610

                    C 625 55
                      635 65
                      635 80

                    V 118

                    C 635 133
                      645 143
                      660 143

                    H 674

                    C 690 143
                      700 153
                      700 168

                    C 700 183
                      710 193
                      725 193

                    C 740 193
                      750 183
                      750 168

                    V 82

                    C 750 66
                      760 55
                      777 55

                    H 850

                    C 875 55
                      892 72
                      892 97

                    V 402

                    C 892 427
                      875 445
                      850 445

                    H 777

                    C 760 445
                      750 434
                      750 418

                    V 383

                    C 750 368
                      740 358
                      725 358

                    C 710 358
                      700 368
                      700 383

                    C 700 398
                      690 408
                      674 408

                    H 660

                    C 645 408
                      635 398
                      635 383

                    V 420

                    C 635 436
                      624 445
                      608 445

                    H 105

                    C 80 445
                      62 427
                      62 402

                    V 98

                    C 62 73
                      80 55
                      105 55

                    Z
                  "
                />
              </clipPath>
            </defs>

            {/* ===================================================
                OUTER WHITE BORDER
                =================================================== */}

            <path
              d="
                M 105 55
                H 610
                C 625 55 635 65 635 80
                V 118
                C 635 133 645 143 660 143
                H 674
                C 690 143 700 153 700 168
                C 700 183 710 193 725 193
                C 740 193 750 183 750 168
                V 82
                C 750 66 760 55 777 55
                H 850
                C 875 55 892 72 892 97
                V 402
                C 892 427 875 445 850 445
                H 777
                C 760 445 750 434 750 418
                V 383
                C 750 368 740 358 725 358
                C 710 358 700 368 700 383
                C 700 398 690 408 674 408
                H 660
                C 645 408 635 398 635 383
                V 420
                C 635 436 624 445 608 445
                H 105
                C 80 445 62 427 62 402
                V 98
                C 62 73 80 55 105 55
                Z
              "
              fill="url(#neuro-panel-gradient)"
              stroke="rgba(247,246,255,0.98)"
              strokeWidth="22"
              strokeLinejoin="round"
              filter="url(#neuro-panel-shadow)"
            />

            {/* ===================================================
                LIGHT OVERLAY
                =================================================== */}

            <g clipPath="url(#neuro-panel-clip)">
              <rect
                x="40"
                y="35"
                width="880"
                height="430"
                fill="url(#neuro-panel-light)"
              />

              <rect
                x="40"
                y="35"
                width="880"
                height="430"
                fill="url(#neuro-panel-purple)"
              />

              <rect
                x="40"
                y="35"
                width="880"
                height="430"
                fill="url(#neuro-panel-highlight)"
              />
            </g>

            {/* ===================================================
                INNER WHITE EDGE
                =================================================== */}

            <path
              d="
                M 105 55
                H 610
                C 625 55 635 65 635 80
                V 118
                C 635 133 645 143 660 143
                H 674
                C 690 143 700 153 700 168
                C 700 183 710 193 725 193
                C 740 193 750 183 750 168
                V 82
                C 750 66 760 55 777 55
                H 850
                C 875 55 892 72 892 97
                V 402
                C 892 427 875 445 850 445
                H 777
                C 760 445 750 434 750 418
                V 383
                C 750 368 740 358 725 358
                C 710 358 700 368 700 383
                C 700 398 690 408 674 408
                H 660
                C 645 408 635 398 635 383
                V 420
                C 635 436 624 445 608 445
                H 105
                C 80 445 62 427 62 402
                V 98
                C 62 73 80 55 105 55
                Z
              "
              fill="none"
              stroke="rgba(255,255,255,0.94)"
              strokeWidth="8"
              strokeLinejoin="round"
            />
          </svg>

          {/* =====================================================
              TEXT
              ===================================================== */}

          <div
            className="
              absolute
              left-[13%]
              top-1/2
              z-20
              w-[56%]
              -translate-y-1/2
            "
          >
            <p
              className="
                m-0
                max-w-[620px]
                text-[18px]
                font-[400]
                leading-[1.22]
                tracking-[-0.035em]
                text-white
                sm:text-[20px]
                lg:text-[22px]
              "
            >
              The brain is a highly complex system.
              <br />
              Our platform is purpose-built to decode neural
              <br />
              signals and enable scalable, neuroscience -
              <br />
              driven AI engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
