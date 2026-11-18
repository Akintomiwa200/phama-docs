"use client";

import Link from "next/link";
import { useAuth } from "@/providers/auth";

export function SearchHeaderAuth() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/signup"
          className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          Get started
        </Link>
        <Link
          href="/login"
          className="rounded-full bg-rose-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-rose-600"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="/dashboard"
      className="rounded-full bg-gray-900 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      Dashboard
    </Link>
  );
}
