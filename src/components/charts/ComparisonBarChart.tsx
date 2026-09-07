"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

interface ComparisonBarChartProps {
  title: string;
  data: object[];
  dataKey1: string;
  dataKey2: string;
  name1?: string;
  name2?: string;
  color1?: string;
  color2?: string;
  xAxisKey?: string;
  height?: number;
}

export function ComparisonBarChart({
  title,
  data,
  dataKey1,
  dataKey2,
  name1 = "Target",
  name2 = "Actual",
  color1 = "#cbd5e1",
  color2 = "#6366f1",
  xAxisKey = "name",
  height = 300,
}: ComparisonBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
          />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey={dataKey1} name={name1} fill={color1} radius={[4, 4, 0, 0]} />
          <Bar dataKey={dataKey2} name={name2} fill={color2} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
