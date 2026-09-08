"use client";

import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { TopMedicationsChart } from "@/components/dashboard/TopMedicationsChart";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { OrdersChart } from "@/components/dashboard/OrdersChart";
import { ComparisonBarChart } from "@/components/charts/ComparisonBarChart";
import { RadialBarChartComponent } from "@/components/charts/RadialBarChart";
import { LineChartComponent } from "@/components/charts/LineChart";
import { PieChartComponent } from "@/components/charts/PieChart";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import {
  PERFORMANCE_DATA,
  REVIEW_RELIABILITY,
  ARTICLES_BY_SPECIALTY,
  SALES_DATA,
} from "@/lib/constants";
import { Activity, Cpu, Layers } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Analytical Bio-Map &amp; Ecosystem Insights
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          LC-MS/MS, GC-MS, and NMR primary feature distributions, cross-domain ecosystem interactions, and spectral matching metrics.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <InventoryChart />
      </div>

      {/* Cross-Domain Interaction Matrix Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-rose-500" />
            <CardTitle>Interconnected Ecosystem Biochemical Map</CardTitle>
          </div>
          <CardDescription>
            Cross-domain metabolic interactions linking soil chemistry, plant exudates, crop stress, livestock feed, and human microbiome bioactives.
          </CardDescription>
        </CardHeader>
        <div className="grid gap-4 p-6 pt-0 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <Cpu className="h-4 w-4" /> Plant &rarr; Soil &rarr; Microbe
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Rhizosphere flavonoid exometabolites induce nodulation genes in soil Bradyrhizobium, facilitating nitrogen fixation in cowpea crops.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Layers className="h-4 w-4" /> Feed &rarr; Rumen &rarr; Productivity
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Pasture forage bioactive lipids modulate rumen fatty acid biohydrogenation, producing conjugated linoleic acid indicators in indigenous cattle.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              <Activity className="h-4 w-4" /> Flora &rarr; Host &rarr; Health
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Traditional dietary phytochemicals interact with gut microbiota, yielding SCFA signatures like isobutyrate associated with metabolic health.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <ComparisonBarChart
          title="Annotated Targets vs Actual Matches"
          data={PERFORMANCE_DATA}
          dataKey1="target"
          dataKey2="actual"
          name1="Target Features"
          name2="Matched Features"
        />
        <LineChartComponent
          title="Spectral Library Query Volume"
          data={SALES_DATA}
          xAxisKey="date"
          dataKeys={[
            { key: "revenue", color: "#f43f5e", name: "LC-MS/MS Queries" },
            { key: "orders", color: "#fb7185", name: "NMR Spectra" },
          ]}
          height={300}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RadialBarChartComponent
          title="Curator Board Reliability Scores"
          data={REVIEW_RELIABILITY}
          height={350}
        />
        <PieChartComponent
          title="Datasets by Biological Domain"
          data={ARTICLES_BY_SPECIALTY}
          height={350}
          innerRadius={55}
          outerRadius={95}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopMedicationsChart />
        <TrafficChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryChart />
        <OrdersChart />
      </div>
    </div>
  );
}
