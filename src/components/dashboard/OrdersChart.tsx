"use client";

import { SALES_DATA } from "@/lib/constants";
import { BarChartComponent } from "@/components/charts/BarChart";

export function OrdersChart() {
  return (
    <BarChartComponent
      title="Monthly Orders"
      data={SALES_DATA}
      xAxisKey="date"
      dataKeys={[{ key: "orders", color: "#8b5cf6", name: "Orders" }]}
      height={300}
    />
  );
}
