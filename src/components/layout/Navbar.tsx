"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/helpers";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    // Fixed, transparent wrapper — just positions the pill with top/side inset.
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:px-6">
      <nav
        className={cn(
          "pointer-events-auto relative isolate grid h-14 w-full max-w-6xl items-center",
          "grid-cols-[auto_1fr_auto] rounded-full pl-4 pr-1.5",
          "border border-white/40 shadow-lg shadow-gray-900/5",
          "dark:border-white/20"
        )}
      >
        {/* Glass layer — kept separate from content so the adaptive text
            below can blend against the real page backdrop (backdrop-filter
            on the pill itself breaks mix-blend-mode in light mode). */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 rounded-full bg-white/20",
            "backdrop-blur-2xl backdrop-saturate-150",
            "dark:bg-white/5"
          )}
        />
        {/* Logo — left column */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500 text-white text-xs font-bold">
            N
          </div>
          <span className="text-adaptive text-sm font-bold">
            NeuroLai
          </span>
        </Link>

        {/* Links — centered column (desktop only) */}
        <div className="hidden items-center justify-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-adaptive text-[13px] font-medium transition-opacity",
                pathname === item.href
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right column — CTA + mobile toggle */}
        <div className="flex items-center gap-3 justify-self-end">
          {/* Real CTA button — no avatar/dashboard icon */}
          <Link
            href="/contact"
            className="rounded-full bg-gray-900 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Work with us
          </Link>

          {/* Mobile-only nav-links toggle — never renders at md+ */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-200/70 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute left-4 right-4 top-[4.5rem] isolate rounded-2xl border border-white/40 p-3 shadow-xl shadow-gray-900/10 sm:left-6 sm:right-6 md:hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-2xl bg-white/25 backdrop-blur-2xl backdrop-saturate-150 dark:bg-white/5"
          />
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-adaptive text-sm font-medium transition-opacity",
                pathname === item.href
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
