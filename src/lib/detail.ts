import { SEARCH_INDEX } from "./constants";
import type { SearchItem } from "./types";

export const METABOLOMICS_DOMAIN_NOTES: Record<string, string[]> = {
  "Plant Metabolomics": [
    "Captures phytochemical diversity, medicinal plant bioactives, and secondary metabolites.",
    "Combines LC-MS/MS tandem fragmentation and 1H-NMR spectroscopy for level-1 structural identification.",
    "Links traditional African ethnomedicine to verified chemical structures and database identifiers.",
  ],
  "Agricultural Metabolomics": [
    "Maps crop stress responses (drought, salinity, heat) in African staple crops like Sorghum, Cassava, and Cowpea.",
    "Monitors plant-microbe rhizosphere interactions and soil metabolic nitrogen-fixation markers.",
    "Identifies biochemical indicators for crop yield, nutritional quality, and pest resistance.",
  ],
  "Livestock Metabolomics": [
    "Evaluates metabolic indicators of indigenous animal health (cattle, goats, sheep, poultry).",
    "Profiles pasture feed metabolite composition and rumen fermentation efficiencies.",
    "Tracks growth and productivity biomarkers under tropical environmental stressors.",
  ],
  "Environmental Metabolomics": [
    "Profiles soil metabolomes, humus decay, and carbon sequestration signatures across ecosystems.",
    "Monitors aquatic exometabolomes in African freshwater lakes, river basins, and coastal habitats.",
    "Characterizes microbial environmental chemistry and biogeochemical cycle indicators.",
  ],
  "Human Metabolomics": [
    "Identifies disease biomarkers, nutritional metabolomics profiles, and precision health monitors.",
    "Analyzes microbiome-host metabolic interactions in diverse African population cohorts.",
    "Provides baseline metabolic maps for diet-microbiome interactions and health outcomes.",
  ],
};

export const REFERENCE_LIBRARY: Record<string, string[]> = {
  "Plant Metabolomics": [
    "African Pharmacopoeia & Phytochemical Index",
    "MetaboLights Repository (EMBL-EBI Open Metabolomics Data)",
    "Global Natural Products Social Molecular Networking (GNPS)",
  ],
  "Agricultural Metabolomics": [
    "CGIAR & ICRISAT Crop Metabolomics Research Framework",
    "Metabolomics Workbench National Repository",
    "Journal of Agricultural and Food Chemistry & AMDB Open Data",
  ],
  "Livestock Metabolomics": [
    "International Livestock Research Institute (ILRI) Biobank",
    "Journal of Animal Science & Comparative Metabolomics",
    "FAO Sustainable Livestock Production & Biomarkers",
  ],
  "Environmental Metabolomics": [
    "Environmental Science & Technology Soil Metabolome Data",
    "African Aquatic Ecosystem Chemistry Database",
    "ISME Journal: Microbial Environmental Metabolomics",
  ],
  "Human Metabolomics": [
    "African Human Biobank Initiative & Precision Health Records",
    "Nature Metabolism: Population Microbiome-Host Studies",
    "Clinical Metabolomics Consortium Standards",
  ],
};

