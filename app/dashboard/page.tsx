import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { OrdersChart } from "@/components/dashboard/OrdersChart";
import { TopMedicationsChart } from "@/components/dashboard/TopMedicationsChart";
import { PrescriptionList } from "@/components/pharmacy/PrescriptionList";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of your pharmacy performance
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
        <PrescriptionList />
      </div>
    </div>
  );
}
