"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Bookmark,
  Copy,
  Check,
  Leaf,
  Database,
  Activity,
  Globe,
  ExternalLink,
  BookOpen,
  Pill,
  FileText,
  FlaskConical,
  MapPin,
  Users,
  Calendar,
  Hash,
  Waves,
  Image as ImageIcon,
  Video,
  Clapperboard,
  Tag,
  Play,
  Clock,
  Film,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { entryHref, searchIndex } from "@/lib/search";
import {
  getRelatedItems,
  getReferences,
  getKeyFacts,
  getConfidence,
  getRetentionTime,
  getIonMode,
  getCollisionEnergy,
  getPeakTable,
  getDomainCoverage,
  getDomainEntries,
  getDatasetMeta,
  formatCitation,
  getBiologicalMetadata,
  getExactMass,
  getInstrument,
  getSpectrumMeta,
  getDatasetRows,
  getFeatureTableStats,
  getTermMeta,
  getDrugMeta,
  getArticleMeta,
  getImageMeta,
  getVideoMeta,
  getDocumentaryMeta,
  getKeywordMeta,
} from "@/lib/detail";
import {
  getMetaboliteRecord,
  getDatasetRecord,
  getFeatureTablesForDomain,
} from "@/lib/enrich";
import { ItemVisual } from "@/components/dictionary/ItemVisual";
import type { SearchItem, SearchItemType } from "@/lib/types";

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

/* -------------------------------------------------------------------------- */
/* Shared chrome                                                              */
/* -------------------------------------------------------------------------- */

function BackLink({ fallbackHref = "/search" }: { fallbackHref?: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <button
        type="button"
        onClick={() => {
          if (typeof window === "undefined") return;
          // Only use browser history when the previous page is another public
          // AMDB page. Going back into the auth flow (or off-site) is wrong.
          const referrer = document.referrer;
          const sameOrigin =
            referrer.startsWith(window.location.origin) &&
            !/\/(login|signup|forgot-password|reset-password)(?:[/?#]|$)/.test(
              referrer
            );
          if (sameOrigin && window.history.length > 1) {
            router.back();
          } else {
            router.push(fallbackHref);
          }
        }}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to search</span>
      </button>
      <Link
        href="/search"
        className="text-xs font-medium text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200"
      >
        Browse all records
      </Link>
    </div>
  );
}

function SidebarSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchIndex(query, 6), [query]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 transition-all focus-within:border-rose-400 focus-within:bg-white dark:border-gray-700 dark:bg-gray-800/60 dark:focus-within:bg-gray-800">
        <Search className="h-4 w-4 shrink-0 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search entries..."
          className="w-full bg-transparent text-xs text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
        />
      </div>
      {query.trim().length > 0 && (
        <div className="absolute inset-x-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          {results.length > 0 ? (
            results.map((res) => (
              <Link
                key={res.id}
                href={entryHref(res)}
                onClick={() => setQuery("")}
                className="flex items-center justify-between rounded-lg p-2 text-xs hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20"
              >
                <span className="font-medium">{res.label}</span>
                <span className="text-[10px] text-gray-400">{res.type}</span>
              </Link>
            ))
          ) : (
            <p className="p-3 text-center text-xs text-gray-400">No matches</p>
          )}
        </div>
      )}
    </div>
  );
}

function ActionRow({ item }: { item: SearchItem }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setSaved(!saved)}
        className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
          saved
            ? "border-rose-500 bg-rose-50 dark:bg-rose-900/30"
            : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800"
        }`}
        title={saved ? "Saved" : "Save"}
      >
        <Bookmark
          className={`h-4 w-4 ${saved ? "fill-rose-600 text-rose-600" : "text-gray-400"}`}
        />
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800"
        title={copied ? "Copied" : "Copy link"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {item.doi && (
        <a
          href={`https://doi.org/${item.doi}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-300"
        >
          DOI <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