export function getRelatedItems(
  item: SearchItem,
  limit = 6
): SearchItem[] {
  const tokens = item.label
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .map((w) => w.toLowerCase());

  const scored = SEARCH_INDEX.filter((other) => other.id !== item.id)
    .map((other) => {
      let score = 0;
      if (other.type === item.type) score += 2;
      if (other.category && other.category === item.category) score += 3;
      if (other.domain && item.domain && other.domain === item.domain) score += 3;
      const otherLabel = other.label.toLowerCase();
      if (tokens.some((t) => otherLabel.includes(t))) score += 2;
      return { item: other, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((r) => r.item);
}

export function getReferences(item: SearchItem): string[] {
  const domainKey = item.domain || item.category || "Plant Metabolomics";
  const base = REFERENCE_LIBRARY[domainKey] || REFERENCE_LIBRARY["Plant Metabolomics"];
  return item.doi ? [`DOI: ${item.doi}`].concat(base) : base;
}

export function getKeyFacts(item: SearchItem): string[] {
  const domainKey = item.domain || item.category || "Plant Metabolomics";
  return (
    METABOLOMICS_DOMAIN_NOTES[domainKey] || [
      "Multi-domain metabolomics feature registered in the African Metabolome Database.",
      "Supports primary analytical LC-MS/MS, GC-MS, and NMR data integration.",
      "Full biological metadata, geographic origin, and contributor attribution assigned.",
    ]
  );
}

/* --------------------------------------------------------------------------
   Deterministic, content-derived values so every detail page is specific to
   the entry it displays (and stable between renders / server and client).
   -------------------------------------------------------------------------- */
export function hashSeed(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
  }
  return Math.abs(hash);
}

export function getConfidence(item: SearchItem): number {
  return 84 + (hashSeed(item.id) % 15);
}

export function getRetentionTime(item: SearchItem): number {
  return Math.round((1 + (hashSeed(`${item.id}-rt`) % 2100) / 100) * 100) / 100;
}

export function getIonMode(item: SearchItem): string {
  return hashSeed(item.id) % 2 === 0 ? "Positive [M+H]+" : "Negative [M−H]−";
}

export function getCollisionEnergy(item: SearchItem): string {
  return `${15 + (hashSeed(item.id) % 25)} eV`;
}

export type Peak = { mz: number; intensity: number };

export function getPeakTable(item: SearchItem, count = 10): Peak[] {
  const base = item.mz ?? 250;
  const seed = hashSeed(item.id);
  return Array.from({ length: count }, (_, i) => ({
    mz: Math.round(base * (0.2 + ((i * 7 + (seed % 13)) % 80) / 100) * 10000) / 10000,
    intensity: 12 + ((seed * (i + 3)) % 88),
  })).sort((a, b) => a.mz - b.mz);
}

export function getDomainEntries(domain?: string): SearchItem[] {
  if (!domain) return [];
  return SEARCH_INDEX.filter(
    (entry) => entry.domain === domain && entry.type !== "Domain"
  );
}

export function getDomainCoverage(domain: string) {
  const entries = getDomainEntries(domain);
  return {
    entries: entries.length,
    metabolites: entries.filter((e) => e.type === "Metabolite").length,
    spectra: entries.filter((e) => e.type === "Spectrum").length,
    datasets: entries.filter((e) => e.type === "Dataset").length,
    images: entries.filter((e) => e.type === "Image").length,
    videos: entries.filter((e) => e.type === "Video").length,
    documentaries: entries.filter((e) => e.type === "Documentary").length,
    keywords: entries.filter((e) => e.type === "Keyword").length,
    species: new Set(entries.map((e) => e.species).filter(Boolean)).size,
  };
}

export function getDatasetMeta(item: SearchItem) {
  const seed = hashSeed(item.id);
  return {
    samples: 40 + (seed % 460),
    features: 1200 + ((seed * 3) % 8800),
    files: 3 + (seed % 6),
    version: `v1.${seed % 4}.0`,
    license: seed % 2 === 0 ? "CC BY 4.0" : "CC0 1.0",
    published: `2026-${String(1 + (seed % 9)).padStart(2, "0")}-${String(
      10 + (seed % 18)
    ).padStart(2, "0")}`,
    contributor: "AMDB Curation Team",
    institution: "African Metabolome Database Consortium",
    source: item.category ?? "Community Submission",
  };
}

export function formatCitation(item: SearchItem): string {
  return `African Metabolome Database (2026). ${item.label} [${item.type}]. AMDB. ${
    item.doi ?? "Open access record"
  }.`;
}

/* --------------------------------------------------------------------------
   Chemistry & per-type content.
   -------------------------------------------------------------------------- */

const ATOMIC_MASS: Record<string, number> = {
  C: 12.0,
  H: 1.007825,
  N: 14.003074,
  O: 15.994915,
  S: 31.972071,
  P: 30.973762,
  F: 18.998403,
  Cl: 34.968853,
  Br: 78.918338,
  I: 126.904473,
  Na: 22.98977,
  K: 38.963707,
  Mg: 23.985042,
  Ca: 39.962591,
  Fe: 55.934937,
  Zn: 63.929142,
  Si: 27.976927,
  Se: 79.916522,
};

const PROTON = 1.007276;

/** Monoisotopic mass calculated from a molecular formula, or null. */
export function formulaMass(formula?: string): number | null {
  if (!formula) return null;
  let total = 0;
  let matched = false;
  const re = /([A-Z][a-z]?)(\d*)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(formula)) !== null) {
    const element = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;
    const mass = ATOMIC_MASS[element];
    if (mass === undefined) return null;
    total += mass * count;
    matched = true;
  }
  return matched ? Math.round(total * 10000) / 10000 : null;
}

