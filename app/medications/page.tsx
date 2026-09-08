import { MedicationTable } from "@/components/pharmacy/MedicationTable";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";

export default function MedicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Drugs</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drug database &mdash; monographs, classes and formulations
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <InventoryChart />
        <CategoryChart />
      </div>

      <MedicationTable />
    </div>
  );
}