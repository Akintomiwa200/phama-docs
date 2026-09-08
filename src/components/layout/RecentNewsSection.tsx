import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
}

type DatasetNews = {
  title: string;
  excerpt: string;
  date: string;
  doi: string;
  href: string;
};

const FEATURED_DATASET: DatasetNews = {
  title: "Data Publication & Contributor Attribution Framework",
  excerpt:
    "Community contributions receive persistent identifiers (DOIs), contributor metadata, institutional affiliation, and recommended citation formats — granting researchers formal scholarly credit for uploading feature tables, spectral data, and metadata.",
  date: "Data Framework 2026",
  doi: "10.5281/zenodo.AMDB-2026-PUB",
  href: "/reports",
};

const REPOSITORY_SOURCES: DatasetNews[] = [
  {
    title: "Public Metabolomics Repositories Integration",
    excerpt: "Integrating open analytical datasets from MetaboLights, Metabolomics Workbench, and GNPS.",
    date: "Public Repos",
    doi: "MetaboLights & GNPS",
    href: "/reports",
  },
  {
    title: "Literature-Derived Phytochemical Curation",
    excerpt: "Extracting reference metabolite data from published studies on African medicinal flora & staple crops.",
    date: "Literature Data",
    doi: "Curated Literature DB",
    href: "/reports",
  },
  {
    title: "Newly Generated Research Collaborations",
    excerpt: "Institutional partnerships, funded projects, and government programs expanding dataset depth across Africa.",
    date: "New Datasets",
    doi: "AMDB Partner Datasets",
    href: "/reports",
  },
];

export function RecentNewsSection() {
  return (
    <section className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-6 dark:border-gray-800 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Data Sources &amp; Scholarly Publication Framework
          </h2>
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 px-4 py-2 text-[13px] font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
          >
            Submit Data &amp; DOI
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Featured article */}
        <div className="grid grid-cols-1 gap-8 border-b border-gray-200 px-4 py-10 dark:border-gray-800 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-12">
          <RingCluster className="h-64 w-full sm:h-72" />

          <div className="flex flex-col justify-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              {FEATURED_DATASET.doi}
            </span>
            <h3 className="max-w-md text-xl font-bold leading-snug text-gray-900 dark:text-gray-100 sm:text-2xl">
              {FEATURED_DATASET.title}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {FEATURED_DATASET.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {FEATURED_DATASET.date}
              </span>
              <Link
                href={FEATURED_DATASET.href}
                className="inline-flex items-center gap-1 text-xs font-medium text-gray-900 underline underline-offset-2 dark:text-gray-100"
              >
                Upload &amp; Get DOI
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary sources row */}
        <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {REPOSITORY_SOURCES.map((article) => (
            <Link
              key={article.title}
              href={article.href}
              className="flex flex-col gap-3 px-4 py-8 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 sm:px-6 lg:px-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-rose-500">
                  {article.doi}
                </span>
                <span className="text-[11px] text-gray-400">
                  {article.date}
                </span>
              </div>
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