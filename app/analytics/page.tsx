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
import {
  PERFORMANCE_DATA,
  REVIEW_RELIABILITY,
  ARTICLES_BY_SPECIALTY,
  SALES_DATA,
} from "@/lib/constants";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Insights</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Database and lookup analytics
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <InventoryChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ComparisonBarChart
          title="Coverage vs Target"
          data={PERFORMANCE_DATA}
          dataKey1="target"
          dataKey2="actual"
          name1="Target"
          name2="Actual"
        />
        <LineChartComponent
          title="Lookup Trends"
          data={SALES_DATA}
          xAxisKey="date"
          dataKeys={[
            { key: "revenue", color: "#f43f5e", name: "Lookups" },
            { key: "orders", color: "#fb7185", name: "Saved" },
          ]}
          height={300}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RadialBarChartComponent
          title="Review Reliability"
          data={REVIEW_RELIABILITY}
          height={350}
        />
        <PieChartComponent
          title="Articles by Specialty"
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
