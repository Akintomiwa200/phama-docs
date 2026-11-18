"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Leaf,
  Database,
  Activity,
  Globe,
  BookOpen,
  Pill,
  FileText,
  X,
  SlidersHorizontal,
  ArrowUpRight,
  Sparkles,
  FlaskConical,
  Hash,
  Users,
  Calendar,
  Layers,
  CircleDot,
  Image as ImageIcon,
  Video,
  Clapperboard,
  Tag,
  Play,
  Clock,
  Film,
} from "lucide-react";
import { SEARCH_INDEX } from "@/lib/constants";
import {
  countByDomain,
  countByType,
  entryHref,
  popularItems,
  searchIndex,
} from "@/lib/search";
import { ItemVisual } from "@/components/dictionary/ItemVisual";
import {
  getBiologicalMetadata,
  getDatasetMeta,
  getDomainCoverage,
  getDrugMeta,
  getExactMass,
  getInstrument,
  getPeakTable,
  getSpectrumMeta,
  getTermMeta,
  getArticleMeta,
  getConfidence,
  getImageMeta,
  getVideoMeta,
  getDocumentaryMeta,
  getKeywordMeta,
} from "@/lib/detail";
import type { SearchItem, SearchItemType } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const TYPE_ORDER: SearchItemType[] = [
  "Metabolite",
  "Spectrum",
  "Dataset",
  "Domain",
  "Term",
  "Drug",
  "Article",
  "Image",
  "Video",
  "Documentary",
  "Keyword",
];

const TYPE_META: Record<
  SearchItemType,
  {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    short: string;
    accent: string;
    chip: string;
    tone: string;
  }
> = {
  Metabolite: {
    icon: Leaf,
    label: "Metabolites & Bioactives",
    short: "Metabolite",
    accent: "text-rose-600 dark:text-rose-400",
    chip: "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300",
    tone: "border-l-rose-400/70",
  },
  Spectrum: {
    icon: Activity,
    label: "Reference Spectra",
    short: "Spectrum",
    accent: "text-cyan-600 dark:text-cyan-400",
    chip: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-300",
    tone: "border-l-cyan-400/70",
  },
  Dataset: {
    icon: Database,
    label: "Datasets & DOIs",
    short: "Dataset",
    accent: "text-purple-600 dark:text-purple-400",
    chip: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300",
    tone: "border-l-purple-400/70",
  },
  Domain: {
    icon: Globe,
    label: "Biological Domains",
    short: "Domain",
    accent: "text-amber-600 dark:text-amber-400",
    chip: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300",
    tone: "border-l-amber-400/70",
  },
  Term: {
    icon: BookOpen,
    label: "Terms & Annotations",
    short: "Term",
    accent: "text-indigo-600 dark:text-indigo-400",
    chip: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300",
    tone: "border-l-indigo-400/70",
  },
  Drug: {
    icon: Pill,
    label: "Drug Entries",
    short: "Drug",
    accent: "text-emerald-600 dark:text-emerald-400",
    chip: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300",
    tone: "border-l-emerald-400/70",
  },
  Article: {
    icon: FileText,
    label: "Articles & Monographs",
    short: "Article",
    accent: "text-sky-600 dark:text-sky-400",
    chip: "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300",
    tone: "border-l-sky-400/70",
  },
  Image: {
    icon: ImageIcon,
    label: "Images & Micrographs",
    short: "Image",
    accent: "text-fuchsia-600 dark:text-fuchsia-400",
    chip: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/20 dark:text-fuchsia-300",
    tone: "border-l-fuchsia-400/70",
  },
  Video: {
    icon: Video,
    label: "Videos & Methods",
    short: "Video",
    accent: "text-orange-600 dark:text-orange-400",
    chip: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-300",
    tone: "border-l-orange-400/70",
  },
  Documentary: {
    icon: Clapperboard,
    label: "Documentaries",
    short: "Documentary",
    accent: "text-slate-700 dark:text-slate-300",
    chip: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    tone: "border-l-slate-500/70",
  },
  Keyword: {
    icon: Tag,
    label: "Keywords & Topics",
    short: "Keyword",
    accent: "text-teal-600 dark:text-teal-400",
    chip: "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-300",
    tone: "border-l-teal-400/70",
  },
};

