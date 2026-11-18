import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

export function AuthNotice({
  icon: Icon = CheckCircle2,
  title,
  children,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-300">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-xl font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {children}
      </p>
      {action ? <div className="mt-6 grid gap-2">{action}</div> : null}
    </div>
  );
}
