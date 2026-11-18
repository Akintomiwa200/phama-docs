import {
  SAMPLE_METABOLITES,
  DATASET_CONTRIBUTIONS,
  FEATURE_TABLES_DATA,
} from "./constants";
import type {
  SearchItem,
  Metabolite,
  DatasetContribution,
  FeatureTable,
} from "./types";

export function getMetaboliteRecord(item: SearchItem): Metabolite | undefined {
  return SAMPLE_METABOLITES.find(
    (m) => m.id === item.id || m.name.toLowerCase() === item.label.toLowerCase()
  );
}

export function getDatasetRecord(
  item: SearchItem
): DatasetContribution | undefined {
  return DATASET_CONTRIBUTIONS.find(
    (d) =>
      d.id === item.id ||
      d.doi === item.doi ||
      d.title.toLowerCase().includes(item.label.toLowerCase())
  );
}

export function getFeatureTablesForDomain(domain?: string): FeatureTable[] {
  if (!domain) return FEATURE_TABLES_DATA;
  return FEATURE_TABLES_DATA.filter((ft) => ft.domain === domain);
}
