"use client";

import { TOP_MEDICATIONS } from "@/lib/constants";
import { BarChartComponent } from "@/components/charts/BarChart";

export function TopMedicationsChart() {
  return (
    <BarChartComponent
      title="Top Annotated Metabolites &amp; Bioactives"
      data={TOP_MEDICATIONS}
      xAxisKey="name"
      dataKeys={[{ key: "value", color: "#f43f5e", name: "Spectral Matches" }]}
      height={300}
    />
  );
}
