"use client";

import { SALES_DATA } from "@/lib/constants";
import { AreaChartComponent } from "@/components/charts/AreaChart";

export function RevenueChart() {
  return (
    <AreaChartComponent
      title="Monthly Spectral Ingests &amp; Queries"
      data={SALES_DATA}
      xAxisKey="date"
      dataKeys={[
        { key: "revenue", color: "#f43f5e", name: "Spectral Queries" },
        { key: "profit", color: "#22c55e", name: "Annotated Signals" },
      ]}
      height={350}
    />
  );
}
