"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const PRESCRIPTIONS = [
  { id: "1", patient: "John Smith", doctor: "Dr. Wilson", date: "2024-01-15", status: "dispensed" as const, count: 3 },
  { id: "2", patient: "Sarah Johnson", doctor: "Dr. Lee", date: "2024-01-15", status: "pending" as const, count: 2 },
  { id: "3", patient: "Mike Davis", doctor: "Dr. Chen", date: "2024-01-14", status: "dispensed" as const, count: 4 },
  { id: "4", patient: "Emily Brown", doctor: "Dr. Wilson", date: "2024-01-14", status: "cancelled" as const, count: 1 },
  { id: "5", patient: "David Wilson", doctor: "Dr. Lee", date: "2024-01-13", status: "pending" as const, count: 2 },
];

const statusConfig = {
  pending: { icon: Clock, variant: "warning" as const, label: "Pending" },
  dispensed: { icon: CheckCircle, variant: "success" as const, label: "Dispensed" },
  cancelled: { icon: XCircle, variant: "danger" as const, label: "Cancelled" },
};

export function PrescriptionList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Prescriptions</CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {PRESCRIPTIONS.map((rx) => {
          const config = statusConfig[rx.status];
          const Icon = config.icon;
          return (
            <div
              key={rx.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {rx.patient.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {rx.patient}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {rx.doctor} &middot; {rx.count} items
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
