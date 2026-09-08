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