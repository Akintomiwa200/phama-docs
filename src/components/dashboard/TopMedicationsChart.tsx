"use client";

import { TOP_MEDICATIONS } from "@/lib/constants";
import { BarChartComponent } from "@/components/charts/BarChart";

export function TopMedicationsChart() {
  return (
    <BarChartComponent
      title="Top Medications"
      data={TOP_MEDICATIONS}
      xAxisKey="name"
      dataKeys={[{ key: "value", color: "#6366f1", name: "Units Sold" }]}
      height={300}
    />
  );
}