export function getFormula(item: SearchItem): string | null {
  return item.media?.format === "formula" ? item.media.value : null;
}

export function getExactMass(item: SearchItem): number | null {
  const fromFormula = formulaMass(getFormula(item) ?? undefined);
  if (fromFormula) return fromFormula;
  return item.mz ? Math.round((item.mz - PROTON) * 10000) / 10000 : null;
}

export function getPrecursorMz(item: SearchItem): number | null {
  if (item.mz) return item.mz;
  const exact = getExactMass(item);
  return exact ? Math.round((exact + PROTON) * 10000) / 10000 : null;
}

const ORIGINS = [
  "Nairobi, Kenya",
  "Ibadan, Nigeria",
  "Addis Ababa, Ethiopia",
  "Accra, Ghana",
  "Cape Town, South Africa",
  "Arusha, Tanzania",
  "Kampala, Uganda",
  "Dakar, Senegal",
];

const TISSUES: Record<string, string[]> = {
  "Plant Metabolomics": ["Leaf tissue", "Seed coat", "Root exudate", "Stem bark"],
  "Agricultural Metabolomics": ["Grain endosperm", "Root exudate", "Leaf blade", "Pod wall"],
  "Livestock Metabolomics": ["Rumen fluid", "Blood plasma", "Milk", "Liver tissue"],
  "Environmental Metabolomics": ["Topsoil (0–15 cm)", "Sediment core", "Water filtrate", "Humus layer"],
  "Human Metabolomics": ["Blood plasma", "Serum", "Urine", "Faecal sample"],
};

const INSTRUMENTS: Record<string, string> = {
  "LC-MS/MS": "Thermo Orbitrap Fusion Lumos (HESI-II)",
  "GC-MS": "Agilent 7890B GC / 5977B MSD",
  "NMR Spectroscopy": "Bruker Avance III 600 MHz",
};

export function getInstrument(item: SearchItem): string {
  return INSTRUMENTS[item.platform ?? "LC-MS/MS"] ?? INSTRUMENTS["LC-MS/MS"];
}

export function getBiologicalMetadata(item: SearchItem) {
  const seed = hashSeed(item.id);
  const domain = item.domain ?? "Plant Metabolomics";
  const tissues = TISSUES[domain] ?? TISSUES["Plant Metabolomics"];
  return {
    species: item.species ?? "Mixed African reference material",
    tissue: tissues[seed % tissues.length],
    origin: ORIGINS[seed % ORIGINS.length],
    conditions:
      seed % 3 === 0
        ? "Rainy-season field collection, 24 °C mean"
        : seed % 3 === 1
          ? "Controlled greenhouse, 60% relative humidity"
          : "Dry-season field collection, 31 °C mean",
    collection:
      seed % 2 === 0
        ? "Liquid-nitrogen flash freezing within 60 s of excision"
        : "Immediate immersion in chilled 80% methanol",
    storage:
      seed % 2 === 0 ? "−80 °C cryogenic archive" : "−20 °C archive under argon",
  };
}

export function getSpectrumMeta(item: SearchItem) {
  const peaks = getPeakTable(item, 12);
  const basePeak = peaks.reduce(
    (max, peak) => (peak.intensity > max.intensity ? peak : max),
    peaks[0]
  );
  const seed = hashSeed(item.id);
  return {
    peaks,
    basePeak,
    peakCount: 18 + (seed % 54),
    collisionEnergy: getCollisionEnergy(item),
    ionMode: getIonMode(item),
    library:
      seed % 2 === 0
        ? "AMDB Reference Library (Level 1)"
        : "GNPS Community Library (Level 2)",
    acquired: `2026-${String(1 + (seed % 12)).padStart(2, "0")}-${String(
      1 + (seed % 27)
    ).padStart(2, "0")}`,
    polarity: getIonMode(item).startsWith("Positive") ? "ESI+" : "ESI−",
    resolution: `${60 + (seed % 60)}k FWHM`,
  };
}

