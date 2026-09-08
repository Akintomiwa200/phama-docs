"use client";

import {
  Heart,
  Plus,
  ShoppingCart,
  User,
  TrendingUp,
  Sparkles,
  X,
} from "lucide-react";
import { DotMatrixNumber } from "./DotMatrixNumber";

export function AdminDashboardUI() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* TOP HEADER BAR */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        {/* User / Curator Title & Stat Chips */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Dr. Sophia Caldwell
          </h1>

          {/* Quick Numbers Row */}
          <div className="flex flex-wrap items-center gap-6 text-gray-900 font-mono dark:text-gray-100">
            {/* 106 Total */}
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl font-light">106</span>
              <span className="rounded-full bg-[#d4f836] px-2 py-0.5 text-[10px] font-bold text-black uppercase">
                Total
              </span>
            </div>

            {/* 80 Optimal */}
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl font-light">80</span>
              <span className="text-[11px] font-sans text-gray-400">Optimal</span>
            </div>

            {/* 21 In range */}
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl font-light">21</span>
              <span className="text-[11px] font-sans text-gray-400">In range</span>
            </div>

            {/* 5 Out of range */}
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl font-light">5</span>
              <span className="text-[11px] font-sans text-gray-400">Out of range</span>
            </div>
          </div>
        </div>

        {/* Right Action Icons & Upload Cards */}
        <div className="flex flex-wrap items-center gap-4 xl:justify-end">
          {/* Shop & User circle */}
          <div className="flex items-center gap-2.5">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xs hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xs hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              <User className="h-4 w-4" />
            </button>
          </div>

          {/* Upload Dataset Records Card */}
          <div className="flex h-[130px] w-[170px] flex-col justify-between rounded-3xl bg-white p-4 shadow-xs dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-900 leading-tight dark:text-gray-100">
                Upload<br />Dataset Records
              </span>
              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Existing Records</span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-100">2 Files</span>
            </div>
          </div>

          {/* Spectral Tracker Card */}
          <div className="relative flex h-[130px] w-[170px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 p-4 text-white shadow-lg shadow-rose-500/20">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-semibold leading-tight text-white/90">
                Current<br />Spectral Tracker
              </span>
              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Pulsing Target Radar Circle Visual */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="h-28 w-28 rounded-full border border-white/60 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full border border-white/80 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-300 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-rose-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="z-10">
              <span className="text-[10px] tracking-widest text-white/80 font-mono">
                (((((( O ))))))
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE BANNER */}
      <div className="relative flex items-center justify-between rounded-full bg-white px-6 py-2.5 shadow-xs dark:bg-gray-900">
        <span className="text-xs font-medium text-gray-400">April</span>

        {/* Health Improving Pill */}
        <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-1.5 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <TrendingUp className="h-3.5 w-3.5 text-gray-700 dark:text-gray-300" />
          <span className="text-xs font-bold text-gray-900 dark:text-gray-100">Health Improving</span>
          <span className="text-[10px] text-gray-400">+2.3 last 30 days</span>
        </div>

        <span className="text-xs font-medium text-gray-400">June</span>
      </div>

      {/* HERO CARDS GRID */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* CARD 1: Superpower Score */}
        <div className="relative flex h-[310px] flex-col justify-between overflow-hidden rounded-[36px] bg-gradient-to-b from-[#fcd34d] via-[#4ade80] to-[#16a34a] p-6 text-white shadow-xl shadow-emerald-500/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wide text-white/90">
              Superpower Score
            </span>
          </div>

          {/* Dot Matrix 70 */}
          <div className="my-auto flex flex-col items-center justify-center">
            <DotMatrixNumber value="70" size="xl" />
            <span className="mt-3 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
              On Track
            </span>
          </div>

          {/* Bottom Dot Matrix Graph Visual */}
          <div className="flex items-end justify-center gap-1.5 opacity-60 h-8">
            {[4, 6, 8, 12, 16, 20, 14, 18, 22, 26, 20, 15, 18, 24, 28, 20].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-white"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

        {/* CARD 2: Biological Age */}
        <div className="relative flex h-[310px] flex-col justify-between overflow-hidden rounded-[36px] bg-gradient-to-br from-[#bfdbfe] via-[#fed7aa] to-[#fb923c] p-6 text-white shadow-xl shadow-orange-500/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wide text-white/90">
              Biological age
            </span>
          </div>

          {/* Dot Matrix 25 */}
          <div className="my-auto flex flex-col items-center justify-center">
            <DotMatrixNumber value="25" size="xl" />
            <span className="mt-3 text-xs font-semibold text-white/90">
              2.5 years younger
            </span>
          </div>

          {/* Bottom Tick Marks Bar Visual */}
          <div className="flex items-end justify-center gap-1 opacity-70 h-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                className={`w-0.5 rounded-full ${i === 16 ? "bg-white h-7" : "bg-white/60 h-4"}`}
              />
            ))}
          </div>
        </div>

        {/* CARD 3: Your results are pending */}
        <div className="relative flex h-[310px] flex-col justify-between rounded-[36px] bg-white p-6 shadow-xs border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
              Your results are pending
            </span>
            <button className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Timeline slider & 3D Glass Vial Graphic */}
          <div className="my-auto flex items-center justify-between px-2">
            <div>
              <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">7-10</span>
              <span className="text-xs text-gray-400 ml-1">Days</span>
              {/* Slider line */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 w-3 w-3 rounded-full bg-[#d4f836]" />
                <div className="h-0.5 w-24 bg-gray-200 relative dark:bg-gray-600">
                  <div className="absolute top-1/2 left-1/3 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-gray-400 bg-white dark:bg-gray-200" />
                </div>
              </div>
            </div>

            {/* 3D Glass Vial Mock Visual */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 shadow-inner dark:bg-gray-900">
              <div className="h-14 w-5 rounded-full bg-gradient-to-b from-orange-400 to-amber-600 shadow-md flex flex-col justify-between p-1">
                <div className="h-2 w-full bg-white/40 rounded-sm" />
                <div className="h-6 w-full bg-white/20 rounded-sm" />
              </div>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-gray-400">
            Until then your lab spec test data is processing.
          </p>
        </div>
      </div>

      {/* LOWER SECTION GRID */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* LEFT BIOMARKERS SECTION (6 COLS) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Biomarkers</h3>
              <p className="text-xs text-gray-400">A snapshot of what&apos;s happening inside your body</p>
            </div>
            <button className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              See All
            </button>
          </div>

          {/* Biomarker Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Biomarker 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-xs border border-gray-100/80 dark:bg-gray-800 dark:border-gray-700/80">
              <div className="flex items-center justify-between text-gray-400">
                <Heart className="h-4 w-4 text-rose-500" />
                <span className="text-[10px] text-gray-400">Heart health</span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">103</span>
                  <span className="text-[10px] text-gray-400">mg/dL</span>
                </div>
                <span className="text-[10px] text-gray-400">LDL Cholesterol</span>
              </div>
              {/* Vertical Bar Sparkline */}
              <div className="mt-3 flex items-end justify-between h-6 opacity-60">
                {[6, 12, 18, 14, 22, 10, 8, 16].map((h, i) => (
                  <span key={i} className="w-1 rounded-full bg-gray-800 dark:bg-gray-200" style={{ height: `${h}px` }} />
                ))}
              </div>
            </div>

            {/* Biomarker 2 */}
            <div className="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-xs border border-gray-100/80 dark:bg-gray-800 dark:border-gray-700/80">
              <div className="flex items-center justify-between text-gray-400">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-[10px] text-gray-400">Nutrients</span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">43</span>
                  <span className="text-[10px] text-gray-400">ng/mL</span>
                </div>
                <span className="text-[10px] text-gray-400">Vitamin D</span>
              </div>
              {/* Wave Sparkline */}
              <div className="mt-3 h-6 flex items-center">
                <svg viewBox="0 0 100 30" className="w-full h-full stroke-gray-900 fill-none stroke-[3] dark:stroke-gray-200">
                  <path d="M0 15 Q25 0, 50 15 T100 15" />
                </svg>
              </div>
            </div>

            {/* Biomarker 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-xs border border-gray-100/80 dark:bg-gray-800 dark:border-gray-700/80">
              <div className="flex items-center justify-between text-gray-400">
                <Heart className="h-4 w-4 text-rose-500" />
                <span className="text-[10px] text-gray-400">Heart health</span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">42</span>
                  <span className="text-[10px] text-gray-400">mg/dL</span>
                </div>
                <span className="text-[10px] text-gray-400">Apolipoprotein B</span>
              </div>
              {/* Dotted Sparkline */}
              <div className="mt-3 flex items-center justify-between h-6 opacity-60">
                {[2, 4, 3, 5, 2, 6, 4, 3, 5, 2].map((r, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-800 dark:bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT TOP SUPPLEMENTS SECTION (6 COLS) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Top Supplements for You</h3>
              <p className="text-xs text-gray-400">Support your balance with supplements picked for you</p>
            </div>
            <button className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              See All
            </button>
          </div>

          {/* Supplement 3D Glossy Orbs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Orb 1 */}
            <div className="flex flex-col items-center justify-between rounded-3xl bg-white p-4 text-center shadow-xs border border-gray-100/80 dark:bg-gray-800 dark:border-gray-700/80">
              <span className="rounded-full bg-[#d4f836] px-2.5 py-0.5 text-[9px] font-bold text-black uppercase">
                Best Seller
              </span>

              {/* Glossy Green Glass Orb */}
              <div className="my-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 via-teal-400 to-green-200 shadow-lg shadow-emerald-500/30">
                <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/60" />
              </div>

              <div>
                <span className="text-[10px] text-gray-400 block truncate max-w-[90px]">
                  Artemisia Extract
                </span>
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100">$24.30</span>
              </div>
            </div>

            {/* Orb 2 */}
            <div className="flex flex-col items-center justify-between rounded-3xl bg-white p-4 text-center shadow-xs border border-gray-100/80 dark:bg-gray-800 dark:border-gray-700/80">
              <span className="rounded-full bg-[#d4f836] px-2.5 py-0.5 text-[9px] font-bold text-black uppercase">
                Best Seller
              </span>

              {/* Glossy Blue Glass Orb */}
              <div className="my-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-sky-600 via-blue-400 to-indigo-200 shadow-lg shadow-sky-500/30">
                <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/60" />
              </div>

              <div>
                <span className="text-[10px] text-gray-400 block truncate max-w-[90px]">
                  Vernonia Essence
                </span>
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100">$19.90</span>
              </div>
            </div>

            {/* Orb 3 */}
            <div className="flex flex-col items-center justify-between rounded-3xl bg-white p-4 text-center shadow-xs border border-gray-100/80 dark:bg-gray-800 dark:border-gray-700/80">
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[9px] font-medium text-gray-500 uppercase dark:bg-gray-700 dark:text-gray-300">
                Fair Price
              </span>

              {/* Glossy Bronze Glass Orb */}
              <div className="my-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-amber-700 via-orange-400 to-yellow-200 shadow-lg shadow-orange-500/30">
                <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/60" />
              </div>

              <div>
                <span className="text-[10px] text-gray-400 block truncate max-w-[90px]">
                  Aframomum CO2
                </span>
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100">$45.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}