const EXAMPLE_QUERIES = [
  "Artemisinin",
  "video",
  "documentary",
  "image",
  "drought",
  "rumen",
  "LC-MS/MS",
  "exometabolome",
  "10.5281/zenodo",
];

const TYPES_WITH_ALL = ["All", ...TYPE_ORDER] as const;
type TypeFilter = (typeof TYPES_WITH_ALL)[number];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, query }: { text: string; query: string }) {
  const tokens = query
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 1);
  if (!tokens.length) return <>{text}</>;

  const pattern = tokens.map(escapeRegExp).join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));
  const lowered = tokens.map((token) => token.toLowerCase());

  return (
    <>
      {parts.map((part, index) =>
        lowered.includes(part.toLowerCase()) ? (
          <mark
            key={index}
            className="rounded bg-rose-100 px-0.5 text-inherit dark:bg-rose-500/25 dark:text-rose-100"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function typeOf(value?: string): SearchItemType | undefined {
  return TYPE_ORDER.find((type) => type === value);
}

function sortForBrowse(items: SearchItem[]) {
  return [...items].sort(
    (a, b) =>
      TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) ||
      a.label.localeCompare(b.label)
  );
}

/* -------------------------------------------------------------------------- */
/* Type-specific previews                                                     */
/* -------------------------------------------------------------------------- */

function MetaLine({ item }: { item: SearchItem }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px]">
      {item.domain && (
        <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {item.domain}
        </span>
      )}
      {item.platform && (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <FlaskConical className="h-2.5 w-2.5" />
          {item.platform}
        </span>
      )}
      {item.creator && (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <Users className="h-2.5 w-2.5" />
          {item.creator}
        </span>
      )}
      {item.duration && (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 font-mono font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <Clock className="h-2.5 w-2.5" />
          {item.duration}
        </span>
      )}
      {item.species && (
        <span className="truncate text-gray-400 dark:text-gray-500">
          {item.species}
        </span>
      )}
    </div>
  );
}

function MiniSpectrum({ item }: { item: SearchItem }) {
  const peaks = getPeakTable(item, 16);
  return (
    <div className="mt-2 flex h-9 items-end gap-[2px] rounded-lg bg-cyan-50/60 px-2 py-1.5 dark:bg-cyan-950/20">
      {peaks.map((peak, index) => (
        <span
          key={index}
          className="w-full rounded-t-sm bg-cyan-500/80"
          style={{ height: `${Math.max(12, peak.intensity)}%` }}
          title={`m/z ${peak.mz.toFixed(3)} · ${peak.intensity}%`}
        />
      ))}
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg bg-gray-50 px-2.5 py-1.5 dark:bg-gray-800/60">
      <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-gray-400">
        {Icon && <Icon className="h-2.5 w-2.5" />}
        {label}
      </p>
      <p className="mt-0.5 truncate font-mono text-[11px] font-semibold text-gray-800 dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}

function TypePreview({
  item,
  variant = "card",
}: {
  item: SearchItem;
  variant?: "card" | "panel";
}) {
  if (item.type === "Metabolite") {
    const formula = item.media?.format === "formula" ? item.media.value : null;
    const exact = getExactMass(item);
    const confidence = getConfidence(item);
    const bio = getBiologicalMetadata(item);
    return (
      <div className="mt-3">
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {formula && <Metric label="Formula" value={formula} />}
          {item.mz != null && (
            <Metric label="Precursor m/z" value={item.mz.toFixed(4)} />
          )}
          {exact != null && (
            <Metric label="Exact mass" value={exact.toFixed(4)} />
          )}
          <Metric label="Platform" value={item.platform ?? "LC-MS/MS"} />
          <Metric label="Instrument" value={getInstrument(item)} />
          {variant === "panel" && (
            <Metric label="Tissue" value={bio.tissue} />
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[10px] font-medium text-gray-400">
            Annotation confidence
          </span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <span
              className="block h-full rounded-full bg-rose-500"
              style={{ width: `${confidence}%` }}
            />
          </span>
          <span className="font-mono text-[10px] font-semibold text-rose-600 dark:text-rose-400">
            {confidence}%
          </span>
        </div>
        {variant === "panel" && (
          <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
            {bio.origin} · {bio.conditions}
          </p>
        )}
      </div>
    );
  }

  if (item.type === "Spectrum") {
    const meta = getSpectrumMeta(item);
    return (
      <div className="mt-3">
        <MiniSpectrum item={item} />
        <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          <Metric label="Precursor" value={item.mz != null ? item.mz.toFixed(3) : "—"} />
          <Metric label="Ion mode" value={meta.polarity} />
          <Metric label="Collision" value={meta.collisionEnergy} />
          <Metric label="Peaks" value={String(meta.peakCount)} />
        </div>
        {variant === "panel" && (
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <Metric label="Base peak m/z" value={meta.basePeak.mz.toFixed(4)} icon={Hash} />
            <Metric label="Library" value={meta.library} icon={Database} />
            <Metric label="Resolution" value={meta.resolution} />
            <Metric label="Acquired" value={meta.acquired} icon={Calendar} />
          </div>
        )}
      </div>
    );
  }

  if (item.type === "Dataset") {
    const meta = getDatasetMeta(item);
    return (
      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        <Metric label="Samples" value={formatNumber(meta.samples)} icon={Users} />
        <Metric label="Features" value={formatNumber(meta.features)} icon={Hash} />
        <Metric label="Files" value={String(meta.files)} icon={Layers} />
        <Metric label="Version" value={meta.version} icon={CircleDot} />
        {variant === "panel" && (
          <>
            <Metric label="License" value={meta.license} />
            <Metric label="Published" value={meta.published} icon={Calendar} />
            <Metric label="Contributor" value={meta.contributor} />
            <Metric label="Source" value={meta.source} />
          </>
        )}
      </div>
    );
  }

  if (item.type === "Domain") {
    const coverage = getDomainCoverage(item.domain ?? item.label);
    return (
      <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
        <Metric label="Entries" value={String(coverage.entries)} />
        <Metric label="Compounds" value={String(coverage.metabolites)} />
        <Metric label="Spectra" value={String(coverage.spectra)} />
        <Metric label="Datasets" value={String(coverage.datasets)} />
        <Metric label="Species" value={String(coverage.species)} />
        {variant === "panel" && (
          <>
            <Metric label="Images" value={String(coverage.images)} />
            <Metric label="Videos" value={String(coverage.videos)} />
            <Metric
              label="Documentaries"
              value={String(coverage.documentaries)}
            />
            <Metric label="Keywords" value={String(coverage.keywords)} />
          </>
        )}
      </div>
    );
  }

  if (item.type === "Term") {
    const meta = getTermMeta(item);
    return (
      <div className="mt-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300">
            {meta.standard}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            Linked to {meta.usedIn.length} records
          </span>
        </div>
        {variant === "panel" && (
          <ul className="mt-2 space-y-1 text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
            {meta.notes.slice(0, 2).map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (item.type === "Drug") {
    const meta = getDrugMeta(item);
    return (
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <Metric label="Class" value={meta.drugClass} />
        <Metric label="Organism" value={item.species ?? "—"} />
        {meta.formula && <Metric label="Formula" value={meta.formula} />}
        <Metric label="Route" value={meta.route} />
        {variant === "panel" && (
          <div className="col-span-2 rounded-lg bg-emerald-50/70 px-2.5 py-1.5 text-[11px] text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-200">
            <span className="font-semibold">Metabolomic readout: </span>
            {meta.marker}
          </div>
        )}
      </div>
    );
  }

  if (item.type === "Image") {
    const meta = getImageMeta(item);
    return (
      <div className="mt-3">
        <div className="flex items-center gap-3 rounded-xl bg-fuchsia-50/60 p-2.5 dark:bg-fuchsia-950/20">
          <ItemVisual item={item} size="lg" />
          <div className="min-w-0">
            <p className="line-clamp-2 text-[11px] font-medium leading-snug text-gray-700 dark:text-gray-200">
              {meta.caption}
            </p>
            <p className="mt-1 text-[10px] text-gray-400">{meta.credit}</p>
          </div>
        </div>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          <Metric label="Format" value={meta.format} />
          <Metric label="Dimensions" value={meta.dimensions} />
          <Metric label="License" value={meta.license} />
          <Metric label="Published" value={meta.published} icon={Calendar} />
        </div>
        {variant === "panel" && (
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <Metric label="Resolution" value={meta.resolution} />
            <Metric label="Source" value={meta.source} />
          </div>
        )}
      </div>
    );
  }

  if (item.type === "Video") {
    const meta = getVideoMeta(item);
    return (
      <div className="mt-3">
        <div className="flex items-center gap-3 rounded-xl bg-orange-50/60 p-2.5 dark:bg-orange-950/20">
          <ItemVisual item={item} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-700 dark:text-orange-300">
              <Play className="h-3 w-3 fill-current" /> {meta.duration}
            </p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-gray-600 dark:text-gray-300">
              {meta.caption}
            </p>
          </div>
        </div>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          <Metric label="Duration" value={meta.duration} icon={Clock} />
          <Metric label="Creator" value={meta.creator} icon={Users} />
          <Metric label="Chapters" value={String(meta.chapters.length)} />
          <Metric label="Published" value={meta.published} icon={Calendar} />
        </div>
        {variant === "panel" && (
          <p className="mt-2 text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
            {meta.transcript}
          </p>
        )}
      </div>
    );
  }

  if (item.type === "Documentary") {
    const meta = getDocumentaryMeta(item);
    return (
      <div className="mt-3">
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-2.5 dark:bg-slate-800/60">
          <ItemVisual item={item} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
              <Film className="h-3 w-3" /> {meta.duration} · {meta.rating}
            </p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-gray-600 dark:text-gray-300">
              {meta.caption}
            </p>
          </div>
        </div>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          <Metric label="Director" value={meta.director} icon={Users} />
          <Metric label="Released" value={String(meta.releasedYear)} icon={Calendar} />
          <Metric label="Chapters" value={String(meta.chapters.length)} />
          <Metric label="Language" value={meta.language.split(",")[0]} />
        </div>
        {variant === "panel" && (
          <p className="mt-2 text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
            {meta.transcript}
          </p>
        )}
      </div>
    );
  }

  if (item.type === "Keyword") {
    const meta = getKeywordMeta(item);
    return (
      <div className="mt-3">
        <div className="flex flex-wrap gap-1.5">
          {meta.keywords.slice(0, 6).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-700 dark:bg-teal-900/20 dark:text-teal-300"
            >
              #{keyword}
            </span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          <Metric label="Mentioned in" value={`${meta.mentions} records`} />
          <Metric label="Domains" value={String(meta.domains.length)} />
          <Metric
            label="Related keywords"
            value={String(meta.relatedKeywords.length)}
          />
          <Metric label="Type" value="Topic" icon={Tag} />
        </div>
        {variant === "panel" && (
          <div className="mt-2 space-y-1">
            {meta.anchorRecords.map((record) => (
              <Link
                key={record.id}
                href={entryHref(record)}
                className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-2 py-1 text-[11px] text-gray-600 transition-colors hover:text-teal-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-teal-300"
              >
                <span className="truncate">{record.label}</span>
                <span className="shrink-0 text-[9px] uppercase text-gray-400">
                  {record.type}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  const meta = getArticleMeta(item);
  return (
    <div className="mt-3">
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        <Metric label="Journal" value={meta.journal} />
        <Metric label="Year" value={String(meta.year)} icon={Calendar} />
        <Metric label="Volume" value={String(meta.volume)} />
        <Metric label="Pages" value={meta.pages} />
      </div>
      {variant === "panel" && (
        <p className="mt-2 text-[11px] leading-relaxed text-gray-600 dark:text-gray-300">
          {meta.abstract}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Result card + knowledge panel                                              */
/* -------------------------------------------------------------------------- */

function TypeBadge({ type }: { type: SearchItemType }) {
  const meta = TYPE_META[type];
  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta.chip}`}
    >
      <Icon className="h-2.5 w-2.5" />
      {meta.short}
    </span>
  );
}

function ResultCard({ item, query }: { item: SearchItem; query: string }) {
  const meta = TYPE_META[item.type];
  return (
    <Link
      href={entryHref(item)}
      className={`group block rounded-2xl border border-transparent border-l-4 bg-white px-4 py-4 transition-all hover:border-gray-200 hover:shadow-sm dark:bg-transparent dark:hover:border-gray-800 dark:hover:bg-gray-900/60 ${meta.tone}`}
    >
      <div className="flex items-start gap-3.5">
        <ItemVisual item={item} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <TypeBadge type={item.type} />
            <span className="truncate text-[10px] text-gray-400 dark:text-gray-500">
              amdb.org{entryHref(item)}
            </span>
            {item.doi && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-gray-100 px-2 py-0.5 font-mono text-[9px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                DOI
              </span>
            )}
          </div>
          <h3 className="mt-1 text-lg font-semibold leading-snug text-gray-900 group-hover:text-rose-600 dark:text-gray-50 dark:group-hover:text-rose-400">
            <Highlight text={item.label} query={query} />
          </h3>
          <p className="mt-0.5 text-sm leading-snug text-gray-600 dark:text-gray-300">
            <Highlight text={item.description} query={query} />
          </p>
          <MetaLine item={item} />
          <TypePreview item={item} />
        </div>
        <ArrowUpRight className="mt-1 hidden h-4 w-4 shrink-0 text-gray-300 transition-colors group-hover:text-rose-500 sm:block" />
      </div>
    </Link>
  );
}

function KnowledgePanel({ item, query }: { item: SearchItem; query: string }) {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;
  return (
    <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/70 px-4 py-2.5 dark:border-gray-800 dark:bg-gray-800/40">
        <Icon className={`h-3.5 w-3.5 ${meta.accent}`} />
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {meta.label}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <ItemVisual item={item} size="lg" />
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
              Top match
            </p>
            <h3 className="mt-0.5 text-base font-bold leading-tight text-gray-900 dark:text-gray-50">
              <Highlight text={item.label} query={query} />
            </h3>
            {item.species && (
              <p className="mt-0.5 text-[11px] italic text-gray-500 dark:text-gray-400">
                {item.species}
              </p>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
          <Highlight text={item.description} query={query} />
        </p>
        <TypePreview item={item} variant="panel" />
        {item.doi && (
          <p className="mt-3 truncate rounded-lg bg-gray-50 px-2.5 py-1.5 font-mono text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            {item.doi}
          </p>
        )}
        <Link
          href={entryHref(item)}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Open full record
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Search field                                                               */
/* -------------------------------------------------------------------------- */

function SearchField({
  id,
  value,
  onChange,
  inputRef,
  size = "lg",
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  size?: "lg" | "sm";
}) {
  const large = size === "lg";
  return (
    <div
      className={`flex items-center gap-2.5 rounded-full border border-gray-200 bg-white transition focus-within:border-rose-300 focus-within:ring-4 focus-within:ring-rose-100 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-rose-500 dark:focus-within:ring-rose-500/10 ${
        large
          ? "px-5 py-3.5 shadow-lg shadow-gray-200/60 dark:shadow-none"
          : "px-4 py-2.5"
      }`}
    >
      <Search
        className={`shrink-0 text-gray-400 ${large ? "h-5 w-5" : "h-4 w-4"}`}
      />
      <input
        id={id}
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={
          large
            ? "Try Artemisinin, a video, a documentary, a keyword, or a DOI..."
            : "Search metabolites, spectra, images, videos, documentaries, keywords..."
        }
        aria-label="Search the African Metabolome Database"
        className={`w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 ${
          large ? "text-base" : "text-sm"
        }`}
        autoComplete="off"
        spellCheck={false}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          aria-label="Clear search"
        >
          <X className={large ? "h-4 w-4" : "h-3.5 w-3.5"} />
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main experience                                                            */
/* -------------------------------------------------------------------------- */

export function SearchExperience({
  initialQuery = "",
  initialType,
  initialDomain,
}: {
  initialQuery?: string;
  initialType?: string;
  initialDomain?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [activeType, setActiveType] = useState<TypeFilter>(
    typeOf(initialType) ?? "All"
  );
  const [activeDomain, setActiveDomain] = useState(initialDomain ?? "");

  const trimmed = query.trim();
  const hasCriteria =
    trimmed.length > 0 || activeType !== "All" || activeDomain.length > 0;

  /* Live results — this is all local, so every keystroke is instant. */
  const matches = useMemo(() => {
    if (!trimmed) return sortForBrowse(SEARCH_INDEX);
    return searchIndex(trimmed, 500);
  }, [trimmed]);

  const domainFiltered = useMemo(
    () =>
      activeDomain
        ? matches.filter((item) => item.domain === activeDomain)
        : matches,
    [matches, activeDomain]
  );

  const results = useMemo(
    () =>
      activeType === "All"
        ? domainFiltered
        : domainFiltered.filter((item) => item.type === activeType),
    [domainFiltered, activeType]
  );

  const typeCounts = useMemo(() => countByType(domainFiltered), [domainFiltered]);
  const domainCounts = useMemo(() => countByDomain(matches), [matches]);

  const topResult = results[0];

  /* Keep the URL shareable without forcing a server round-trip per keystroke. */
  function syncUrl(next: { q: string; type: TypeFilter; domain: string }) {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    const nextQuery = next.q.trim();
    if (nextQuery) params.set("q", nextQuery);
    if (next.type !== "All") params.set("type", next.type);
    if (next.domain) params.set("domain", next.domain);
    const url = params.toString() ? `/search?${params.toString()}` : "/search";
    if (`${window.location.pathname}${window.location.search}` !== url) {
      window.history.replaceState(null, "", url);
    }
  }

  function updateQuery(next: string) {
    setQuery(next);
    syncUrl({ q: next, type: activeType, domain: activeDomain });
  }

  function updateType(next: TypeFilter) {
    setActiveType(next);
    syncUrl({ q: query, type: next, domain: activeDomain });
  }

  function updateDomain(next: string) {
    const value = next === activeDomain ? "" : next;
    setActiveDomain(value);
    syncUrl({ q: query, type: activeType, domain: value });
  }

  function resetFilters() {
    setQuery("");
    setActiveType("All");
    setActiveDomain("");
    syncUrl({ q: "", type: "All", domain: "" });
    inputRef.current?.focus();
  }

  function searchFromEmptyState(next: string) {
    setQuery(next);
    setActiveType("All");
    setActiveDomain("");
    syncUrl({ q: next, type: "All", domain: "" });
  }

  function clearFiltersOnly() {
    setActiveType("All");
    setActiveDomain("");
    syncUrl({ q: query, type: "All", domain: "" });
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && typing) {
        updateQuery("");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  /* ------------------------------------------------------------------ */
  /* Landing page (Google-like)                                          */
  /* ------------------------------------------------------------------ */
  if (!hasCriteria) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-[12vh] sm:px-6">
        <div className="text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-600 dark:bg-rose-900/20 dark:text-rose-400">
            <Sparkles className="h-3 w-3" />
            AMDB Search
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
            Search the African metabolome
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 dark:text-gray-400">
            One live index across metabolites, reference spectra, datasets,
            images, videos, documentaries, keywords, biological domains,
            glossary terms, drugs, and monographs.
          </p>
        </div>

        <div className="mt-8">
          <SearchField
            id="amdb-search-home"
            value={query}
            onChange={updateQuery}
            inputRef={inputRef}
          />
          <p className="mt-2 px-2 text-[11px] text-gray-400">
            Press <kbd className="rounded border border-gray-200 px-1 dark:border-gray-700">/</kbd>{" "}
            anywhere to search · results update as you type
          </p>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {EXAMPLE_QUERIES.slice(0, 6).map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => updateQuery(example)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-rose-200 hover:text-rose-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-rose-900 dark:hover:text-rose-400"
            >
              {example}
            </button>
          ))}
        </div>

        {/* Browse by record type — every possibility is represented. */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Browse by record type
            </h2>
            <span className="text-[11px] text-gray-400">
              {formatNumber(SEARCH_INDEX.length)} indexed entries
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {TYPE_ORDER.map((type) => {
              const meta = TYPE_META[type];
              const Icon = meta.icon;
              const count = SEARCH_INDEX.filter(
                (item) => item.type === type
              ).length;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateType(type)}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 text-left transition-all hover:border-rose-200 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:hover:border-rose-900"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${meta.chip}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-gray-900 group-hover:text-rose-600 dark:text-gray-100 dark:group-hover:text-rose-400">
                      {meta.short}
                    </span>
                    <span className="block text-[11px] text-gray-400">
                      {count} {count === 1 ? "record" : "records"}
                    </span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-rose-500" />
                </button>
              );
            })}
          </div>
        </section>

        {/* Domains */}
        <section className="mt-8">
          <h2 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Explore a biological domain
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Plant Metabolomics",
              "Agricultural Metabolomics",
              "Livestock Metabolomics",
              "Environmental Metabolomics",
              "Human Metabolomics",
            ].map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => updateDomain(domain)}
                className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-amber-300 hover:text-amber-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-amber-800 dark:hover:text-amber-300"
              >
                {domain}
              </button>
            ))}
          </div>
        </section>

        {/* Popular records */}
        <section className="mt-8">
          <h2 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Popular records
          </h2>
          <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
            {popularItems(6).map((item) => (
              <Link
                key={item.id}
                href={entryHref(item)}
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <ItemVisual item={item} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-gray-900 group-hover:text-rose-600 dark:text-gray-100 dark:group-hover:text-rose-400">
                    {item.label}
                  </span>
                  <span className="block truncate text-[11px] text-gray-400">
                    {item.description}
                  </span>
                </span>
                <TypeBadge type={item.type} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Results page                                                       */
  /* ------------------------------------------------------------------ */
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <div className="sticky top-0 z-20 -mx-4 border-b border-gray-200/80 bg-white/95 px-4 py-3 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 sm:-mx-6 sm:px-6">
        <SearchField
          id="amdb-search-results"
          value={query}
          onChange={updateQuery}
          inputRef={inputRef}
          size="sm"
        />

        <div className="mt-3 flex gap-1 overflow-x-auto pb-0.5">
          {TYPES_WITH_ALL.map((type) => {
            const active = activeType === type;
            const count =
              type === "All" ? domainFiltered.length : typeCounts[type];
            const Icon = type === "All" ? SlidersHorizontal : TYPE_META[type].icon;
            return (
              <button
                key={type}
                type="button"
                onClick={() => updateType(type)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-3 w-3" />
                {type === "All" ? "All" : TYPE_META[type].short}
                <span
                  className={`rounded-full px-1.5 text-[10px] ${
                    active
                      ? "bg-white/20"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>
          {trimmed ? (
            <>
              Live results for{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                &ldquo;{trimmed}&rdquo;
              </span>
            </>
          ) : (
            "Browsing the full index"
          )}{" "}
          · {formatNumber(results.length)}{" "}
          {results.length === 1 ? "record" : "records"}
        </span>
        {activeLabel(activeType, activeDomain) && (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 font-medium text-rose-600 dark:bg-rose-900/20 dark:text-rose-300">
            {activeLabel(activeType, activeDomain)}
            <button
              type="button"
              onClick={clearFiltersOnly}
              aria-label="Remove filter"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        {hasCriteria && (
          <button
            type="button"
            onClick={resetFilters}
            className="ml-auto font-medium text-gray-400 transition-colors hover:text-rose-600 dark:hover:text-rose-400"
          >
            Reset search
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item) => (
                <ResultCard key={item.id} item={item} query={trimmed} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-12 text-center dark:border-gray-800">
              <Search className="mx-auto h-8 w-8 text-gray-300" />
              <h2 className="mt-3 text-base font-semibold text-gray-900 dark:text-gray-100">
                No records match this search
              </h2>
              <p className="mx-auto mt-1 max-w-sm text-xs text-gray-500 dark:text-gray-400">
                {activeDomain || activeType !== "All"
                  ? "Try removing the active filter, or search a different term."
                  : "Try a compound name, a crop, an organism, an m/z value, or a DOI fragment."}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {EXAMPLE_QUERIES.slice(0, 5).map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => searchFromEmptyState(example)}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:border-rose-200 hover:text-rose-600 dark:border-gray-800 dark:text-gray-300 dark:hover:border-rose-900 dark:hover:text-rose-400"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 lg:sticky lg:top-[7.5rem] lg:self-start">
          {topResult && <KnowledgePanel item={topResult} query={trimmed} />}

          <aside className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Filter by type
            </h3>
            <ul className="mt-2 space-y-0.5">
              <li>
                <button
                  type="button"
                  onClick={() => updateType("All")}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs ${
                    activeType === "All"
                      ? "bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/60"
                  }`}
                >
                  <span>All types</span>
                  <span className="font-mono text-[10px] text-gray-400">
                    {formatNumber(domainFiltered.length)}
                  </span>
                </button>
              </li>
              {TYPE_ORDER.map((type) => {
                const meta = TYPE_META[type];
                return (
                  <li key={type}>
                    <button
                      type="button"
                      onClick={() => updateType(type)}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs ${
                        activeType === type
                          ? "bg-gray-100 font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/60"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <meta.icon className={`h-3 w-3 ${meta.accent}`} />
                        {meta.short}
                      </span>
                      <span className="font-mono text-[10px] text-gray-400">
                        {typeCounts[type]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {domainCounts.length > 0 && (
            <aside className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Filter by domain
              </h3>
              <ul className="mt-2 space-y-0.5">
                {domainCounts.map(({ domain, count }) => (
                  <li key={domain}>
                    <button
                      type="button"
                      onClick={() => updateDomain(domain)}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-xs ${
                        activeDomain === domain
                          ? "bg-amber-50 font-semibold text-amber-800 dark:bg-amber-900/20 dark:text-amber-200"
                          : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/60"
                      }`}
                    >
                      <span className="truncate">{domain}</span>
                      <span className="font-mono text-[10px] text-gray-400">
                        {count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function activeLabel(type: TypeFilter, domain: string) {
  const parts: string[] = [];
  if (type !== "All") parts.push(TYPE_META[type].short);
  if (domain) parts.push(domain);
  return parts.join(" · ");
}
