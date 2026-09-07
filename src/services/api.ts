import { DASHBOARD_STATS, SAMPLE_MEDICATIONS } from "@/lib/constants";
import type { DashboardStats, Medication } from "@/lib/types";

export async function getDashboardStats(): Promise<DashboardStats> {
  return DASHBOARD_STATS;
}

export async function getMedications(): Promise<Medication[]> {
  return SAMPLE_MEDICATIONS;
}

export async function getMedicationById(id: string): Promise<Medication | undefined> {
  return SAMPLE_MEDICATIONS.find((m) => m.id === id);
}

export async function searchMedications(query: string): Promise<Medication[]> {
  const lower = query.toLowerCase();
  return SAMPLE_MEDICATIONS.filter(
    (m) =>
      m.name.toLowerCase().includes(lower) ||
      m.category.toLowerCase().includes(lower) ||
      m.manufacturer.toLowerCase().includes(lower)
  );
}
