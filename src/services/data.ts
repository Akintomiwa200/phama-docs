import {
  SALES_DATA,
  INVENTORY_DATA,
  CATEGORY_DISTRIBUTION,
  TOP_MEDICATIONS,
  WEEKLY_TRAFFIC,
  MONTHLY_PRESCRIPTIONS,
  PERFORMANCE_DATA,
  ARTICLES_BY_SPECIALTY,
  REVIEW_RELIABILITY,
  SEARCH_INDEX,
} from "@/lib/constants";
import type { SearchItem } from "@/lib/types";
import { searchIndex } from "@/lib/search";

export function getSearchIndex() {
  return SEARCH_INDEX;
}

export function getSearchResults(query: string, limit = 8): SearchItem[] {
  return searchIndex(query, limit);
}

export function getSalesData() {
  return SALES_DATA;
}

export function getInventoryData() {
  return INVENTORY_DATA;
}

export function getCategoryDistribution() {
  return CATEGORY_DISTRIBUTION;
}

export function getTopMedications() {
  return TOP_MEDICATIONS;
}

export function getWeeklyTraffic() {
  return WEEKLY_TRAFFIC;
}

export function getMonthlyPrescriptions() {
  return MONTHLY_PRESCRIPTIONS;
}

export function getPerformanceData() {
  return PERFORMANCE_DATA;
}

export function getPatientAgeDistribution() {
  return ARTICLES_BY_SPECIALTY;
}

export function getSupplierReliability() {
  return REVIEW_RELIABILITY;
}
