import Link from "next/link";
import { ArrowRight } from "lucide-react";

// No extra libraries needed — Link + lucide-react's ArrowRight, same as
// the rest of the page. The featured-article artwork (the cluster of
// glossy blue/violet rings) is almost certainly a real rendered/exported
// image asset in the source Figma file — a soft, high-detail 3D render
// like that isn't practical to fully reproduce in CSS. `RingCluster` below
// is a CSS approximation (layered, blurred radial-gradient rings) to hold
// the space and get the right color/mood; swap it for a Next <Image>
// pointing at the real export as soon as you have it:
//
//   <Image src="/news/featured.png" alt="" fill className="object-cover" />

function RingCluster({ className = "" }: { className?: string }) {
  const rings = [
    { top: "18%", left: "22%", size: 34, opacity: 0.9 },
    { top: "30%", left: "42%", size: 40, opacity: 0.85 },
    { top: "12%", left: "52%", size: 28, opacity: 0.8 },
    { top: "48%", left: "18%", size: 30, opacity: 0.8 },
    { top: "52%", left: "40%", size: 44, opacity: 0.95 },
    { top: "40%", left: "62%", size: 32, opacity: 0.75 },
    { top: "62%", left: "58%", size: 26, opacity: 0.7 },
    { top: "24%", left: "68%", size: 24, opacity: 0.65 },
    { top: "60%", left: "30%", size: 22, opacity: 0.6 },
  ];

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-[radial-gradient(circle_at_35%_45%,rgba(255,210,222,0.9),rgba(255,240,245,0.5)_60%,rgba(255,255,255,0.2)_85%)]",
        className,
      ].join(" ")}
      aria-hidden
    >
      {rings.map((r, i) => (
        <span
          key={i}
          className="absolute rounded-full border-[5px] border-white bg-[radial-gradient(circle,rgba(244,63,94,0.85),rgba(244,63,94,0.15)_70%)] shadow-[0_6px_16px_rgba(244,63,94,0.35)]"
          style={{
            top: r.top,
            left: r.left,
            width: r.size,
            height: r.size,
            opacity: r.opacity,
            filter: "blur(0.4px)",
          }}
        />
      ))}
      {/* soft overall haze to blend the rings together like the reference */}
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}

type Article = {
  title: string;
  excerpt: string;
  date: string;
  href: string;
};

const FEATURED: Article = {
  title: "Introducing the cross-linked medical dictionary",
  excerpt:
    "In this milestone release we launch a fully cross-linked medical dictionary — every term connects to its conditions, symptoms, drugs and anatomy in one navigable knowledge graph.",
  date: "15 December, 2025",
  href: "/news/cross-linked-dictionary",
};

// NOTE: the reference screenshot is cropped right where these three cards'
// titles/excerpts would start — only the dates are visible. Title/excerpt
// text below is placeholder; swap in the real copy once you have it.
const MORE_ARTICLES: Article[] = [
  {
    title: "New monographs: cardiology & neurology expansion",
    excerpt: "Over 120 new drug monographs added across cardiology and neurology, fully reviewed and cross-checked.",
    date: "26 November, 2025",
    href: "/news/article-2",
  },
  {
    title: "Expanded coverage: 400 new drug interactions",
    excerpt: "The drug database now covers 400 additional interaction pairs, mapped to severity and management notes.",
    date: "20 November, 2025",
    href: "/news/article-3",
  },
  {
    title: "Library adds 60 open-access references",
    excerpt: "Sixty new open-access guideline and reference documents are now available in the medical library.",
    date: "17 October, 2025",
    href: "/news/article-4",
  },
];

export function RecentNewsSection() {
  return (
    <section className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-6 dark:border-gray-800 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Latest from the Medical Library
          </h2>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 px-4 py-2 text-[13px] font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Featured article */}
        <div className="grid grid-cols-1 gap-8 border-b border-gray-200 px-4 py-10 dark:border-gray-800 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-12">
          <RingCluster className="h-64 w-full sm:h-72" />

          <div className="flex flex-col justify-center gap-4">
            <h3 className="max-w-md text-xl font-bold leading-snug text-gray-900 dark:text-gray-100 sm:text-2xl">
              {FEATURED.title}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {FEATURED.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {FEATURED.date}
              </span>
              <Link
                href={FEATURED.href}
                className="inline-flex items-center gap-1 text-xs font-medium text-gray-900 underline underline-offset-2 dark:text-gray-100"
              >
                Read more
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary articles row */}
        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {MORE_ARTICLES.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="flex flex-col gap-3 px-4 py-8 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 sm:px-6 lg:px-8"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {article.date}
              </span>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {article.title}
              </h4>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}