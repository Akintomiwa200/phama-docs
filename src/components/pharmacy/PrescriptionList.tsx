"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Clock, CheckCircle, BookOpen } from "lucide-react";

const RECENT_LOOKUPS = [
  { id: "1", term: "Myocardial Infarction", specialty: "Cardiology", date: "2024-01-15", status: "verified" as const, refs: 12 },
  { id: "2", term: "Ischemia", specialty: "Cardiology", date: "2024-01-15", status: "saved" as const, refs: 8 },
  { id: "3", term: "Neuroplasticity", specialty: "Neurology", date: "2024-01-14", status: "verified" as const, refs: 21 },
  { id: "4", term: "Metformin", specialty: "Endocrinology", date: "2024-01-14", status: "viewed" as const, refs: 6 },
  { id: "5", term: "Nosocomial Infection", specialty: "Infectious Diseases", date: "2024-01-13", status: "saved" as const, refs: 15 },
];

const statusConfig = {
  saved: { icon: CheckCircle, variant: "success" as const, label: "Saved" },
  verified: { icon: BookOpen, variant: "info" as const, label: "Verified" },
  viewed: { icon: Clock, variant: "warning" as const, label: "Viewed" },
};

export function RecentLookups() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Lookups</CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {RECENT_LOOKUPS.map((entry) => {
          const config = statusConfig[entry.status];
          const Icon = config.icon;
          return (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-sm font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                  {entry.term.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {entry.term}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {entry.specialty} &middot; {entry.refs} references
                  </p>
                </div>
              </div>
              <Badge variant={config.variant}>
                <Icon className="mr-1 h-3 w-3" />
                {config.label}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}