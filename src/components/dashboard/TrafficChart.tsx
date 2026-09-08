"use client";

import { WEEKLY_TRAFFIC } from "@/lib/constants";
import { LineChartComponent } from "@/components/charts/LineChart";

export function TrafficChart() {
  return (
    <LineChartComponent
      title="Weekly Lookups"
      data={WEEKLY_TRAFFIC}
      xAxisKey="name"
      dataKeys={[{ key: "value", color: "#06b6d4", name: "Lookups" }]}
      height={300}
    />
  );
}
