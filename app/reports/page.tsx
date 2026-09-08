"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { FileText, Download, Calendar } from "lucide-react";

const LIBRARY = [
  { id: "1", title: "Cardiology: Guide to Common Conditions", date: "2024-01-15", status: "ready" as const, type: "Guide" },
  { id: "2", title: "Antibiotic Classification Reference", date: "2024-01-10", status: "ready" as const, type: "Monograph" },
  { id: "3", title: "Endocrinology Terms Review", date: "2024-01-05", status: "processing" as const, type: "Review" },
  { id: "4", title: "Drug Interaction Database Notes", date: "2024-01-01", status: "ready" as const, type: "Reference" },
  { id: "5", title: "Neurology Terminology Update", date: "2023-12-28", status: "ready" as const, type: "Update" },
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Library</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Curated medical references, guides and monographs
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <InventoryChart />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medical Library</CardTitle>
          <CardDescription>Browse or download library documents</CardDescription>
        </CardHeader>
        <div className="space-y-3">
          {LIBRARY.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-4 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-900/20">
                  <FileText className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{doc.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="mr-1 inline h-3 w-3" />
                    {doc.date} &middot; {doc.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant[doc.status]}>
                  {doc.status === "ready" ? "Ready" : "Processing"}
                </Badge>
                {doc.status === "ready" && (
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