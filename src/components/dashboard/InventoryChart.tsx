"use client";

import { INVENTORY_DATA } from "@/lib/constants";
import { StackedBarChart } from "@/components/charts/StackedBarChart";

export function InventoryChart() {
  return (
    <StackedBarChart
      title="Database Entry Coverage"
      data={INVENTORY_DATA}
      xAxisKey="category"
      dataKeys={[
        { key: "complete", color: "#22c55e", name: "Complete" },
        { key: "partial", color: "#eab308", name: "Partial" },
        { key: "missing", color: "#ef4444", name: "Missing" },
      ]}
      height={350}
    />
  );
}