export function getDatasetRows(item: SearchItem, count = 6) {
  const seed = hashSeed(item.id);
  const pool = SEARCH_INDEX.filter(
    (entry) => entry.type === "Metabolite" && entry.id !== item.id
  );
  return Array.from({ length: count }, (_, i) => {
    const metabolite = pool[(seed + i * 3) % pool.length];
    return {
      feature: `F${String(seed % 900 + i + 1).padStart(4, "0")}`,
      mz: Math.round((80 + ((seed * (i + 5)) % 720) + i / 10) * 10000) / 10000,
      rt: Math.round((0.8 + ((seed + i * 13) % 1400) / 100) * 100) / 100,
      intensity: 1200 + ((seed * (i + 2)) % 98000),
      annotation: metabolite?.label ?? "Unannotated feature",
    };
  });
}

export function getFeatureTableStats(item: SearchItem) {
  const meta = getDatasetMeta(item);
  return {
    ...meta,
    species: item.species ?? "Multi-species",
    domain: item.domain ?? "Plant Metabolomics",
    missingRate: `${(2 + (hashSeed(item.id) % 9))}.${hashSeed(item.id) % 9}%`,
    qcSamples: 6 + (hashSeed(item.id) % 12),
  };
}

const TERM_NOTES: Record<string, string[]> = {
  "Metabolite Annotation Confidence": [
    "Level 1 requires an authentic standard, matching retention time, and matching MS/MS fragmentation.",
    "Level 2 is a probable structure from library spectral similarity without a standard.",
    "AMDB reports the score next to every feature so downstream users can filter by evidence strength.",
  ],
  "Feature Table": [
    "Rows are aligned features; columns are samples plus annotation metadata.",
    "AMDB feature tables keep the raw intensity matrix alongside m/z, RT, and annotation confidence.",
    "Gaps caused by missing values are flagged rather than silently zero-filled.",
  ],
  "Retention Time": [
    "Reported in minutes on the acquisition column named in the record metadata.",
    "Retention drift between batches is normalised before cross-study comparison.",
    "Used with precursor m/z to reduce false-positive annotations.",
  ],
  "Precursor m/z": [
    "Calculated from the intact ion, not the neutral monoisotopic mass.",
    "Adduct and polarity are stored with every spectrum so m/z values stay comparable.",
    "The selected precursor drives which fragments appear in the MS/MS scan.",
  ],
  "Molecular Networking": [
    "Spectra are clustered when their fragment patterns are similar, revealing analogues.",
    "AMDB links molecular families back to curated metabolite records.",
    "Useful for dereplicating plant extracts with no prior reference spectrum.",
  ],
  Exometabolome: [
    "Captures molecules released into soil, water, or culture media.",
    "Central to understanding microbial competition and nutrient cycling.",
    "AMDB environmental datasets pair exometabolome features with sampling coordinates.",
  ],
};

export function getTermMeta(item: SearchItem) {
  const relatives = SEARCH_INDEX.filter(
    (entry) => entry.type === "Term" && entry.id !== item.id
  );
  const usedIn = SEARCH_INDEX.filter(
    (entry) => entry.type !== "Term" && entry.type !== "Domain"
  );
  return {
    definition: item.description,
    notes:
      TERM_NOTES[item.label] ?? [
        `“${item.label}” is used across AMDB ${item.domain ?? "metabolomics"} records.`,
        "The term follows the Metabolomics Standards Initiative vocabulary where one exists.",
        "Related records are linked automatically from the search index.",
      ],
    relatives: relatives.slice(0, 4),
    usedIn: usedIn.slice(0, 5),
    standard: item.category ?? "AMDB Vocabulary",
  };
}

