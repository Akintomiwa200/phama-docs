import { SEARCH_INDEX } from "./constants";
import type { SearchItem, SearchItemType } from "./types";

export const SEARCH_TYPES: SearchItemType[] = [
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

const TYPE_SEGMENTS: Record<SearchItemType, string> = {
  Metabolite: "metabolites",
  Dataset: "datasets",
  Spectrum: "spectra",
  Domain: "domains",
  Term: "terms",
  Drug: "drugs",
  Article: "articles",
  Image: "images",
  Video: "videos",
  Documentary: "documentaries",
  Keyword: "keywords",
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function entryHref(item: Pick<SearchItem, "label" | "type">) {
  return `/${TYPE_SEGMENTS[item.type]}/${slugify(item.label)}`;
}

export function segmentToType(segment: string): SearchItemType | undefined {
  return SEARCH_TYPES.find((type) => TYPE_SEGMENTS[type] === segment);
}

export function findEntry(segment: string, slug: string) {
  const type = segmentToType(segment);
  if (!type) return undefined;
  return SEARCH_INDEX.find(
    (item) => item.type === type && slugify(item.label) === slug
  );
}

/* -------------------------------------------------------------------------- */
/* Featured records                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Hand-picked starting points, deliberately mixed across every record type so
 * the home page never feels restricted to metabolites alone.
 */
const FEATURED_IDS = [
  "m-01", // Artemisinin
  "dc-01", // Documentary
  "vd-01", // Methods video
  "im-01", // Micrograph
  "kw-01", // Keyword
  "ds-01", // Dataset
  "p-01", // Spectrum
  "kw-04", // Ethnopharmacology keyword
  "d-01", // Domain
  "dr-01", // Drug
  "ar-01", // Article
  "t-01", // Term
  "vd-04", // GNPS tutorial
  "im-03", // Field photo
  "dc-03", // Rivers of Carbon
  "kw-02", // Rumen fermentation
  "m-03", // Sorghum dhurrin
  "ds-03", // Zebu dataset
  "e-01", // Lake Victoria spectrum
  "kw-08", // One Health
];

export function popularItems(limit = 8): SearchItem[] {
  const byId = new Map(SEARCH_INDEX.map((item) => [item.id, item]));
  const featured = FEATURED_IDS.map((id) => byId.get(id)).filter(
    (item): item is SearchItem => Boolean(item)
  );

  const seen = new Set(featured.map((item) => item.id));
  const remaining = SEARCH_INDEX.filter((item) => !seen.has(item.id));

  // Round-robin the rest by type so a larger limit still stays diverse.
  const buckets = SEARCH_TYPES.map((type) =>
    remaining.filter((item) => item.type === type)
  );
  const filled: SearchItem[] = [];
  let index = 0;
  while (filled.length < remaining.length) {
    for (const bucket of buckets) {
      if (bucket[index]) filled.push(bucket[index]);
    }
    index += 1;
  }

  return [...featured, ...filled].slice(0, limit);
}

export function featuredByType(limitPerType = 1): SearchItem[] {
  return SEARCH_TYPES.flatMap((type) =>
    SEARCH_INDEX.filter((item) => item.type === type).slice(0, limitPerType)
  );
}

/* -------------------------------------------------------------------------- */
/* Matching                                                                   */
/* -------------------------------------------------------------------------- */

function haystack(item: SearchItem): string {
  const media = item.media;
  return [
    item.label,
    item.type,
    item.category,
    item.domain,
    item.species,
    item.doi,
    item.platform,
    item.description,
    item.creator,
    item.duration,
    item.publishedAt,
    item.source,
    item.transcript,
    ...(item.keywords ?? []),
    ...(item.chapters ?? []),
    media && "motif" in media ? media.motif : "",
    media && "caption" in media ? media.caption : "",
    media?.format === "formula" ? media.value : "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/**
 * Simple English plural folding so "videos" finds "Video", "images" finds
 * "Image", and "documentaries" finds "Documentary".
 */
function tokenVariants(token: string): string[] {
  const variants = new Set([token]);
  if (token.endsWith("ies") && token.length > 3) {
    variants.add(`${token.slice(0, -3)}y`);
  }
  if (token.endsWith("s") && !token.endsWith("ss")) {
    variants.add(token.slice(0, -1));
  } else {
    variants.add(`${token}s`);
  }
  return [...variants];
}

export function tokenize(query: string): string[] {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * Ranked, token-aware search. Every whitespace-separated token has to appear
 * somewhere in the record, so "sorghum drought" finds the sorghum drought
 * entry while still ranking exact label matches first.
 */
export function searchIndex(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const tokens = tokenize(q);

  const scored = SEARCH_INDEX.map((item) => {
    const hay = haystack(item);
    const keywordText = (item.keywords ?? []).join(" ").toLowerCase();
    const creator = item.creator?.toLowerCase() ?? "";
    const transcript = item.transcript?.toLowerCase() ?? "";
    const label = item.label.toLowerCase();
    const species = item.species?.toLowerCase() ?? "";
    const category = item.category?.toLowerCase() ?? "";
    const domain = item.domain?.toLowerCase() ?? "";
    const doi = item.doi?.toLowerCase() ?? "";
    const type = item.type.toLowerCase();

    if (
      !tokens.every((token) =>
        tokenVariants(token).some((variant) => hay.includes(variant))
      )
    ) {
      return null;
    }

    let score = 0;
    if (label === q) score += 120;
    else if (label.startsWith(q)) score += 70;
    else if (label.includes(q)) score += 40;

    for (const token of tokens) {
      const variants = tokenVariants(token);
      const matches = (field: string) =>
        variants.some((variant) => field.includes(variant));

      if (variants.some((variant) => label === variant)) score += 20;
      if (matches(label)) score += 10;
      if (matches(keywordText)) score += 9;
      if (matches(creator)) score += 6;
      if (matches(species)) score += 6;
      if (matches(doi)) score += 6;
      if (matches(category)) score += 5;
      if (matches(type)) score += 5;
      if (matches(domain)) score += 4;
      if (matches(transcript)) score += 2;
      if (matches(item.description.toLowerCase())) score += 1;
    }

    return { item, score };
  }).filter((entry): entry is { item: SearchItem; score: number } => entry !== null);

  return scored
    .sort(
      (a, b) =>
        b.score - a.score || a.item.label.length - b.item.label.length
    )
    .slice(0, limit)
    .map((entry) => entry.item);
}

/* -------------------------------------------------------------------------- */
/* Facets                                                                     */
/* -------------------------------------------------------------------------- */

export function countByType(items: SearchItem[]): Record<SearchItemType, number> {
  const counts = Object.fromEntries(
    SEARCH_TYPES.map((type) => [type, 0])
  ) as Record<SearchItemType, number>;
  for (const item of items) counts[item.type] += 1;
  return counts;
}

export function countByDomain(items: SearchItem[]): Array<{ domain: string; count: number }> {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (!item.domain) continue;
    counts.set(item.domain, (counts.get(item.domain) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count);
}

export function groupByType(
  items: SearchItem[]
): Array<{ type: SearchItemType; items: SearchItem[] }> {
  return SEARCH_TYPES.map((type) => ({
    type,
    items: items.filter((item) => item.type === type),
  })).filter((group) => group.items.length > 0);
}
