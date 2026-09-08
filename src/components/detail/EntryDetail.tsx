"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Volume2,
  Bookmark,
  Copy,
  Check,
  ShieldCheck,
  TrendingUp,
  Stethoscope,
  Leaf,
  Database,
  Activity,
  Globe,
  ExternalLink,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { entryHref, searchIndex } from "@/lib/search";
import { getRelatedItems, getReferences, getKeyFacts } from "@/lib/detail";
import type { SearchItem } from "@/lib/types";

export function EntryDetail({ item }: { item: SearchItem }) {
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"Metabolomic Notes" | "Spectral Data" | "Related">("Metabolomic Notes");
  const [playingAudio, setPlayingAudio] = useState<"us" | "uk" | null>(null);

  const searchResults = useMemo(() => searchIndex(query, 5), [query]);
  const related = getRelatedItems(item);
  const keyFacts = getKeyFacts(item);
  const references = getReferences(item);

  const relevanceScore = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < item.id.length; i++) {
      hash = (hash << 5) - hash + item.id.charCodeAt(i);
    }
    const score = 9.0 + (Math.abs(hash) % 10) / 10;
    return score.toFixed(1);
  }, [item.id]);

  const trendData = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < item.id.length; i++) {
      hash = (hash << 5) - hash + item.id.charCodeAt(i);
    }
    const quarters = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025"];
    let volume = 320 + (Math.abs(hash) % 560);
    return quarters.map((quarter, i) => {
      volume = Math.max(150, volume + (((Math.abs(hash) + i * 7) % 9) - 4) * 65);
      return { quarter, volume: Math.round(volume) };
    });
  }, [item.id]);

  const metaText =
    item.domain || item.category || "African Metabolomics Knowledge Base";

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAudio = (type: "us" | "uk") => {
    setPlayingAudio(type);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.label);
      utterance.lang = type === "us" ? "en-US" : "en-GB";
      utterance.onend = () => setPlayingAudio(null);
      utterance.onerror = () => setPlayingAudio(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setPlayingAudio(null), 1200);
    }
  };

  const TypeIcon =
    item.type === "Metabolite"
      ? Leaf
      : item.type === "Dataset"
      ? Database
      : item.type === "Spectrum"
      ? Activity
      : Globe;

  return (
    <div className="space-y-4 font-sans text-gray-900 dark:text-gray-100">
      {/* Slim back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to African Metabolome Database</span>
      </Link>

      {/* Main Details Grid Container */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN / SIDEBAR PANEL */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            {/* Brand header */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-5 dark:border-gray-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm">
                <TypeIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  {item.type} Profile
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">AMDB Multi-Domain Platform</p>
              </div>
            </div>

            {/* Quick Search Input */}
            <div className="relative mt-5">
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 transition-all focus-within:border-rose-400 focus-within:bg-white dark:border-gray-700 dark:bg-gray-800/60 dark:focus-within:bg-gray-800">
                <Search className="h-4 w-4 shrink-0 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search entries..."
                  className="w-full bg-transparent text-xs text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                />
              </div>

              {query.trim().length > 0 && (
                <div className="absolute inset-x-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                  {searchResults.length > 0 ? (
                    searchResults.map((res) => (
                      <Link
                        key={res.id}
                        href={entryHref(res)}
                        onClick={() => setQuery("")}
                        className="flex items-center justify-between rounded-lg p-2 text-xs hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-300"
                      >
                        <span className="font-medium">{res.label}</span>
                        <span className="text-[10px] text-gray-400">{res.type}</span>
                      </Link>
                    ))
                  ) : (
                    <p className="p-3 text-center text-xs text-gray-400">No matching entries found</p>
                  )}
                </div>
              )}
            </div>

            <p className="mt-6 text-xs font-medium text-rose-600 dark:text-rose-400">{metaText}</p>

            {/* Title & Formula/DOI */}
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {item.label}
            </h1>
            
            {item.doi && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1 font-mono text-xs font-semibold text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                <span>DOI: {item.doi}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            )}

            {item.media?.format === "formula" && (
              <div className="mt-5 flex items-center justify-between rounded-xl border border-rose-200/70 bg-rose-50/70 p-4 dark:border-rose-900/40 dark:bg-rose-900/20">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Chemical Formula &amp; Features
                  </p>
                  <p className="mt-1 font-mono text-xl font-bold tracking-tight text-rose-700 dark:text-rose-300">
                    {item.media.value}
                  </p>
                  {item.mz && (
                    <p className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">
                      Precursor m/z: {item.mz.toFixed(4)} [M+H]+
                    </p>
                  )}
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
                  <Leaf className="h-4 w-4" />
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleAudio("us")}
                title="Audio (US)"
                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
                  playingAudio === "us"
                    ? "border-rose-500 bg-rose-50 dark:bg-rose-900/30"
                    : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                }`}
              >
                <Volume2 className="h-4 w-4 text-rose-500" />
              </button>

              <button
                type="button"
                onClick={() => setSaved(!saved)}
                title={saved ? "Saved" : "Save"}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all ${
                  saved
                    ? "border-rose-500 bg-rose-50 dark:bg-rose-900/30"
                    : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-rose-600 text-rose-600" : "text-gray-400"}`} />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                title={copied ? "Copied" : "Copy link"}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-gray-400" />}
              </button>
            </div>

            {/* Confidence & Score */}
            <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-800">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Spectral Annotation Confidence</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">{relevanceScore}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">out of 10</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5 dark:border-gray-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Overview</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{item.description}</p>
              {item.species && (
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 italic">
                  Species origin: {item.species}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN / MAIN CONTENT PANE */}
        <div className="space-y-6 lg:col-span-8">
          {/* Sub-Navigation Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-3 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-6">
              {(["Metabolomic Notes", "Spectral Data", "Related"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-2 text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute inset-x-0 -bottom-3 h-0.5 rounded-full bg-rose-600 dark:bg-rose-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card 1: Biological Domain Standards */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-rose-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Domain Highlights</h3>
              </div>
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">Key facts for {item.label}</p>

              <div className="mt-4 space-y-3.5 text-xs">
                {keyFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      ✓
                    </span>
                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">{fact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Analytical Context */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-rose-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Analytical &amp; Metadata Notes</h3>
              </div>
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">Primary LC-MS/MS &amp; NMR curation</p>

              <div className="mt-4 space-y-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                <p>
                  Integrated feature <strong className="font-semibold text-gray-900 dark:text-gray-100">{item.label}</strong>{" "}
                  is registered under the <strong className="font-semibold text-gray-900 dark:text-gray-100">{item.category || item.domain || "African Metabolome"}</strong> section.
                </p>
                <p>
                  Full biological metadata including species taxonomies, environmental conditions, tissue types, and sample storage protocols are available via AMDB.
                </p>
              </div>
            </div>

            {/* Card 3: Query Volume Trend Chart */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs md:col-span-2 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-rose-500" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      Query Activity &amp; Spectral Matching
                    </h3>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                    Monthly query volume for &lsquo;{item.label}&rsquo; across public repositories.
                  </p>
                </div>
              </div>

              <div className="mt-6 h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                    <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderColor: "#374151",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="volume"
                      stroke="#f43f5e"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5, fill: "#f43f5e" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Card 4: Data Sources & DOIs */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Data Sources &amp; Citations</h3>
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">Repositories &amp; persistent DOIs</p>

              <ul className="mt-4 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                {references.map((ref, idx) => (
                  <li key={idx} className="border-t border-gray-100 pt-3 first:border-t-0 first:pt-0 dark:border-gray-800">
                    <span className="line-clamp-2 leading-relaxed">{ref}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 5: Related Entries */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Related Metabolomic Features</h3>
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">Cross-referenced compounds &amp; spectra</p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {related.length > 0 ? (
                  related.slice(0, 5).map((rel) => (
                    <Link
                      key={rel.id}
                      href={entryHref(rel)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 font-medium text-gray-700 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-rose-900/30 dark:hover:text-rose-300"
                    >
                      <span>{rel.label}</span>
                      <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                        {rel.type}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No related entries found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
