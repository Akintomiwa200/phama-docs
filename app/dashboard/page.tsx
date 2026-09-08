import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { OrdersChart } from "@/components/dashboard/OrdersChart";
import { TopMedicationsChart } from "@/components/dashboard/TopMedicationsChart";
import { RecentLookups } from "@/components/pharmacy/PrescriptionList";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dictionary</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Browse the medical dictionary &mdash; terms, drugs and references
        </p>
      </div>

      <StatsOverview />

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <CategoryChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <OrdersChart />
        <TopMedicationsChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentLookups />
      </div>
    </div>
  );
}