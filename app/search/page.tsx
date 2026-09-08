import type { Metadata } from "next";
import Link from "next/link";
import { Search, BookOpen, Pill, FileText, Leaf, Database, Activity, Globe } from "lucide-react";
import { SEARCH_INDEX } from "@/lib/constants";
import { getSearchResults } from "@/services/data";
import { entryHref } from "@/lib/search";
import { ItemVisual } from "@/components/dictionary/ItemVisual";
import type { SearchItem, SearchItemType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Search - African Metabolome Database",
  description: "Search LC-MS/MS features, NMR spectra, phytochemicals, stress markers, DOIs, and citable datasets.",
};

const TYPE_META: Record<
  SearchItemType,
  { icon: React.ComponentType<{ className?: string }>; label: string; chip: string }
> = {
  Metabolite: {
    icon: Leaf,
    label: "Metabolites & Bioactives",
    chip: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300",
  },
  Dataset: {
    icon: Database,
    label: "Datasets & DOIs",
    chip: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300",
  },
  Spectrum: {
    icon: Activity,
    label: "Reference Spectra",
    chip: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300",
  },
  Domain: {
    icon: Globe,
    label: "Biological Domains",
    chip: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300",
  },
  Term: {
    icon: BookOpen,
    label: "Terms & Annotations",
    chip: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300",
  },
  Drug: {
    icon: Pill,
    label: "Drug Entries",
    chip: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300",
  },
  Article: {
    icon: FileText,
    label: "Articles & Monographs",
    chip: "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300",
  },
};

function ResultRow({ item }: { item: SearchItem }) {
  const meta = TYPE_META[item.type] || TYPE_META.Metabolite;
  return (
    <Link
      href={entryHref(item)}
      className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-rose-200 hover:bg-rose-50/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-rose-900/60 dark:hover:bg-rose-900/10"
    >
      <ItemVisual item={item} size="md" />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-gray-900 group-hover:text-rose-600 dark:text-gray-100 dark:group-hover:text-rose-300">
            {item.label}
          </span>
          {item.category && (
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium dark:text-gray-300 ${meta.chip}`}
            >
              {item.category}
            </span>
          )}
          {item.doi && (
            <span className="rounded-full bg-rose-50 px-2 py-0.5 font-mono text-[9px] text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
              {item.doi}
            </span>
          )}
        </span>
        <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
          {item.description}
        </span>
      </span>
      <span className="mt-1 shrink-0 text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {item.type}
      </span>
    </Link>
  );
}

function ResultGroups({
  items,
  type,
}: {
  items: SearchItem[];
  type: SearchItemType;
}) {
  const meta = TYPE_META[type];
  if (!meta) return null;
  const Icon = meta.icon;
  const group = items.filter((item) => item.type === type);
  if (!group.length) return null;

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {meta.label}
        </h2>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {group.length}
        </span>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {group.map((item) => (
          <ResultRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";

  const results = query ? getSearchResults(query, 100) : [...SEARCH_INDEX];

  return (
    <div className="space-y-8">
      <header>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Search className="h-4 w-4" />
          <span>African Metabolome Search Engine</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {query ? (
            <>
              Results for &ldquo;{query}&rdquo;
              <span className="ml-2 align-middle rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-900/20 dark:text-rose-300">
                {results.length}
              </span>
            </>
          ) : (
            "Browse Multi-Domain Metabolomics Database"
          )}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {query
            ? `Matching features, spectra, species, and DOIs across ${SEARCH_INDEX.length} indexed entries.`
            : "Indexed LC-MS/MS features, NMR spectra, phytochemical bioactives, and citable datasets."}
        </p>
      </header>

      {results.length > 0 ? (
        <>
          <ResultGroups items={results} type="Metabolite" />
          <ResultGroups items={results} type="Dataset" />
          <ResultGroups items={results} type="Spectrum" />
          <ResultGroups items={results} type="Domain" />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-900/20">
            <Search className="h-6 w-6 text-rose-500" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            No results for &ldquo;{query}&rdquo;
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
            Try a compound name like &ldquo;Artemisinin&rdquo;, species like &ldquo;Sorghum&rdquo;, or LC-MS/MS m/z feature.
          </p>
          <div className="mt-6 flex justify-center gap-3 text-sm">
            <Link
              href="/dashboard"
              className="rounded-full bg-gray-900 px-5 py-2 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Open Domains Hub
            </Link>
            <Link
              href="/medications"
              className="rounded-full border border-gray-200 px-5 py-2 font-medium text-gray-700 transition-colors hover:border-gray-300 dark:border-gray-700 dark:text-gray-200 dark:hover:border-gray-600"
            >
              Browse Metabolites
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}