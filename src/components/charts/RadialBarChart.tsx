"use client";

import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

interface RadialBarChartComponentProps {
  title: string;
  data: { name: string; score: number; fill: string }[];
  height?: number;
}

export function RadialBarChartComponent({
  title,
  data,
  height = 300,
}: RadialBarChartComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="30%"
          outerRadius="100%"
          data={data}
        >
          <RadialBar
            dataKey="score"
            background={{ fill: "#f1f5f9" }}
            barSize={20}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            iconSize={10}
            width={120}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </Card>
  );
}
