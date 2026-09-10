"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, LogOut } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { RequireAuth, useAuth } from "@/providers/auth";

const PATH_LABELS: Record<string, string> = {
  "/dashboard": "Domains Hub",
  "/medications": "Metabolites & Spectra",
  "/reports": "Data Repositories",
  "/analytics": "Analytical Bio-Map",
  "/settings": "Metadata & DOIs",
  "/search": "Search the Metabolome",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const label = PATH_LABELS[pathname] ?? "African Metabolome Database";

  function handleSignOut() {
    signOut();
    router.replace("/login");
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "AM";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white/90 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="truncate text-xs font-medium text-gray-400 dark:text-gray-500">
              {label}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/search"
              className="flex h-9 w-full max-w-xs items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3.5 text-xs text-gray-400 transition-colors hover:border-gray-300 sm:w-64 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500 dark:hover:border-gray-600"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Search features, spectra, DOIs...</span>
            </Link>

            {user && (
              <div className="flex items-center gap-2">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white"
                  title={user.name}
                >
                  {initials}
                </div>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <RequireAuth>{children}</RequireAuth>
        </main>
      </div>
    </div>
  );
}