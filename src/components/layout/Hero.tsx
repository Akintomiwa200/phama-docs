"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  searchIndex,
  entryHref,
  popularItems,
  SEARCH_TYPES,
} from "@/lib/search";
import { ItemVisual } from "@/components/dictionary/ItemVisual";
import { HeroScrambleHeadline } from "@/components/effects/HeroScrambleHeadline";
import type { SearchItem, SearchItemType } from "@/lib/types";

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trimmed = query.trim();

  const suggestions = useMemo(
    () => (trimmed ? searchIndex(query, 30) : popularItems(14)),
    [query, trimmed]
  );
  const isPopular = !trimmed;

  const typeSummary = useMemo(() => {
    const counts = new Map<SearchItemType, number>();
    for (const item of suggestions) {
      counts.set(item.type, (counts.get(item.type) ?? 0) + 1);
    }
    return [...counts.entries()];
  }, [suggestions]);

  const closeSoon = () => {
    if (blurTimer.current) clearTimeout(blurTimer.current);
    blurTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const cancelClose = () => {
    if (blurTimer.current) clearTimeout(blurTimer.current);
  };

  const submit = (value: string) => {
    const q = value.trim();
    setOpen(false);
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  const select = (item: SearchItem) => {
    setOpen(false);
    router.push(entryHref(item));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (suggestions.length ? (i + 1) % suggestions.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        suggestions.length ? (i - 1 + suggestions.length) % suggestions.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && suggestions.length && activeIndex >= 0) {
        select(suggestions[activeIndex]);
      } else {
        submit(query);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <section
      className="
        relative isolate min-h-[100svh] overflow-hidden
        bg-white
        dark:bg-gray-950
        pt-[150px]
        sm:pt-[175px]
        lg:pt-[185px]
      "
    >
      {/* =========================================================
          FIGMA GRADIENT ORB
          ========================================================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute z-0
          left-[50%] top-[135px]
          h-[470px] w-[470px]
          -translate-x-1/2
          sm:top-[145px]
          sm:h-[570px] sm:w-[570px]
          lg:left-[51%]
          lg:top-[110px]
          lg:h-[690px] lg:w-[690px]
          xl:h-[730px] xl:w-[730px]
        "
      >
        {/* Soft pink body */}
        <div
          className="
            absolute inset-0 rounded-full
            opacity-[0.78]
            blur-[35px]
            sm:blur-[45px]
          "
          style={{
            background: `
              radial-gradient(
                circle at 48% 48%,
                rgba(255, 210, 224, 0.92) 0%,
                rgba(255, 222, 232, 0.78) 38%,
                rgba(255, 232, 240, 0.52) 62%,
                rgba(255, 243, 248, 0.22) 78%,
                rgba(255, 255, 255, 0) 100%
              )
            `,
          }}
        />

        {/* Red / pink concentration */}
        <div
          className="
            absolute
            left-[5%] top-[30%]
            h-[55%] w-[55%]
            rounded-full
            blur-[38px]
            sm:blur-[48px]
          "
          style={{
            background: `
              radial-gradient(
                circle at 48% 50%,
                rgba(244, 63, 94, 0.9) 0%,
                rgba(225, 29, 72, 0.6) 22%,
                rgba(251, 113, 133, 0.30) 48%,
                rgba(253, 164, 175, 0) 76%
              )
            `,
          }}
        />

        {/* Cyan / blue edge */}
        <div
          className="
            absolute
            left-[0%] top-[20%]
            h-[42%] w-[24%]
            rounded-full
            blur-[32px]
            sm:blur-[40px]
          "
          style={{
            background: `
              radial-gradient(
                ellipse,
                rgba(91, 190, 255, 0.42) 0%,
                rgba(105, 167, 255, 0.20) 40%,
                rgba(105, 167, 255, 0) 78%
              )
            `,
          }}
        />
      </div>

      {/* =========================================================
          MAIN CONTENT
          ========================================================= */}
      <div
        className="
          relative z-10 mx-auto
          flex w-full max-w-[1280px]
          min-h-[calc(100svh-150px)]
          flex-col
          px-6
          sm:min-h-[calc(100svh-175px)]
          sm:px-8
          lg:min-h-[calc(100svh-185px)]
          lg:px-10
          xl:px-12
        "
      >
        {/* Heading — mono scramble lines (decode poster mechanic) */}
        <HeroScrambleHeadline />

        {/* =======================================================
            SEARCH
            ======================================================= */}
        <div className="flex flex-1 items-center justify-center pb-16">
          <div className="relative w-full max-w-lg">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 p-1.5 pl-4 shadow-xl shadow-rose-500/5 backdrop-blur-xl transition-colors focus-within:border-rose-300 dark:border-gray-700 dark:bg-gray-900/70 dark:focus-within:border-rose-500">
              <Search className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={closeSoon}
                onKeyDown={onKeyDown}
                placeholder="Search metabolites, spectra, images, videos, documentaries, keywords..."
                aria-label="Search the African Metabolome Database"
                aria-autocomplete="list"
                className="w-full bg-transparent py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => submit(query)}
                className="shrink-0 rounded-full bg-gray-900 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Search
              </button>
            </div>

            <p className="mt-2 px-3 text-center text-[10px] text-gray-400 dark:text-gray-500">
              One live index across {SEARCH_TYPES.length} record types · images
              · videos · documentaries · keywords · spectra · datasets
            </p>

            {/* Live suggestions */}
            {open && (
              <div
                role="listbox"
                className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-3xl border border-gray-200 bg-white/90 shadow-2xl shadow-rose-500/10 backdrop-blur-2xl dark:border-gray-700 dark:bg-gray-900/90"
                onMouseDown={cancelClose}
              >
                {suggestions.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2 dark:border-gray-800">
                      <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                        {isPopular
                          ? "Featured across every record type"
                          : `Top matches for “${trimmed}”`}
                      </span>
                      <span className="text-[9px] text-gray-400 dark:text-gray-500">
                        {suggestions.length}
                        {isPopular ? " featured" : " results"}
                      </span>
                    </div>
                    <ul className="max-h-[360px] overflow-y-auto p-2">
                      {suggestions.map((item, i) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={i === activeIndex}
                            onMouseEnter={() => setActiveIndex(i)}
                            onPointerDown={(e) => {
                              e.preventDefault();
                              select(item);
                            }}
                            className={`flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                              i === activeIndex
                                ? "bg-rose-50 dark:bg-rose-900/20"
                                : "bg-transparent"
                            }`}
                          >
                            <ItemVisual item={item} size="sm" />
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-2">
                                <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {item.label}
                                </span>
                                <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                  {item.type}
                                </span>
                                {item.duration && (
                                  <span className="shrink-0 font-mono text-[9px] text-gray-400">
                                    {item.duration}
                                  </span>
                                )}
                              </span>
                              <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-gray-400">
                                {item.description}
                              </span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {!isPopular && typeSummary.length > 0 && (
                      <div className="flex flex-wrap gap-x-2 gap-y-1 border-t border-gray-100 px-4 py-2 text-[9px] uppercase tracking-wide text-gray-400 dark:border-gray-800 dark:text-gray-500">
                        {typeSummary.map(([type, count]) => (
                          <span key={type}>
                            {type} {count}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="border-t border-gray-100 px-4 py-2.5 dark:border-gray-800">
                      <button
                        type="button"
                        onPointerDown={(e) => {
                          e.preventDefault();
                          submit(query);
                        }}
                        className="flex w-full items-center justify-between text-[11px] font-medium text-gray-500 transition-colors hover:text-rose-500 dark:text-gray-400"
                      >
                        <span>
                          {isPopular
                            ? "Browse all records in the database"
                            : `Show all results for “${trimmed}”`}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          Enter
                        </span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="px-5 py-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No matches for “{trimmed}”. Try a compound, a place, a
                      DOI, or browse a record type.
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                      {["Image", "Video", "Documentary", "Keyword"].map(
                        (type) => (
                          <Link
                            key={type}
                            href={`/search?type=${type}`}
                            onPointerDown={cancelClose}
                            className="rounded-full border border-gray-200 px-3 py-1 text-[11px] font-medium text-gray-600 hover:border-rose-200 hover:text-rose-600 dark:border-gray-700 dark:text-gray-300"
                          >
                            {type}s
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* =======================================================
            BOTTOM CONTENT
            ======================================================= */}
        <div
          className="
            flex flex-col
            items-start
            justify-between
            gap-8
            pb-12
            sm:flex-row
            sm:items-end
            lg:pb-14
          "
        >
          {/* Description */}
          <p
            className="
              max-w-[320px]
              text-[10px]
              font-[400]
              leading-[1.3]
              tracking-[-0.01em]
              text-[#66666b]
              dark:text-gray-400
              sm:max-w-[330px]
              lg:text-[11px]
            "
          >
            A multi-domain metabolomics platform capturing interconnected
            biochemical maps across plant, agricultural, livestock,
            environmental, and human ecosystems.
          </p>

          {/* CTA */}
          <Link
            href="/dashboard"
            className="
              inline-flex
              h-[32px]
              items-center
              justify-center
              rounded-full
              bg-[#111111]
              px-[17px]
              text-[10px]
              font-[500]
              tracking-[-0.01em]
              text-white
              transition-all
              duration-200
              hover:bg-black
              hover:scale-[1.02]
              active:scale-[0.98]
              sm:h-[34px]
              sm:px-[18px]
            "
          >
            Explore Domains Hub
          </Link>
        </div>
      </div>
    </section>
  );
}
