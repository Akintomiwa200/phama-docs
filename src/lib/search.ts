import { SEARCH_INDEX } from "./constants";
import type { SearchItem, SearchItemType } from "./types";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function entryHref(item: Pick<SearchItem, "label" | "type">) {
  let segment = "metabolites";
  if (item.type === "Dataset") segment = "datasets";
  else if (item.type === "Spectrum") segment = "spectra";
  else if (item.type === "Domain") segment = "domains";
  else if (item.type === "Term") segment = "terms";
  else if (item.type === "Drug") segment = "drugs";
  else if (item.type === "Article") segment = "articles";

  return `/${segment}/${slugify(item.label)}`;
}

export function segmentToType(segment: string): SearchItemType | undefined {
  if (segment === "metabolites") return "Metabolite";
  if (segment === "datasets") return "Dataset";
  if (segment === "spectra") return "Spectrum";
  if (segment === "domains") return "Domain";
  if (segment === "terms") return "Term";
  if (segment === "drugs") return "Drug";
  if (segment === "articles") return "Article";
  return undefined;
}

export function findEntry(segment: string, slug: string) {
  const type = segmentToType(segment);
  if (!type) return undefined;
  return SEARCH_INDEX.find(
    (item) => item.type === type && slugify(item.label) === slug
  );
}

const POPULAR_IDS = [
  "m-01", // Artemisinin
  "m-03", // Sorghum Dhurrin Stress Signature
  "m-05", // Cattle Rumen Bioactive CLA
  "ds-01", // Pan-African Phytochemical Spectral Library
  "m-02", // Vernolepin
  "m-06", // Sub-Saharan Soil Humic Exometabolite
  "m-08", // Nutritional Isobutyrate
  "m-04", // Rhizosphere Nodulation Flavonoid
];

export function popularItems(limit = 8): SearchItem[] {
  const order = new Map(POPULAR_IDS.map((id, i) => [id, i]));
  return SEARCH_INDEX.filter((item) => order.has(item.id))
    .sort((a, b) => order.get(a.id)! - order.get(b.id)!)
    .slice(0, limit);
}

export function searchIndex(query: string, limit = 8): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const exact = SEARCH_INDEX.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.domain?.toLowerCase().includes(q) ||
      item.species?.toLowerCase().includes(q) ||
      item.doi?.toLowerCase().includes(q)
  );

  const fuzzy = SEARCH_INDEX.filter(
    (item) =>
      !exact.includes(item) &&
      item.description.toLowerCase().includes(q)
  );

  const ranked = [...exact, ...fuzzy].sort((a, b) => {
    const aStarts = a.label.toLowerCase().startsWith(q);
    const bStarts = b.label.toLowerCase().startsWith(q);
    if (aStarts !== bStarts) return aStarts ? -1 : 1;
    return a.label.length - b.label.length;
  });

  return ranked.slice(0, limit);
}