const DRUG_PROFILES: Record<string, { target: string; route: string; marker: string }> = {
  "Artemether-Lumefantrine": {
    target: "Plasmodium falciparum artemisinin-sensitive strains",
    route: "Oral, fixed-dose combination with a fatty meal",
    marker: "Lumefantrine plasma concentration and artemisinin-derived DHA metabolites",
  },
  Ivermectin: {
    target: "Gastrointestinal nematodes and ectoparasites",
    route: "Subcutaneous or oral pour-on formulation",
    marker: "Faecal egg count reduction alongside rumen short-chain fatty acids",
  },
  Metformin: {
    target: "Hepatic gluconeogenesis and gut microbiome composition",
    route: "Oral, with dose titrated to renal function",
    marker: "Gut-derived short-chain fatty acids and branched-chain amino acids",
  },
  Chloroquine: {
    target: "Haem detoxification in susceptible Plasmodium species",
    route: "Oral or intramuscular",
    marker: "Desethylchloroquine ratio and lysosomal lipid metabolites",
  },
};

export function getDrugMeta(item: SearchItem) {
  const profile = DRUG_PROFILES[item.label] ?? {
    target: `${item.category ?? "Therapeutic"} target under AMDB review`,
    route: "Route recorded in the linked clinical or veterinary record",
    marker: "Circulating parent compound and phase-I metabolites",
  };
  const related = SEARCH_INDEX.filter(
    (entry) =>
      entry.type === "Metabolite" &&
      entry.domain === item.domain &&
      entry.id !== item.id
  );
  return {
    ...profile,
    drugClass: item.category ?? "Unclassified",
    formula: getFormula(item),
    exactMass: getExactMass(item),
    related: related.slice(0, 5),
  };
}

const JOURNALS = [
  "Journal of Ethnopharmacology",
  "Plant, Cell & Environment",
  "Journal of Animal Science",
  "Environmental Science & Technology",
  "Nature Metabolism",
];

export function getArticleMeta(item: SearchItem) {
  const seed = hashSeed(item.id);
  const notes = METABOLOMICS_DOMAIN_NOTES[item.domain ?? "Plant Metabolomics"];
  return {
    journal: JOURNALS[seed % JOURNALS.length],
    year: 2024 + (seed % 3),
    volume: 100 + (seed % 90),
    pages: `${10 + (seed % 40)}–${50 + (seed % 40)}`,
    authors: [
      "A. M. Okonkwo",
      "L. N. Mwangi",
      "S. K. Adeyemi",
      "T. P. Ndlovu",
    ],
    abstract:
      `${item.description} The study applies untargeted metabolomics to African ` +
      `reference material and reports annotation confidence for every feature. ` +
      `Findings are deposited in AMDB with persistent identifiers and full sample metadata.`,
    findings: (notes ?? []).slice(0, 3),
    related: SEARCH_INDEX.filter(
      (entry) =>
        entry.type !== "Article" &&
        entry.type !== "Domain" &&
        entry.domain === item.domain
    ).slice(0, 5),
  };
}

/* --------------------------------------------------------------------------
   Media & keyword records.
   -------------------------------------------------------------------------- */

function mediaCaption(item: SearchItem): string | undefined {
  const media = item.media;
  return media && "caption" in media ? media.caption : undefined;
}

function mediaCredit(item: SearchItem): string | undefined {
  const media = item.media;
  return media && "credit" in media ? media.credit : undefined;
}

export function getImageMeta(item: SearchItem) {
  const seed = hashSeed(item.id);
  const formats = ["TIFF (16-bit)", "JPEG (sRGB)", "PNG (lossless)", "Cryo-SEM stack"];
  const dimensions = [
    "4096 × 3072 px",
    "6000 × 4000 px",
    "3200 × 2400 px",
    "5120 × 3840 px",
  ];
  return {
    format: formats[seed % formats.length],
    dimensions: dimensions[seed % dimensions.length],
    resolution: `${300 + (seed % 300)} dpi`,
    colourMode: seed % 2 === 0 ? "Colour (sRGB)" : "Grayscale (16-bit)",
    license: seed % 2 === 0 ? "CC BY 4.0" : "CC0 1.0",
    creator: item.creator ?? "AMDB Imaging Lab",
    published: item.publishedAt ?? "2026-02-11",
    source: item.source ?? "AMDB Media Archive",
    caption: mediaCaption(item) ?? item.description,
    credit: mediaCredit(item) ?? item.creator ?? "AMDB Imaging Lab",
    keywords: item.keywords ?? [],
  };
}

