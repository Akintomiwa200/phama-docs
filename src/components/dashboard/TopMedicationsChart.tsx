"use client";

import { TOP_MEDICATIONS } from "@/lib/constants";
import { BarChartComponent } from "@/components/charts/BarChart";

export function TopMedicationsChart() {
  return (
    <BarChartComponent
      title="Top Searched Drugs"
      data={TOP_MEDICATIONS}
      xAxisKey="name"
      dataKeys={[{ key: "value", color: "#f43f5e", name: "Searches" }]}
      height={300}
    />
  );
}
