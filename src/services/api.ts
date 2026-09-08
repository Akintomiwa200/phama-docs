import { DASHBOARD_STATS, SAMPLE_METABOLITES } from "@/lib/constants";
import type { DashboardStats, Metabolite } from "@/lib/types";

export async function getDashboardStats(): Promise<DashboardStats> {
  return DASHBOARD_STATS;
}

export async function getMedications(): Promise<Metabolite[]> {
  return SAMPLE_METABOLITES;
}

export async function getMedicationById(id: string): Promise<Metabolite | undefined> {
  return SAMPLE_METABOLITES.find((m) => m.id === id);
}

export async function searchMedications(query: string): Promise<Metabolite[]> {
  const lower = query.toLowerCase();
  return SAMPLE_METABOLITES.filter(
    (m) =>
      m.name.toLowerCase().includes(lower) ||
      m.category.toLowerCase().includes(lower) ||
      m.domain.toLowerCase().includes(lower) ||
      m.metadata.speciesName.toLowerCase().includes(lower)
  );
}
