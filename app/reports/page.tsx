"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { FileText, Download, Calendar } from "lucide-react";

const REPORTS = [
  { id: "1", title: "Monthly Sales Report", date: "2024-01-15", status: "ready" as const, type: "Sales" },
  { id: "2", title: "Inventory Audit", date: "2024-01-10", status: "ready" as const, type: "Inventory" },
  { id: "3", title: "Patient Summary Q1", date: "2024-01-05", status: "processing" as const, type: "Patients" },
  { id: "4", title: "Revenue Forecast", date: "2024-01-01", status: "ready" as const, type: "Financial" },
  { id: "5", title: "Supplier Performance", date: "2023-12-28", status: "ready" as const, type: "Suppliers" },
];

const statusVariant = {
  ready: "success" as const,
  processing: "warning" as const,
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generate and download pharmacy reports
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <InventoryChart />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Download or view your generated reports</CardDescription>
        </CardHeader>
        <div className="space-y-3">
          {REPORTS.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-4 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{report.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="mr-1 inline h-3 w-3" />
                    {report.date} &middot; {report.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant[report.status]}>
                  {report.status === "ready" ? "Ready" : "Processing"}
                </Badge>
                {report.status === "ready" && (
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
