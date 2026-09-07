"use client";

import { DollarSign, ShoppingCart, Users, Pill } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { DASHBOARD_STATS } from "@/lib/constants";
import { formatCurrency, formatNumber } from "@/lib/helpers";

export function StatsOverview() {
  const stats = DASHBOARD_STATS;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value={formatCurrency(stats.totalRevenue)}
        change={stats.revenueChange}
        icon={<DollarSign className="h-5 w-5 text-indigo-600" />}
      />
      <StatCard
        title="Total Orders"
        value={formatNumber(stats.totalOrders)}
        change={stats.ordersChange}
        icon={<ShoppingCart className="h-5 w-5 text-indigo-600" />}
      />
      <StatCard
        title="Total Patients"
        value={formatNumber(stats.totalPatients)}
        change={stats.patientsChange}
        icon={<Users className="h-5 w-5 text-indigo-600" />}
      />
      <StatCard
        title="Medications"
        value={formatNumber(stats.totalMedications)}
        change={stats.medicationsChange}
        icon={<Pill className="h-5 w-5 text-indigo-600" />}
      />
    </div>
  );
}
