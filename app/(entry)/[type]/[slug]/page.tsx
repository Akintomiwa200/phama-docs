import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findEntry } from "@/lib/search";
import { EntryDetail } from "@/components/detail/EntryDetail";

type EntryPageProps = {
  params: Promise<{ type: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: EntryPageProps): Promise<Metadata> {
  const { type, slug } = await params;
  const entry = findEntry(type, slug);
  return {
    title: entry
      ? `${entry.label} - ${entry.type} | African Metabolome DB`
      : "Entry not found | African Metabolome DB",
    description: entry?.description,
  };
}

export default async function EntryPage({ params }: EntryPageProps) {
  const { type, slug } = await params;
  const entry = findEntry(type, slug);

  if (!entry) notFound();

  return <EntryDetail item={entry} />;
}