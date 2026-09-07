import Link from "next/link";
import { ArrowRight } from "lucide-react";

// No extra libraries — the abstract "blob" visuals are CSS only (irregular
// border-radius + layered radial gradients + blur), and the dotted texture
// behind the large blob is a repeating radial-gradient background with a
// radial mask to fade it out at the edges. If the real Figma blobs are
// actual rendered/exported images (they may well be — this kind of soft
// 3D-glass look is hard to fully fake in CSS), swap <OrganicBlob> for a
// Next <Image> pointing at the real asset; everything else in this layout
// stays the same.

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
      {/* soft outer glass halo */}
      <div
        className="absolute inset-0 rounded-[62%_38%_55%_45%/48%_60%_40%_52%] bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.9),rgba(226,222,255,0.5)_60%,rgba(226,222,255,0.15)_85%)] blur-md"
        aria-hidden
      />
      {/* deep violet core */}
      <div
        className="absolute left-[18%] top-[22%] h-[46%] w-[46%] rounded-full bg-[radial-gradient(circle,rgba(76,63,232,0.9),rgba(76,63,232,0)_72%)] blur-md"
        aria-hidden
      />
      {/* small secondary violet accent */}
      <div
        className="absolute bottom-[18%] right-[26%] h-[22%] w-[22%] rounded-full bg-[radial-gradient(circle,rgba(124,111,238,0.6),rgba(124,111,238,0)_72%)] blur-sm"
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
        "bg-[radial-gradient(rgba(124,111,238,0.35)_1px,transparent_1px)]",
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
        {/* Top-left: large blob on a dotted-texture backdrop */}
        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden border-b border-gray-200 p-10 dark:border-gray-800 lg:border-r">
          <DotTexture className="inset-0" />
          <OrganicBlob size="lg" className="relative z-10" />
        </div>

        {/* Top-right: heading + copy */}
        <div className="flex flex-col justify-center gap-5 border-b border-gray-200 p-10 dark:border-gray-800 sm:p-12">
          <h2 className="max-w-md text-2xl font-bold leading-snug tracking-tight text-gray-900 dark:text-gray-100 sm:text-[1.75rem]">
            AI engineering inspired by neuroscience for better outcomes.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            We are advancing intelligent systems by building
            neuroscience-driven AI that understands real-world cognitive
            workflows and complex decision contexts. These systems help teams
            manage complexity, reduce friction, and deliver consistent,
            high-performance intelligence at scale.
          </p>
          <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Built on strong AI foundations and guided by experienced
            neuroscience and technology leaders, our platform is designed to
            push the boundaries of how intelligent systems are designed,
            deployed, and experienced.
          </p>
        </div>

        {/* Bottom-left: copy + Learn more link */}
        <div className="flex flex-col justify-center gap-6 p-10 lg:border-r lg:border-gray-200 dark:lg:border-gray-800 sm:p-12">
          <p className="max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Our work focuses on building neuroscience-driven AI systems that
            improve how intelligent solutions are delivered today. By
            reducing complexity across cognitive interactions and operational
            workflows, we help teams operate more efficiently and
            consistently.
          </p>
          <Link
            href="/about"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gray-300 px-4 py-2 text-[13px] font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
          >
            Learn more
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Bottom-right: small blob + copy, side by side */}
        <div className="flex items-center gap-6 p-10 sm:p-12">
          <OrganicBlob size="sm" />
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Our work focuses on building neuroscience-driven AI systems
              that improve how intelligent solutions are designed and applied
              today.
            </p>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              By reducing complexity across cognitive workflows and
              operational processes, we help teams operate more efficiently
              and consistently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}