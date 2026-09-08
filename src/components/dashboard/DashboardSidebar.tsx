"use client";

import React, { useState } from "react";
import {
  Search,
  X,
  Heart,
  Activity,
  FlaskConical,
  Sparkles,
  Layers,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "All Data",
    icon: Search,
    badge: null,
  },
  {
    label: "Plant Metabolomics",
    icon: Sparkles,
    badge: "25",
  },
  {
    label: "Agricultural Stress",
    icon: Heart,
    badge: "73/100",
  },
  {
    label: "Livestock Biomarkers",
    icon: FlaskConical,
    badge: null,
  },
  {
    label: "Environmental Soil",
    icon: Layers,
    badge: null,
  },
  {
    label: "Human Metabolomics",
    icon: Activity,
    badge: "Balanced",
  },
  {
    label: "Phytochemical Diversity",
    icon: Sparkles,
    badge: "78/100",
  },
  {
    label: "Primary LC-MS/MS",
    icon: FlaskConical,
    badge: null,
  },
  {
    label: "NMR Reference Spectra",
    icon: Activity,
    badge: "Normal",
  },
];

function SidebarBody() {
  const [activeTab, setActiveTab] = useState("All Data");

  return (
    <>
      <div>
        {/* Brand logo */}
        <div className="flex items-center justify-between pb-6">
          <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            superpower
          </span>
          <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400">
            ADMIN
          </span>
        </div>

        {/* Header section title */}
        <div className="flex items-baseline gap-2 pb-5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Data
          </h2>
          <span className="text-xl font-normal text-gray-400">Records</span>
        </div>

        {/* Navigation Pills */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm font-semibold dark:bg-gray-800 dark:text-gray-100"
                    : "text-gray-600 hover:bg-gray-200/60 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-gray-400" />
                  <span>{item.label}</span>
                </div>
                {item.label === "All Data" ? (
                  <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" />
                ) : item.badge ? (
                  <span className="rounded-full bg-gray-200/70 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-700/70 dark:text-gray-300">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Card */}
      <div className="mt-8 rounded-3xl bg-gray-200/60 p-4 relative overflow-hidden dark:bg-gray-800/60">
        <span className="inline-block rounded-full bg-[#d4f836] px-2.5 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider">
          Go Pro
        </span>
        <button className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <X className="h-3.5 w-3.5" />
        </button>
        <h4 className="mt-3 text-xs font-bold text-gray-900 dark:text-gray-100">
          Free Premium Subscription
        </h4>
        <p className="mt-1 text-[11px] leading-snug text-gray-500 dark:text-gray-400">
          Get full access to admin metabolome analytics &amp; DOI minting.
        </p>
        <button className="mt-3 w-full rounded-full bg-white py-2 text-center text-xs font-bold text-gray-900 shadow-xs hover:bg-gray-50 transition-colors">
          Try it
        </button>
      </div>
    </>
  );
}

export function DashboardSidebar({
  mobileOpen = false,
  onClose = () => {},
}: {
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col justify-between overflow-y-auto border-r border-gray-200/80 bg-white p-5 lg:flex lg:p-6 dark:border-gray-800">
        <SidebarBody />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-gray-200/80 bg-white p-5 dark:border-gray-800">
            <div className="flex items-center justify-end pb-4">
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarBody />
          </aside>
        </div>
      )}
    </>
  );
}