"use client";

import { SALES_DATA } from "@/lib/constants";
import { BarChartComponent } from "@/components/charts/BarChart";

export function OrdersChart() {
  return (
    <BarChartComponent
      title="Entries Saved"
      data={SALES_DATA}
      xAxisKey="date"
      dataKeys={[{ key: "orders", color: "#fb7185", name: "Saved" }]}
      height={300}
    />
  );
}
