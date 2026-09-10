"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/helpers";
import { useAuth } from "@/providers/auth";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, signOut } = useAuth();

  function handleSignOut() {
    setMobileMenuOpen(false);
    signOut();
    router.push("/");
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "AM";

  return (
    // Fixed, transparent wrapper — positions the pill with top/side inset.
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4 sm:px-6">
      <nav className="pointer-events-auto relative isolate grid h-14 w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center rounded-full border border-white/40 pl-4 pr-1.5 shadow-lg shadow-gray-900/5 dark:border-white/20">
        {/* Glass layer */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 rounded-full bg-white/20",
            "backdrop-blur-2xl backdrop-saturate-150",
            "dark:bg-white/5"
          )}
        />

        {/* Logo — left column */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500 text-xs font-bold tracking-wider text-white">
            AM
          </div>
          <span className="text-adaptive text-sm font-bold tracking-tight">
            African Metabolome DB
          </span>
        </Link>

        {/* Right column — auth actions + mobile toggle */}
        <div className="flex items-center gap-2.5 justify-self-end">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full bg-rose-500 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-rose-600"
              >
                Dashboard
              </Link>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900/10 text-xs font-bold text-gray-900 dark:bg-white/15 dark:text-white">
                {initials}
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-900/10 dark:text-gray-300 dark:hover:bg-white/10"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-gray-900/20 px-5 py-2.5 text-[13px] font-medium text-gray-900 transition-colors hover:bg-gray-900/5 dark:border-white/25 dark:text-white dark:hover:bg-white/10"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-rose-500 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-rose-600"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile-only menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-900/10 dark:text-gray-300 dark:hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
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
          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-adaptive"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-adaptive opacity-80"
              >
                Sign out ({user.name})
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-adaptive opacity-80"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 block rounded-lg bg-rose-500 px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}