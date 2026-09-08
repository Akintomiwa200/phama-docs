"use client";

import { SALES_DATA } from "@/lib/constants";
import { AreaChartComponent } from "@/components/charts/AreaChart";

export function RevenueChart() {
  return (
    <AreaChartComponent
      title="Dictionary Lookups"
      data={SALES_DATA}
      xAxisKey="date"
      dataKeys={[
        { key: "revenue", color: "#f43f5e", name: "Lookups" },
        { key: "profit", color: "#22c55e", name: "Saved" },
      ]}
      height={350}
    />
  );
}
