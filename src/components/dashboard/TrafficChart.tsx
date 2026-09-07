"use client";

import { WEEKLY_TRAFFIC } from "@/lib/constants";
import { LineChartComponent } from "@/components/charts/LineChart";

export function TrafficChart() {
  return (
    <LineChartComponent
      title="Weekly Traffic"
      data={WEEKLY_TRAFFIC}
      xAxisKey="name"
      dataKeys={[{ key: "value", color: "#06b6d4", name: "Visitors" }]}
      height={300}
    />
  );
}
