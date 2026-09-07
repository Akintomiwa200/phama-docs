"use client";

import { SALES_DATA } from "@/lib/constants";
import { AreaChartComponent } from "@/components/charts/AreaChart";

export function RevenueChart() {
  return (
    <AreaChartComponent
      title="Revenue Overview"
      data={SALES_DATA}
      xAxisKey="date"
      dataKeys={[
        { key: "revenue", color: "#6366f1", name: "Revenue" },
        { key: "profit", color: "#22c55e", name: "Profit" },
      ]}
      height={350}
    />
  );
}
