import Link from "next/link";
import { ArrowRight } from "lucide-react";

// No extra libraries needed — the particle spheres are plain SVG, generated
// with a small seeded random-number generator so the same seed always
// produces the same layout (safe for server rendering, no hydration
// mismatch, no client JS required).

function mulberry32(seed: number) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Particle = { x: number; y: number; r: number; o: number };

function generateParticles(seed: number, count = 700): Particle[] {
  const rand = mulberry32(seed);
  const points: Particle[] = [];

  // Off-center "hot spot" so the cloud reads as an uneven, organic cluster
  // rather than a uniform dot-filled circle — matching the reference.
  const clusterAngle = rand() * Math.PI * 2;
  const clusterDist = 0.2 + rand() * 0.25;
  const clusterX = Math.cos(clusterAngle) * clusterDist;
  const clusterY = Math.sin(clusterAngle) * clusterDist * 0.85;

  let attempts = 0;
  while (points.length < count && attempts < count * 8) {
    attempts++;
    const x = rand() * 2 - 1;
    const y = rand() * 2 - 1;
    const d = Math.hypot(x, y);
    if (d > 1) continue;

    const distToCluster = Math.hypot(x - clusterX, y - clusterY);
    const keepChance = Math.max(0.12, 1 - distToCluster * 0.9);
    if (rand() > keepChance) continue;

    points.push({
      x,
      y,
      r: 0.5 + rand() * 1.2,
      o: Math.max(0.1, 1 - distToCluster * 1.05) * (0.5 + rand() * 0.5),
    });
  }
  return points;
}

function ParticleSphere({
  seed,
  className,
}: {
  seed: number;
  className?: string;
}) {
  const points = generateParticles(seed);
  const size = 240;
  const center = size / 2;
  const scale = size / 2 - 4;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      {points.map((p, i) => (
        <circle
          key={i}
          cx={center + p.x * scale}
          cy={center + p.y * scale}
          r={p.r}
          className="fill-rose-600 dark:fill-rose-400"
          opacity={p.o}
        />
      ))}
    </svg>
  );
}

const FEATURES = [
  {
    title: "Structured Drug Database",
    description:
      "Every drug as a structured monograph &mdash; class, indications, dosages, interactions and references.",
    seed: 101,
  },
  {
    title: "Cross-Linked Terminology",
    description:
      "Hyperlinked terms connect symptoms, conditions, anatomy and pharmacology in one navigable graph.",
    seed: 202,
  },
  {
    title: "Curated Medical Library",
    description:
      "Trusted references, guidelines and reviews &mdash; organized, versioned and ready for lookup.",
    seed: 303,
  },
];

export function PlatformOverviewSection() {
  return (
    <section className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      {/* Headline + supporting copy + CTA */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 border-b border-gray-200 px-4 py-16 dark:border-gray-800 sm:px-6 lg:grid-cols-[1fr_4fr] lg:px-8 lg:py-24">
        <div aria-hidden />

        <div className="flex flex-col items-start">
          <h2 className="max-w-2xl text-left text-[2rem] font-bold leading-[1.2] tracking-tight text-gray-900 dark:text-gray-100 sm:text-[2.5rem]">
            A living medical database that connects every term, drug and
            condition.
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
            <p className="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
              Our platform unifies medical terminology, pharmacology and
              clinical references so every search returns a complete,
              trusted answer.
            </p>
            <p className="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
              By relating every entry to its anatomy, symptoms and related
              drugs, we make complex medical knowledge fast to navigate and
              easy to verify.
            </p>
          </div>

          <Link
            href="/medications"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Explore Drug Database
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Three-column feature grid with particle-sphere visuals */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center px-6 py-16 text-center sm:px-8">
            <h3 className="max-w-[14rem] text-[15px] font-semibold leading-snug text-gray-900 dark:text-gray-100">
              {feature.title}
            </h3>

            <ParticleSphere
              seed={feature.seed}
              className="mx-auto my-10 h-44 w-44"
            />

            <p className="max-w-[16rem] text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
