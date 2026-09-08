"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/helpers";
import { User, Shield, Sun, Moon, Monitor, Database, Award, CheckCircle2 } from "lucide-react";

const THEME_OPTIONS = [
  { value: "system", label: "System", icon: Monitor, hint: "Follow browser / OS preference" },
  { value: "light", label: "Light", icon: Sun, hint: "Always use light theme" },
  { value: "dark", label: "Dark", icon: Moon, hint: "Always use dark theme" },
] as const;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Metadata Standards &amp; Configurations
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configure biological metadata standards, persistent DOI attribution minting, and platform preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          {[
            { icon: Database, label: "Biological Metadata Standards", active: true },
            { icon: Award, label: "DOI & Citation Minting", active: false },
            { icon: User, label: "Contributor Profile", active: false },
            { icon: Shield, label: "Security & API Access", active: false },
            { icon: Monitor, label: "Appearance", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Biological Metadata Standards */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Biological Metadata Protocols</CardTitle>
                  <CardDescription>
                    Contextual information required for cross-study metabolomic comparisons.
                  </CardDescription>
                </div>
                <Badge variant="success">MIAMET Standard Enforced</Badge>
              </div>
            </CardHeader>
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
                  Mandatory Metadata Fields
                </h4>
                <ul className="grid gap-2 text-xs text-gray-600 dark:text-gray-300 sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <strong>Species Name:</strong> NCBI Taxonomy ID &amp; Latin Binomial
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <strong>Tissue Type:</strong> Plant organ / animal tissue / soil depth
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <strong>Geographic Origin:</strong> GPS coordinates &amp; Bioclimatic Zone
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <strong>Environmental Conditions:</strong> Drought / temperature / soil pH
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <strong>Collection Method:</strong> Solvent extraction / flash-freezing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <strong>Storage Conditions:</strong> -80°C ultra-low / desiccation
                  </li>
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Default Bio-Region" defaultValue="Sub-Saharan Africa (Pan-African)" />
                <Input label="Metadata Standard Version" defaultValue="AMDB Metadata v2.4 (2026)" />
              </div>
            </div>
          </Card>

          {/* DOI Minting & Citation Setup */}
          <Card>
            <CardHeader>
              <CardTitle>DOI Registration &amp; Scholarly Credit</CardTitle>
              <CardDescription>
                Configure persistent DOI assignment formats for contributed feature tables and spectral datasets.
              </CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <Input label="DOI Registrar Node" defaultValue="DataCite / Zenodo AMDB Community Repository" />
              <Input label="DOI Prefix Format" defaultValue="10.5281/zenodo.AMDB-2026-[ID]" />
              <Input label="Default Citation Format" defaultValue="[Authors] ([Year]). [Title]. African Metabolome DB, DOI: [DOI]" />
              <div className="flex justify-end">
                <Button>Update Citation Settings</Button>
              </div>
            </div>
          </Card>

          {/* Theme / Appearance */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Theme defaults to your system / browser preference and can be overridden here.
              </CardDescription>
            </CardHeader>
            <div className="grid gap-3 sm:grid-cols-3">
              {THEME_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
                      isActive
                        ? "border-rose-500 bg-rose-50 dark:border-rose-400 dark:bg-rose-900/20"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isActive
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-gray-500 dark:text-gray-400"
                      )}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {option.label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {option.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
