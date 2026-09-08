import Link from "next/link";
import { ArrowRight } from "lucide-react";

function OrganicBlob({
  size = "lg",
  className = "",
}: {
  size?: "lg" | "sm";
  className?: string;
}) {
  const dims = size === "lg" ? "h-64 w-72 sm:h-72 sm:w-80" : "h-28 w-32";

  return (
    <div className={["relative shrink-0", dims, className].join(" ")}>
      <div
        className="absolute inset-0 rounded-[62%_38%_55%_45%/48%_60%_40%_52%] bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.9),rgba(255,226,235,0.5)_60%,rgba(255,226,235,0.15)_85%)] blur-md"
        aria-hidden
      />
      <div
        className="absolute left-[18%] top-[22%] h-[46%] w-[46%] rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.9),rgba(244,63,94,0)_72%)] blur-md"
        aria-hidden
      />
      <div
        className="absolute bottom-[18%] right-[26%] h-[22%] w-[22%] rounded-full bg-[radial-gradient(circle,rgba(251,113,133,0.6),rgba(251,113,133,0)_72%)] blur-sm"
        aria-hidden
      />
    </div>
  );
}

function DotTexture({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute",
        "bg-[radial-gradient(rgba(251,113,133,0.35)_1px,transparent_1px)]",
        "bg-[length:7px_7px]",
        "[mask-image:radial-gradient(circle,black_35%,transparent_75%)]",
        className,
      ].join(" ")}
    />
  );
}

export function EngineeringSplitSection() {
  return (
    <section className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2">
        {/* Top-left: large blob */}
        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden border-b border-gray-200 p-10 dark:border-gray-800 lg:border-r">
          <DotTexture className="inset-0" />
          <OrganicBlob size="lg" className="relative z-10" />
        </div>

        {/* Top-right: heading + copy */}
        <div className="flex flex-col justify-center gap-5 border-b border-gray-200 p-10 dark:border-gray-800 sm:p-12">
          <h2 className="max-w-md text-2xl font-bold leading-snug tracking-tight text-gray-900 dark:text-gray-100 sm:text-[1.75rem]">
            Five core data types engineered for metabolomics.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>1. Primary Analytical Data:</strong> Raw mass-to-charge ratios (m/z), retention times, spectral fragmentation patterns, and signal intensities from LC-MS/MS, GC-MS, and NMR platforms.
          </p>
          <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>2. Processed Feature Tables:</strong> Structured matrices containing detected metabolite signals, peak intensities, and cross-sample alignment.
          </p>
        </div>

        {/* Bottom-left: copy + Learn more link */}
        <div className="flex flex-col justify-center gap-6 p-10 lg:border-r lg:border-gray-200 dark:lg:border-gray-800 sm:p-12">
          <p className="max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>3. Spectral Reference Data:</strong> MS/MS fragmentation and NMR reference libraries enable annotation of unknown metabolites.
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            <strong>4. Annotation &amp; Metadata:</strong> Compound names, formulas, structures, database IDs, confidence scores, species origin, tissue type, geographic region, and storage conditions.
          </p>
          <Link
            href="/settings"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gray-300 px-4 py-2 text-[13px] font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
          >
            Metadata Standards &amp; Formats
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Bottom-right: small blob + copy */}
        <div className="flex items-center gap-6 p-10 sm:p-12">
          <OrganicBlob size="sm" />
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Without robust biological metadata, metabolomic data cannot be meaningfully compared across studies.
            </p>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              AMDB ensures every biological sample is enriched with standardized metadata protocols.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}