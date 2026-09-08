"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { entryHref } from "@/lib/search";
import { ItemVisual } from "@/components/dictionary/ItemVisual";
import type { SearchItem } from "@/lib/types";

export function DictionaryBrowser({ terms }: { terms: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const all = terms.map((t) => t.category ?? "Uncategorised");
    return ["All", ...Array.from(new Set(all))];
  }, [terms]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = terms.filter((t) => {
      const inCategory = category === "All" || t.category === category;
      const matches =
        !q ||
        t.label.toLowerCase().includes(q) ||
        (t.category ?? "").toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return inCategory && matches;
    });

    const map = new Map<string, SearchItem[]>();
    for (const t of filtered) {
      const key = t.category ?? "Uncategorised";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [terms, query, category]);

  const totalByName = (name: string) =>
    terms.filter((t) => (t.category ?? "Uncategorised") === name).length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 transition-colors focus-within:border-rose-300 dark:border-gray-700 dark:bg-gray-800/60 dark:focus-within:border-rose-500">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter features by compound, species, or domain..."
            aria-label="Filter database entries"
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
              category === c
                ? "bg-rose-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {c === "All"
              ? `All (${terms.length})`
              : `${c} (${totalByName(c)})`}
          </button>
        ))}
      </div>

      {groups.length > 0 ? (
        <div className="mt-6 space-y-8">
          {groups.map(([name, items]) => (
            <section key={name}>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                {name}
              </h2>
              <div className="mt-2 divide-y divide-gray-100 rounded-xl border border-gray-100 dark:divide-gray-800 dark:border-gray-800">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={entryHref(item)}
                    className="group flex items-center gap-4 p-4 transition-colors hover:bg-rose-50/50 dark:hover:bg-rose-900/10"
                  >
                    <ItemVisual item={item} size="md" />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-gray-900 group-hover:text-rose-600 dark:text-gray-100 dark:group-hover:text-rose-300">
                          {item.label}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          {item.type}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 group-hover:text-rose-400 dark:text-gray-600" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-10 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No entries match &ldquo;{query}&rdquo; in {category}.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-4 rounded-full bg-gray-900 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}