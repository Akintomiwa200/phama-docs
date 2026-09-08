"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Pill,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/helpers";
import { useState } from "react";

const SIDEBAR_ITEMS = [
  { label: "Dictionary", href: "/dashboard", icon: BookOpen },
  { label: "Drugs", href: "/medications", icon: Pill },
  { label: "Library", href: "/reports", icon: FileText },
  { label: "Insights", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-50 lg:dark:border-gray-800 lg:dark:bg-gray-900 transition-all duration-300",
        collapsed ? "lg:w-16" : "lg:w-64"
      )}
    >
      <div className="flex flex-1 flex-col pt-5">
        <nav className="flex-1 space-y-1 px-2">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-gray-200 p-2 dark:border-gray-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>
    </aside>
  );
}