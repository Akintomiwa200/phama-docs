"use client";

import { Leaf, Search, Database, Activity } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { DASHBOARD_STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/helpers";

export function StatsOverview() {
  const stats = DASHBOARD_STATS;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Annotated Metabolites"
        value={formatNumber(stats.totalTerms)}
        change={stats.termsChange}
        icon={<Leaf className="h-5 w-5 text-rose-600" />}
      />
      <StatCard
        title="Monthly Spectral Lookups"
        value={formatNumber(stats.monthlyLookups)}
        change={stats.lookupsChange}
        icon={<Search className="h-5 w-5 text-rose-600" />}
      />
      <StatCard
        title="Citable Datasets & DOIs"
        value={formatNumber(stats.libraryArticles)}
        change={stats.articlesChange}
        icon={<Database className="h-5 w-5 text-rose-600" />}
      />
      <StatCard
        title="Reference Spectral Libraries"
        value={formatNumber(stats.drugEntries)}
        change={stats.drugsChange}
        icon={<Activity className="h-5 w-5 text-rose-600" />}
      />
    </div>
  );
}