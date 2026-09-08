"use client";

import { CATEGORY_DISTRIBUTION } from "@/lib/constants";
import { PieChartComponent } from "@/components/charts/PieChart";

export function CategoryChart() {
  return (
    <PieChartComponent
      title="Terms by Specialty"
      data={CATEGORY_DISTRIBUTION}
      height={300}
      innerRadius={55}
      outerRadius={95}
    />
  );
}