function RelatedPanel({ item }: { item: SearchItem }) {
  const related = getRelatedItems(item);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Related entries</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {related.length ? (
          related.map((rel) => (
            <Link
              key={rel.id}
              href={entryHref(rel)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-rose-900/30"
            >
              {rel.label}
              <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                {rel.type}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-xs text-gray-400">No related entries.</p>
        )}
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      {subtitle && (
        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}

const TYPE_ICON: Record<
  SearchItemType,
  React.ComponentType<{ className?: string }>
> = {
  Metabolite: Leaf,
  Dataset: Database,
  Spectrum: Activity,
  Domain: Globe,
  Term: BookOpen,
  Drug: Pill,
  Article: FileText,
  Image: ImageIcon,
  Video,
  Documentary: Clapperboard,
  Keyword: Tag,
};

function TypeBadge({ type }: { type: SearchItemType }) {
  const Icon = TYPE_ICON[type] || Leaf;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
      <Icon className="h-3 w-3" />
      {type}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Metabolite                                                                 */
/* -------------------------------------------------------------------------- */

function MetaboliteDetail({ item }: { item: SearchItem }) {
  const record = getMetaboliteRecord(item);
  const confidence = record?.confidenceScore ?? getConfidence(item);
  const rt = record?.retentionTime ?? getRetentionTime(item);
  const formula =
    record?.formula ??
    (item.media?.format === "formula" ? item.media.value : undefined);
  const mz = record?.mz ?? item.mz;
  const facts = getKeyFacts(item);
  const refs = getReferences(item);
  const bio = getBiologicalMetadata(item);
  const peaks = getPeakTable(item, 10);

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="space-y-4 lg:col-span-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-2">
              <TypeBadge type="Metabolite" />
              <span className="text-[10px] font-medium text-gray-400">
                {item.domain || item.category}
              </span>
            </div>
            <div className="mt-4">
              <SidebarSearch />
            </div>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {item.label}
            </h1>
            {formula && (
              <div className="mt-4 rounded-xl border border-rose-200/70 bg-rose-50/70 p-4 dark:border-rose-900/40 dark:bg-rose-900/20">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Molecular formula
                </p>
                <p className="mt-1 font-mono text-2xl font-bold text-rose-700 dark:text-rose-300">
                  {formula}
                </p>
                {mz != null && (
                  <p className="mt-1 font-mono text-xs text-gray-600 dark:text-gray-400">
                    Precursor m/z {mz.toFixed(4)}
                  </p>
                )}
              </div>
            )}
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {record?.description ?? item.description}
            </p>
            {item.species && (
              <p className="mt-2 text-xs italic text-gray-500">
                Species: {record?.metadata.speciesName ?? item.species}
              </p>
            )}
            <div className="mt-5">
              <ActionRow item={item} />
            </div>
            <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-800">
              <p className="text-xs text-gray-500">Annotation confidence</p>
              <p className="mt-1 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                {typeof confidence === "number" && confidence > 10
                  ? `${confidence.toFixed(1)}%`
                  : `${confidence}/10`}
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-5 lg:col-span-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Platform",
                value: record?.platform ?? item.platform ?? "LC-MS/MS",
                icon: FlaskConical,
              },
              {
                label: "Retention time",
                value: `${rt.toFixed(2)} min`,
                icon: Waves,
              },
              {
                label: "Exact mass",
                value:
                  (record?.exactMass ?? getExactMass(item))?.toFixed(4) ?? "—",
                icon: Hash,
              },
              {
                label: "Ion mode",
                value: getIonMode(item),
                icon: Activity,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <stat.icon className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <Panel
            title="MS/MS fragmentation"
            subtitle={`${getIonMode(item)} · ${getCollisionEnergy(item)} · ${getInstrument(item)}`}
          >
            <div className="mb-4 flex h-36 w-full items-end gap-1">
              {peaks.map((peak) => (
                <span
                  key={peak.mz}
                  className="w-full rounded-t bg-rose-400/80 transition-colors hover:bg-rose-500"
                  style={{ height: `${Math.max(8, peak.intensity)}%` }}
                  title={`m/z ${peak.mz.toFixed(4)} · ${peak.intensity}%`}
                />
              ))}
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {peaks.slice(0, 6).map((peak) => (
                <div
                  key={peak.mz}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-2.5 py-1.5 font-mono text-[10px] text-gray-600 dark:bg-gray-800/60 dark:text-gray-300"
                >
                  <span>m/z {peak.mz.toFixed(4)}</span>
                  <span className="text-gray-400">{peak.intensity}%</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Biological metadata" subtitle="Sample origin & handling">
            <dl className="grid gap-3 sm:grid-cols-2 text-xs">
              {[
                ["Species", record?.metadata.speciesName ?? bio.species],
                ["Tissue", record?.metadata.tissueType ?? bio.tissue],
                ["Geography", record?.metadata.geographicOrigin ?? bio.origin],
                [
                  "Environment",
                  record?.metadata.environmentalConditions ?? bio.conditions,
                ],
                [
                  "Collection",
                  record?.metadata.sampleCollectionMethod ?? bio.collection,
                ],
                ["Storage", record?.metadata.sampleStorageConditions ?? bio.storage],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/60">
                  <dt className="font-semibold text-gray-500 dark:text-gray-400">{k}</dt>
                  <dd className="mt-1 text-gray-800 dark:text-gray-200">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <div className="grid gap-5 md:grid-cols-2">
            <Panel title="Domain highlights" subtitle={`Facts for ${item.label}`}>
              <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300">
                {facts.map((fact, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Database IDs" subtitle="Cross-repository identifiers">
              <ul className="space-y-2 text-xs">
                {(
                  [
                    ["PubChem", record?.databaseIds.pubchem],
                    ["MetaboLights", record?.databaseIds.metaboLights],
                    ["GNPS", record?.databaseIds.gnps],
                    ["DOI", record?.databaseIds.doi ?? item.doi],
                    ["SMILES", record?.structureSmiles],
                  ] as const
                )
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <li
                      key={k}
                      className="flex items-start justify-between gap-3 border-b border-gray-50 pb-2 last:border-0 dark:border-gray-800"
                    >
                      <span className="font-medium text-gray-500">{k}</span>
                      <span className="max-w-[65%] break-all text-right font-mono text-gray-800 dark:text-gray-200">
                        {v}
                      </span>
                    </li>
                  ))}
                {!record && !item.doi && (
                  <li className="text-gray-400">No external IDs linked yet.</li>
                )}
              </ul>
            </Panel>
          </div>

          <Panel title="Citations & sources">
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              {refs.map((ref, i) => (
                <li key={i} className="border-t border-gray-50 pt-2 first:border-0 first:pt-0 dark:border-gray-800">
                  {ref}
                </li>
              ))}
            </ul>
          </Panel>

          <RelatedPanel item={item} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Spectrum                                                                   */
/* -------------------------------------------------------------------------- */

function SpectrumDetail({ item }: { item: SearchItem }) {
  const spectrum = getSpectrumMeta(item);
  const peaks = spectrum.peaks;
  const chartPeaks = peaks.map((p) => ({
    mz: p.mz.toFixed(2),
    intensity: p.intensity,
  }));
  const confidence = getConfidence(item);

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="rounded-2xl border border-cyan-200/60 bg-gradient-to-br from-cyan-50 via-white to-white p-6 dark:border-cyan-900/40 dark:from-cyan-950/40 dark:via-gray-950 dark:to-gray-950">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <TypeBadge type="Spectrum" />
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {item.label}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
          </div>
          <ActionRow item={item} />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Platform", item.platform ?? "LC-MS/MS"],
            ["Precursor m/z", item.mz != null ? item.mz.toFixed(4) : "—"],
            ["Collision energy", spectrum.collisionEnergy],
            ["Ion mode", spectrum.ionMode],
            ["Fragment peaks", String(spectrum.peakCount)],
            ["Library match", `${confidence}%`],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-xl border border-cyan-100 bg-white/80 px-3 py-3 dark:border-cyan-900/30 dark:bg-gray-900/70"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-400">
                {k}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">
                {v}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <Panel
          title="Fragmentation spectrum"
          subtitle="Relative intensity vs m/z"
          className="lg:col-span-3"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartPeaks}>
                <XAxis
                  dataKey="mz"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "#fff",
                  }}
                />
                <Bar dataKey="intensity" radius={[4, 4, 0, 0]}>
                  {chartPeaks.map((_, i) => (
                    <Cell key={i} fill={i % 3 === 0 ? "#06b6d4" : "#67e8f9"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Peak table" subtitle="Top fragments" className="lg:col-span-2">
          <div className="max-h-64 overflow-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-white text-gray-400 dark:bg-gray-900">
                <tr>
                  <th className="pb-2 font-medium">m/z</th>
                  <th className="pb-2 font-medium">Intensity %</th>
                </tr>
              </thead>
              <tbody className="font-mono text-gray-800 dark:text-gray-200">
                {peaks.map((p) => (
                  <tr key={p.mz} className="border-t border-gray-50 dark:border-gray-800">
                    <td className="py-1.5">{p.mz.toFixed(4)}</td>
                    <td className="py-1.5">{p.intensity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Panel title="Acquisition context" subtitle={getInstrument(item)}>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            <li>Species / matrix: {item.species ?? "Not specified"}</li>
            <li>Domain: {item.domain ?? item.category ?? "—"}</li>
            <li>Spectral library: {spectrum.library}</li>
            <li>Base peak: m/z {spectrum.basePeak.mz.toFixed(4)} at {spectrum.basePeak.intensity}%</li>
            <li>Resolution: {spectrum.resolution} · acquired {spectrum.acquired}</li>
            <li>Retention time window: {getRetentionTime(item).toFixed(2)} min</li>
          </ul>
        </Panel>
        <RelatedPanel item={item} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Dataset                                                                    */
/* -------------------------------------------------------------------------- */

function DatasetDetail({ item }: { item: SearchItem }) {
  const record = getDatasetRecord(item);
  const meta = getDatasetMeta(item);
  const stats = getFeatureTableStats(item);
  const preview = getDatasetRows(item, 6);
  const citation = record?.citationFormat ?? formatCitation(item);
  const tables = getFeatureTablesForDomain(item.domain);

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="overflow-hidden rounded-2xl border border-purple-200/70 bg-white dark:border-purple-900/40 dark:bg-gray-900">
        <div className="border-b border-purple-100 bg-purple-50/80 px-6 py-5 dark:border-purple-900/30 dark:bg-purple-950/30">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <TypeBadge type="Dataset" />
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {record?.title ?? item.label}
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-300">
                {record?.metadataDescription ?? item.description}
              </p>
            </div>
            <ActionRow item={item} />
          </div>
          {(record?.doi ?? item.doi) && (
            <a
              href={`https://doi.org/${record?.doi ?? item.doi}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-mono text-xs font-semibold text-purple-700 shadow-sm dark:bg-gray-950 dark:text-purple-300"
            >
              DOI: {record?.doi ?? item.doi}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <div className="grid gap-px bg-gray-100 sm:grid-cols-2 lg:grid-cols-4 dark:bg-gray-800">
          {[
            {
              icon: Users,
              label: "Samples",
              value: String(record?.sampleCount ?? meta.samples),
            },
            {
              icon: Database,
              label: "Feature tables",
              value: String(record?.featureTableCount ?? meta.files),
            },
            {
              icon: Hash,
              label: "Detected features",
              value: meta.features.toLocaleString(),
            },
            {
              icon: Calendar,
              label: "Published",
              value: record?.publicationDate ?? meta.published,
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-5 dark:bg-gray-900">
              <div className="flex items-center gap-2 text-purple-500">
                <stat.icon className="h-4 w-4" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
              <p className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Panel title="Citation" className="lg:col-span-2">
          <blockquote className="rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700 dark:bg-gray-800/60 dark:text-gray-200">
            {citation}
          </blockquote>
          <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
            <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
              <p className="font-semibold text-gray-500">Institution</p>
              <p className="mt-1 text-gray-800 dark:text-gray-200">
                {record?.institution ?? meta.institution}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
              <p className="font-semibold text-gray-500">License / source</p>
              <p className="mt-1 text-gray-800 dark:text-gray-200">
                {meta.license} · {record?.publicSource ?? meta.source}
              </p>
            </div>
          </div>
          {record?.authors && (
            <p className="mt-4 text-xs text-gray-500">
              Authors: {record.authors.join(", ")}
            </p>
          )}
        </Panel>

        <Panel title="Coverage">
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            <li>Domain: {item.domain ?? "Multi-domain"}</li>
            <li>Category: {item.category ?? "Dataset"}</li>
            <li>Version: {stats.version}</li>
            <li>Contributor: {stats.contributor}</li>
            <li>Species: {stats.species}</li>
            <li>QC samples: {stats.qcSamples}</li>
            <li>Missing-value rate: {stats.missingRate}</li>
          </ul>
        </Panel>
      </div>

      <Panel
        title="Feature table preview"
        subtitle={`${preview.length} of ${stats.features.toLocaleString()} aligned features`}
      >
        <div className="overflow-auto">
          <table className="w-full min-w-[520px] text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] uppercase tracking-wide text-gray-400 dark:border-gray-800">
                <th className="pb-2 pr-3 font-semibold">Feature</th>
                <th className="pb-2 pr-3 font-semibold">m/z</th>
                <th className="pb-2 pr-3 font-semibold">RT (min)</th>
                <th className="pb-2 pr-3 font-semibold">Intensity</th>
                <th className="pb-2 font-semibold">Annotation</th>
              </tr>
            </thead>
            <tbody className="font-mono text-gray-700 dark:text-gray-300">
              {preview.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-gray-50 last:border-0 dark:border-gray-800/70"
                >
                  <td className="py-2 pr-3 text-purple-600 dark:text-purple-400">
                    {row.feature}
                  </td>
                  <td className="py-2 pr-3">{row.mz.toFixed(4)}</td>
                  <td className="py-2 pr-3">{row.rt.toFixed(2)}</td>
                  <td className="py-2 pr-3">{formatNumber(row.intensity)}</td>
                  <td className="py-2 font-sans text-gray-600 dark:text-gray-400">
                    {row.annotation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {tables.length > 0 && (
        <Panel title="Linked feature tables" subtitle="Related open tables in this domain">
          <div className="grid gap-3 md:grid-cols-2">
            {tables.slice(0, 4).map((ft) => (
              <div
                key={ft.id}
                className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {ft.title}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {ft.sampleCount} samples · {ft.detectedFeatures.toLocaleString()} features
                </p>
                <p className="mt-2 font-mono text-[10px] text-purple-600 dark:text-purple-400">
                  {ft.doi}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      )}

      <RelatedPanel item={item} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Domain                                                                     */
/* -------------------------------------------------------------------------- */

function DomainDetail({ item }: { item: SearchItem }) {
  const domain = item.domain || item.label;
  const coverage = getDomainCoverage(domain);
  const entries = getDomainEntries(domain);
  const facts = getKeyFacts({ ...item, domain: domain as SearchItem["domain"] });
  const refs = getReferences({ ...item, domain: domain as SearchItem["domain"] });

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-emerald-50/40 p-6 dark:border-amber-900/40 dark:from-amber-950/30 dark:via-gray-950 dark:to-emerald-950/20">
        <TypeBadge type="Domain" />
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          {item.label}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-300">
          {item.description}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Entries", coverage.entries],
            ["Metabolites", coverage.metabolites],
            ["Spectra", coverage.spectra],
            ["Datasets", coverage.datasets],
            ["Species", coverage.species],
          ].map(([k, v]) => (
            <div
              key={k as string}
              className="rounded-xl border border-amber-100 bg-white/80 px-3 py-3 dark:border-amber-900/30 dark:bg-gray-900/70"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                {k}
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Domain focus" subtitle="What this map covers">
          <ul className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300">
            {facts.map((fact, i) => (
              <li key={i} className="flex gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Reference frameworks">
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            {refs.map((ref, i) => (
              <li key={i} className="border-t border-gray-50 pt-2 first:border-0 first:pt-0 dark:border-gray-800">
                {ref}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Indexed entries in this domain">
        {entries.length ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {entries.map((entry) => (
              <Link
                key={entry.id}
                href={entryHref(entry)}
                className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2.5 text-sm transition-colors hover:border-amber-200 hover:bg-amber-50/50 dark:border-gray-800 dark:hover:border-amber-900/40 dark:hover:bg-amber-950/20"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {entry.label}
                </span>
                <span className="text-[10px] uppercase text-gray-400">{entry.type}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400">No indexed entries yet for this domain.</p>
        )}
      </Panel>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Term / Drug / Article                                                      */
/* -------------------------------------------------------------------------- */

function TermDetail({ item }: { item: SearchItem }) {
  const facts = getKeyFacts(item);
  const term = getTermMeta(item);
  return (
    <div className="space-y-4">
      <BackLink />
      <article className="mx-auto max-w-2xl">
        <TypeBadge type="Term" />
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          {item.label}
        </h1>
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-400">
          {item.category ?? "Annotation term"} · {item.domain ?? "AMDB glossary"}
        </p>
        <div className="mt-8 rounded-2xl border-l-4 border-rose-500 bg-white p-6 shadow-sm dark:bg-gray-900">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-500">
            Definition
          </p>
          <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-200">
            {item.description}
          </p>
        </div>
        <Panel title="How AMDB uses this term" className="mt-5">
          <p className="mb-3 inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300">
            {term.standard}
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {term.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </Panel>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Panel title="Related terms">
            <div className="flex flex-wrap gap-2">
              {term.relatives.map((rel) => (
                <Link
                  key={rel.id}
                  href={entryHref(rel)}
                  className="rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300"
                >
                  {rel.label}
                </Link>
              ))}
            </div>
          </Panel>
          <Panel title="Appears in">
            <ul className="space-y-1.5 text-xs">
              {term.usedIn.map((rel) => (
                <li key={rel.id}>
                  <Link
                    href={entryHref(rel)}
                    className="flex items-center justify-between gap-2 rounded-lg px-1 py-1 text-gray-600 transition-colors hover:text-indigo-700 dark:text-gray-300 dark:hover:text-indigo-300"
                  >
                    <span className="truncate">{rel.label}</span>
                    <span className="shrink-0 text-[10px] uppercase text-gray-400">
                      {rel.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel title="Domain context" className="mt-5">
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
            {facts.map((fact, i) => (
              <li key={i}>• {fact}</li>
            ))}
          </ul>
        </Panel>
        <div className="mt-5">
          <RelatedPanel item={item} />
        </div>
      </article>
    </div>
  );
}

function DrugDetail({ item }: { item: SearchItem }) {
  const drug = getDrugMeta(item);
  const formula = drug.formula ?? undefined;
  const facts = getKeyFacts(item);

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="grid gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/40 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <TypeBadge type="Drug" />
            <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              {item.label}
            </h1>
            <p className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {item.category ?? "Therapeutic entry"}
            </p>
            {formula && (
              <p className="mt-4 font-mono text-xl font-bold text-emerald-800 dark:text-emerald-300">
                {formula}
                {drug.exactMass != null && (
                  <span className="ml-2 text-xs font-medium text-emerald-600/70 dark:text-emerald-400/70">
                    {drug.exactMass.toFixed(4)} Da
                  </span>
                )}
              </p>
            )}
            <p className="mt-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
              {drug.drugClass}
            </p>
            {item.species && (
              <p className="mt-1 text-xs italic text-gray-500">
                Primary organism: {item.species}
              </p>
            )}
            <div className="mt-5">
              <ActionRow item={item} />
            </div>
          </div>
        </aside>
        <div className="space-y-5 lg:col-span-8">
          <Panel title="Clinical / pharmacological note">
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {item.description}
            </p>
          </Panel>
          <Panel title="Pharmacology profile">
            <dl className="grid gap-3 text-xs sm:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/60">
                <dt className="font-semibold text-gray-500 dark:text-gray-400">
                  Target / use
                </dt>
                <dd className="mt-1 text-gray-800 dark:text-gray-200">
                  {drug.target}
                </dd>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/60">
                <dt className="font-semibold text-gray-500 dark:text-gray-400">
                  Route
                </dt>
                <dd className="mt-1 text-gray-800 dark:text-gray-200">
                  {drug.route}
                </dd>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800/60">
                <dt className="font-semibold text-gray-500 dark:text-gray-400">
                  Metabolomic readout
                </dt>
                <dd className="mt-1 text-gray-800 dark:text-gray-200">
                  {drug.marker}
                </dd>
              </div>
            </dl>
          </Panel>
          <Panel title="Metabolomic relevance">
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              {facts.map((fact, i) => (
                <li key={i}>• {fact}</li>
              ))}
            </ul>
            {drug.related.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                {drug.related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={entryHref(rel)}
                    className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300"
                  >
                    {rel.label}
                  </Link>
                ))}
              </div>
            )}
          </Panel>
          <RelatedPanel item={item} />
        </div>
      </div>
    </div>
  );
}

function ArticleDetail({ item }: { item: SearchItem }) {
  const refs = getReferences(item);
  const article = getArticleMeta(item);

  return (
    <div className="space-y-4">
      <BackLink />
      <article className="mx-auto max-w-3xl rounded-2xl border border-sky-200/60 bg-white p-6 sm:p-8 dark:border-sky-900/40 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TypeBadge type="Article" />
          <ActionRow item={item} />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
          {item.category ?? "Monograph"} · {article.journal} · {article.year}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {item.label}
        </h1>
        <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
          {article.authors.join(", ")} · Volume {article.volume}, pp{" "}
          {article.pages}
        </p>
        <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {item.description}
        </p>
        {item.doi && (
          <a
            href={`https://doi.org/${item.doi}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-50 px-4 py-3 font-mono text-xs font-semibold text-sky-800 transition-colors hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300"
          >
            {item.doi}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <Panel title="Abstract" className="mt-6">
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {article.abstract}
          </p>
        </Panel>
        <Panel title="Key findings" className="mt-5">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {article.findings.map((finding) => (
              <li key={finding} className="flex gap-2">
                <span className="mt-0.5 text-sky-500">✦</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Linked records" className="mt-5">
          <div className="flex flex-wrap gap-2">
            {article.related.map((rel) => (
              <Link
                key={rel.id}
                href={entryHref(rel)}
                className="rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300"
              >
                {rel.label}
              </Link>
            ))}
          </div>
        </Panel>
        <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-800">
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            Related reading & frameworks
          </h2>
          <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-gray-300">
            {refs.map((ref, i) => (
              <li key={i}>{ref}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <RelatedPanel item={item} />
        </div>
      </article>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Images / video / documentary / keyword                                     */
/* -------------------------------------------------------------------------- */

function KeywordChips({ keywords }: { keywords: string[] }) {
  if (!keywords.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-medium text-teal-700 dark:bg-teal-900/20 dark:text-teal-300"
        >
          #{keyword}
        </span>
      ))}
    </div>
  );
}

function MetadataGrid({
  rows,
}: {
  rows: Array<[string, string | number | undefined]>;
}) {
  return (
    <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-800/60"
        >
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            {label}
          </dt>
          <dd className="mt-0.5 truncate text-xs font-medium text-gray-800 dark:text-gray-200">
            {value ?? "—"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ImageDetail({ item }: { item: SearchItem }) {
  const meta = getImageMeta(item);
  const facts = getKeyFacts(item);

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-fuchsia-200/70 bg-white dark:border-fuchsia-900/40 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3 dark:border-gray-800">
              <TypeBadge type="Image" />
              <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                {item.category ?? "Image record"}
              </span>
            </div>
            <div className="flex min-h-[300px] items-center justify-center bg-gradient-to-br from-fuchsia-100 via-rose-50 to-white p-10 dark:from-fuchsia-950/40 dark:via-gray-900 dark:to-gray-900">
              <ItemVisual item={item} size="lg" />
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                {meta.caption}
              </p>
              <p className="mt-2 text-[11px] text-gray-400">
                Credit: {meta.credit}
              </p>
            </div>
          </div>

          <Panel title="What this image shows" className="mt-4">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
            <ul className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
              {facts.map((fact, i) => (
                <li key={i}>• {fact}</li>
              ))}
            </ul>
          </Panel>

          <div className="mt-4">
            <RelatedPanel item={item} />
          </div>
        </div>

        <aside className="space-y-4 lg:col-span-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
              {item.label}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
            {item.species && (
              <p className="mt-3 text-xs italic text-gray-500">
                Subject: {item.species}
              </p>
            )}
            <div className="mt-5">
              <ActionRow item={item} />
            </div>
          </div>

          <Panel title="Image metadata" subtitle={meta.source}>
            <MetadataGrid
              rows={[
                ["Format", meta.format],
                ["Dimensions", meta.dimensions],
                ["Resolution", meta.resolution],
                ["Colour mode", meta.colourMode],
                ["License", meta.license],
                ["Creator", meta.creator],
                ["Published", meta.published],
                ["Domain", item.domain],
              ]}
            />
          </Panel>

          <Panel title="Keywords">
            <KeywordChips keywords={meta.keywords} />
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function VideoDetail({ item }: { item: SearchItem }) {
  const meta = getVideoMeta(item);
  const facts = getKeyFacts(item);

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-orange-200/70 bg-white dark:border-orange-900/40 dark:bg-gray-900">
            <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500">
              <ItemVisual item={item} size="lg" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-orange-600 shadow-xl">
                  <Play className="h-7 w-7 fill-current" />
                </span>
              </span>
              <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 font-mono text-[11px] text-white">
                {meta.duration}
              </span>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <TypeBadge type="Video" />
                <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  {item.category ?? "Methods video"}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                {item.label}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3 w-3" /> {meta.creator}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {meta.published}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {meta.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Film className="h-3 w-3" /> {meta.resolution}
                </span>
              </div>
            </div>
          </div>

          <Panel title="Transcript excerpt" subtitle="Searchable captions" className="mt-4">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {meta.transcript}
            </p>
            <p className="mt-3 text-[11px] text-gray-400">
              Captions: {meta.captions} · Format: {meta.format}
            </p>
          </Panel>

          <Panel title="Chapters" subtitle="Jump points" className="mt-4">
            <ol className="space-y-2">
              {meta.chapters.map((chapter) => (
                <li
                  key={chapter}
                  className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-700 dark:bg-gray-800/60 dark:text-gray-200"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300">
                    <Play className="h-3 w-3 fill-current" />
                  </span>
                  {chapter}
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="Why this video matters" className="mt-4">
            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              {facts.map((fact, i) => (
                <li key={i}>• {fact}</li>
              ))}
            </ul>
          </Panel>

          <div className="mt-4">
            <RelatedPanel item={item} />
          </div>
        </div>

        <aside className="space-y-4 lg:col-span-4">
          <Panel title="Video metadata" subtitle={meta.source}>
            <MetadataGrid
              rows={[
                ["Duration", meta.duration],
                ["Creator", meta.creator],
                ["Published", meta.published],
                ["Resolution", meta.resolution],
                ["Format", meta.format],
                ["Domain", item.domain],
              ]}
            />
            <div className="mt-4">
              <ActionRow item={item} />
            </div>
          </Panel>
          <Panel title="Keywords">
            <KeywordChips keywords={meta.keywords} />
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function DocumentaryDetail({ item }: { item: SearchItem }) {
  const meta = getDocumentaryMeta(item);
  const facts = getKeyFacts(item);

  return (
    <div className="space-y-4">
      <BackLink />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-slate-300/70 bg-white dark:border-slate-700 dark:bg-gray-900">
            <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
              <ItemVisual item={item} size="lg" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-xl">
                  <Play className="h-7 w-7 fill-current" />
                </span>
              </span>
              <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 font-mono text-[11px] text-white">
                {meta.duration}
              </span>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <TypeBadge type="Documentary" />
                <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  {item.category ?? "Documentary"}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                {item.label}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <Clapperboard className="h-3 w-3" /> {meta.director}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {meta.releasedYear}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {meta.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Film className="h-3 w-3" /> {meta.rating}
                </span>
              </div>
            </div>
          </div>

          <Panel title="Synopsis" className="mt-4">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {meta.caption}
            </p>
            <ul className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
              {facts.map((fact, i) => (
                <li key={i}>• {fact}</li>
              ))}
            </ul>
          </Panel>

          <Panel title="Chapters" subtitle="Story outline" className="mt-4">
            <ol className="space-y-2">
              {meta.chapters.map((chapter) => (
                <li
                  key={chapter}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-gray-700 dark:bg-slate-800/60 dark:text-gray-200"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                    <Play className="h-3 w-3 fill-current" />
                  </span>
                  {chapter}
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="Transcript excerpt" className="mt-4">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {meta.transcript}
            </p>
          </Panel>

          <div className="mt-4">
            <RelatedPanel item={item} />
          </div>
        </div>

        <aside className="space-y-4 lg:col-span-4">
          <Panel title="Film metadata" subtitle={meta.source}>
            <MetadataGrid
              rows={[
                ["Director", meta.director],
                ["Released", meta.releasedYear],
                ["Runtime", meta.duration],
                ["Rating", meta.rating],
                ["Language", meta.language],
                ["Aspect ratio", meta.aspectRatio],
                ["Domain", item.domain],
              ]}
            />
            <div className="mt-4">
              <ActionRow item={item} />
            </div>
          </Panel>
          <Panel title="Keywords">
            <KeywordChips keywords={meta.keywords} />
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function KeywordDetail({ item }: { item: SearchItem }) {
  const meta = getKeywordMeta(item);
  const facts = getKeyFacts(item);

  return (
    <div className="space-y-4">
      <BackLink />
      <article className="mx-auto max-w-4xl">
        <TypeBadge type="Keyword" />
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          {item.label}
        </h1>
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-400">
          {meta.category} · {item.domain ?? "All domains"}
        </p>

        <div className="mt-6 rounded-2xl border-l-4 border-teal-500 bg-white p-6 shadow-sm dark:bg-gray-900">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Keyword definition
          </p>
          <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-200">
            {item.description}
          </p>
          <div className="mt-4">
            <KeywordChips keywords={meta.keywords} />
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <Panel title="Mentioned in" subtitle={`${meta.mentions} linked records`}>
            <ul className="space-y-1.5 text-xs">
              {meta.related.slice(0, 6).map((record) => (
                <li key={record.id}>
                  <Link
                    href={entryHref(record)}
                    className="flex items-center justify-between gap-2 rounded-lg px-1 py-1 text-gray-600 transition-colors hover:text-teal-700 dark:text-gray-300 dark:hover:text-teal-300"
                  >
                    <span className="truncate">{record.label}</span>
                    <span className="shrink-0 text-[9px] uppercase text-gray-400">
                      {record.type}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Domain spread">
            <ul className="space-y-1.5 text-xs">
              {meta.domains.map((entry) => (
                <li
                  key={entry.domain}
                  className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-2 py-1.5 text-gray-600 dark:bg-gray-800/60 dark:text-gray-300"
                >
                  <span className="truncate">{entry.domain}</span>
                  <span className="font-mono text-[10px] text-gray-400">
                    {entry.count}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Related keywords">
            <div className="flex flex-wrap gap-1.5">
              {meta.relatedKeywords.map((keyword) => (
                <Link
                  key={keyword.id}
                  href={entryHref(keyword)}
                  className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-medium text-teal-700 transition-colors hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-300"
                >
                  {keyword.label}
                </Link>
              ))}
            </div>
          </Panel>
        </div>

        <Panel title="Why this keyword matters" className="mt-5">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {facts.map((fact, i) => (
              <li key={i}>• {fact}</li>
            ))}
          </ul>
        </Panel>

        <div className="mt-5">
          <RelatedPanel item={item} />
        </div>
      </article>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Router                                                                     */
/* -------------------------------------------------------------------------- */

export function EntryDetail({ item }: { item: SearchItem }) {
  switch (item.type) {
    case "Metabolite":
      return <MetaboliteDetail item={item} />;
    case "Spectrum":
      return <SpectrumDetail item={item} />;
    case "Dataset":
      return <DatasetDetail item={item} />;
    case "Domain":
      return <DomainDetail item={item} />;
    case "Term":
      return <TermDetail item={item} />;
    case "Drug":
      return <DrugDetail item={item} />;
    case "Article":
      return <ArticleDetail item={item} />;
    case "Image":
      return <ImageDetail item={item} />;
    case "Video":
      return <VideoDetail item={item} />;
    case "Documentary":
      return <DocumentaryDetail item={item} />;
    case "Keyword":
      return <KeywordDetail item={item} />;
    default:
      return <TermDetail item={item} />;
  }
}