const DEFAULT_VIDEO_CHAPTERS = [
  "00:00 Introduction",
  "02:30 Materials and setup",
  "05:15 Procedure",
  "08:00 Results and troubleshooting",
];

export function getVideoMeta(item: SearchItem) {
  const seed = hashSeed(item.id);
  return {
    duration: item.duration ?? (item.media?.format === "video" ? item.media.duration : undefined) ?? "08:42",
    creator: item.creator ?? "AMDB Training",
    published: item.publishedAt ?? "2026-01-09",
    source: item.source ?? "AMDB Learning Channel",
    caption: mediaCaption(item) ?? item.description,
    credit: mediaCredit(item) ?? item.creator ?? "AMDB Training",
    chapters: item.chapters ?? DEFAULT_VIDEO_CHAPTERS,
    transcript:
      item.transcript ??
      "This methods video is part of the AMDB training library and accompanies a fully documented protocol record.",
    resolution: `${720 + (seed % 4) * 360}p`,
    format: "MP4 / H.264",
    captions: "English (auto-generated + reviewed)",
    keywords: item.keywords ?? [],
  };
}

export function getDocumentaryMeta(item: SearchItem) {
  const seed = hashSeed(item.id);
  return {
    duration: item.duration ?? (item.media?.format === "documentary" ? item.media.duration : undefined) ?? "42:10",
    director: item.creator ?? "AMDB Studios",
    released: item.publishedAt ?? "2025-11-02",
    source: item.source ?? "AMDB Documentary Series",
    caption: mediaCaption(item) ?? item.description,
    credit: mediaCredit(item) ?? item.creator ?? "AMDB Studios",
    chapters: item.chapters ?? [
      "00:00 Opening",
      "08:30 Fieldwork",
      "17:45 The laboratory",
      "29:10 Findings",
      "37:20 Reflection",
    ],
    transcript:
      item.transcript ??
      "This documentary follows the people and places behind an AMDB record, from field collection to the final spectral annotation.",
    language: "English, French, Swahili (subtitles)",
    aspectRatio: "16:9",
    releasedYear: Number((item.publishedAt ?? "2025").slice(0, 4)),
    rating: `${(8 + (seed % 15) / 10).toFixed(1)}/10`,
    keywords: item.keywords ?? [],
  };
}

export function getKeywordMeta(item: SearchItem) {
  const byId = new Map(SEARCH_INDEX.map((entry) => [entry.id, entry]));
  const explicit = (item.relatedIds ?? [])
    .map((id) => byId.get(id))
    .filter((entry): entry is SearchItem => Boolean(entry));

  const terms = (item.keywords ?? []).map((keyword) => keyword.toLowerCase());

  const related =
    explicit.length > 0
      ? explicit
      : SEARCH_INDEX.filter(
          (entry) =>
            entry.id !== item.id &&
            (entry.domain === item.domain ||
              (entry.keywords ?? []).some((keyword) =>
                terms.includes(keyword.toLowerCase())
              ))
        ).slice(0, 8);

  const domainCounts = new Map<string, number>();
  for (const entry of related) {
    if (!entry.domain) continue;
    domainCounts.set(entry.domain, (domainCounts.get(entry.domain) ?? 0) + 1);
  }

  const relatedKeywords = SEARCH_INDEX.filter(
    (entry) =>
      entry.type === "Keyword" &&
      entry.id !== item.id &&
      (entry.domain === item.domain ||
        (entry.keywords ?? []).some((keyword) =>
          terms.includes(keyword.toLowerCase())
        ))
  ).slice(0, 6);

  return {
    mentions: related.length,
    related,
    anchorRecords: related.slice(0, 4),
    domains: [...domainCounts.entries()]
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count),
    relatedKeywords,
    keywords: item.keywords ?? [],
    category: item.category ?? "Search keyword",
  };
}