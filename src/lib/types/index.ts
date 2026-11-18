export type DomainCategory = 
  | "Plant Metabolomics"
  | "Agricultural Metabolomics"
  | "Livestock Metabolomics"
  | "Environmental Metabolomics"
  | "Human Metabolomics";

export interface BiologicalMetadata {
  speciesName: string;
  tissueType: string;
  geographicOrigin: string;
  environmentalConditions: string;
  sampleCollectionMethod: string;
  sampleStorageConditions: string;
}

export interface Metabolite {
  id: string;
  name: string;
  category: string; // e.g. "Phytochemical", "Alkaloid", "Stress Marker", "Flavonioid"
  formula: string;
  exactMass: number;
  mz: number;
  retentionTime: number; // in minutes
  platform: "LC-MS/MS" | "GC-MS" | "NMR Spectroscopy";
  domain: DomainCategory;
  structureSmiles: string;
  confidenceScore: number; // 0 - 100% annotation confidence
  metadata: BiologicalMetadata;
  databaseIds: {
    metaboLights?: string;
    gnps?: string;
    pubchem?: string;
    doi?: string;
  };
  description: string;
  // Legacy / visual compatibility fields
  dosage?: string;
  price?: number;
  stock?: number;
  expiryDate?: string;
  manufacturer?: string;
}

export interface AnalyticalSpectrum {
  id: string;
  compoundId: string;
  compoundName: string;
  platform: "LC-MS/MS" | "GC-MS" | "NMR Spectroscopy";
  mzPrecursor?: number;
  retentionTime?: number;
  fragmentationPeaks: Array<{ mz: number; intensity: number }>;
  confidenceScore: number;
  spectralLibrary: string;
}

export interface FeatureTable {
  id: string;
  title: string;
  domain: DomainCategory;
  sampleCount: number;
  detectedFeatures: number;
  alignmentMethod: string;
  species: string;
  geographicRegion: string;
  publicRepoSource: "MetaboLights" | "Metabolomics Workbench" | "GNPS" | "Community Submission";
  doi: string;
  contributor: string;
  institution: string;
  createdDate: string;
}

export interface DatasetContribution {
  id: string;
  title: string;
  doi: string;
  authors: string[];
  institution: string;
  domain: DomainCategory;
  publicSource: string;
  featureTableCount: number;
  sampleCount: number;
  publicationDate: string;
  citationFormat: string;
  metadataDescription: string;
}

export interface SalesData {
  date: string;
  revenue: number; // Mapped to Feature Table Ingests / Peaks
  orders: number;  // Mapped to Spectral Queries
  profit: number;  // Mapped to Annotated Compounds
}

export interface InventoryData {
  category: string;
  complete: number;
  partial: number;
  missing: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface DashboardStats {
  totalTerms: number;          // Mapped to Annotated Metabolites
  monthlyLookups: number;      // Mapped to Monthly Spectral Matches
  libraryArticles: number;     // Mapped to Curated Datasets & DOIs
  drugEntries: number;         // Mapped to Reference Spectral Entries
  termsChange: number;
  lookupsChange: number;
  articlesChange: number;
  drugsChange: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export type SearchItemType =
  | "Metabolite"
  | "Dataset"
  | "Spectrum"
  | "Domain"
  | "Term"
  | "Drug"
  | "Article"
  | "Image"
  | "Video"
  | "Documentary"
  | "Keyword";

export type SearchMedia =
  | { format: "image"; motif: string; caption?: string; credit?: string }
  | { format: "formula"; value: string }
  | {
      format: "video";
      motif: string;
      duration?: string;
      caption?: string;
      credit?: string;
    }
  | {
      format: "documentary";
      motif: string;
      duration?: string;
      caption?: string;
      credit?: string;
    };

export interface SearchItem {
  id: string;
  label: string;
  type: SearchItemType;
  category?: string;
  description: string;
  media?: SearchMedia;
  doi?: string;
  species?: string;
  domain?: DomainCategory;
  mz?: number;
  platform?: string;
  /** Free-text tags used by search and keyword records. */
  keywords?: string[];
  /** Person, lab, studio, or institution credited with the record. */
  creator?: string;
  /** Runtime for video/documentary records, e.g. "08:42". */
  duration?: string;
  /** ISO publication / capture date. */
  publishedAt?: string;
  /** Repository, broadcaster, or collection that holds the record. */
  source?: string;
  /** Searchable transcript excerpt for audio-visual records. */
  transcript?: string;
  /** Chapter / section labels for video and documentary records. */
  chapters?: string[];
  /** Explicit cross-links to related record IDs. */
  relatedIds?: string[];
}

// Legacy support interface
export interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  medications: Array<{
    medicationId: string;
    medicationName: string;
    quantity: number;
    dosage: string;
    frequency: string;
  }>;
  status: "pending" | "dispensed" | "cancelled";
}
