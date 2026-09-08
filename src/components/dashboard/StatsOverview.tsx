"use client";

import { BookOpen, Search, Library, Pill } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { DASHBOARD_STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/helpers";

export function StatsOverview() {
  const stats = DASHBOARD_STATS;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Terms in Dictionary"
        value={formatNumber(stats.totalTerms)}
        change={stats.termsChange}
        icon={<BookOpen className="h-5 w-5 text-rose-600" />}
      />
      <StatCard
        title="Lookups This Month"
        value={formatNumber(stats.monthlyLookups)}
        change={stats.lookupsChange}
        icon={<Search className="h-5 w-5 text-rose-600" />}
      />
      <StatCard
        title="Library Articles"
        value={formatNumber(stats.libraryArticles)}
        change={stats.articlesChange}
        icon={<Library className="h-5 w-5 text-rose-600" />}
      />
      <StatCard
        title="Drug Entries"
        value={formatNumber(stats.drugEntries)}
        change={stats.drugsChange}
        icon={<Pill className="h-5 w-5 text-rose-600" />}
      />
    </div>
  );
}