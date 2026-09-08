import { cn } from "@/lib/helpers";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, change, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          {change !== undefined && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(1)}% from last month
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-rose-50 p-3 dark:bg-rose-900/20">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
