"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/helpers";
import { User, Bell, Shield, Store, Sun, Moon, Monitor } from "lucide-react";

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          {[
            { icon: User, label: "Profile", active: true },
            { icon: Store, label: "Pharmacy", active: false },
            { icon: Bell, label: "Notifications", active: false },
            { icon: Shield, label: "Security", active: false },
            { icon: Monitor, label: "Appearance", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Theme defaults to your system / browser preference and can be
                overridden here.
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
                        ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        isActive
                          ? "text-indigo-600 dark:text-indigo-400"
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

          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="First Name" placeholder="Admin" />
                <Input label="Last Name" placeholder="User" />
              </div>
              <Input label="Email" type="email" placeholder="admin@pharmdocs.com" />
              <Input label="Phone" placeholder="+1 (555) 000-0000" />
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pharmacy Information</CardTitle>
              <CardDescription>Manage your pharmacy details</CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <Input label="Pharmacy Name" placeholder="PharmDocs Pharmacy" />
              <Input label="License Number" placeholder="PH-12345" />
              <Input label="Address" placeholder="123 Health Street" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="City" placeholder="New York" />
                <Input label="State" placeholder="NY" />
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
