import type { Metadata } from "next";
import { SearchExperience } from "@/components/search/SearchExperience";

export const metadata: Metadata = {
  title: "Search - African Metabolome Database",
  description:
    "Search LC-MS/MS features, NMR spectra, phytochemicals, stress markers, DOIs, and citable datasets.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string | string[];
    type?: string | string[];
    domain?: string | string[];
  }>;
}) {
  const { q, type, domain } = await searchParams;
  const first = (value?: string | string[]) =>
    typeof value === "string" ? value : "";

  const initialQuery = first(q);
  const initialType = first(type);
  const initialDomain = first(domain);

  return (
    <SearchExperience
      key={`${initialQuery}|${initialType}|${initialDomain}`}
      initialQuery={initialQuery}
      initialType={initialType}
      initialDomain={initialDomain}
    />
  );
}
