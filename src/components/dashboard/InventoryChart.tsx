"use client";

import { INVENTORY_DATA } from "@/lib/constants";
import { StackedBarChart } from "@/components/charts/StackedBarChart";

export function InventoryChart() {
  return (
    <StackedBarChart
      title="Inventory Status"
      data={INVENTORY_DATA}
      xAxisKey="category"
      dataKeys={[
        { key: "inStock", color: "#22c55e", name: "In Stock" },
        { key: "lowStock", color: "#eab308", name: "Low Stock" },
        { key: "outOfStock", color: "#ef4444", name: "Out of Stock" },
      ]}
      height={350}
    />
  );
}
