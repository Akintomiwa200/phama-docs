import Link from "next/link";

/**
 * Auth pages share one composition: brand mark + centered form on a solid
 * surface (black in dark mode, white in light — design.md tokens). Matches the
 * reference sign-in frame without a marketing side panel.
 */
export function AuthShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-500 text-[11px] font-bold text-white dark:bg-rose-500">
            AM
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
            African Metabolome Database
          </span>
        </Link>
        <Link
          href="/search"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-brand dark:hover:text-rose-400"
        >
          Explore database
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 sm:px-6">
        <div className="w-full max-w-sm">{children}</div>
        {footer}
        <p className="mt-8 max-w-sm text-center text-[11px] leading-relaxed text-muted-foreground">
          By continuing you agree to the AMDB terms of use. This demo stores
          accounts locally in your browser.
        </p>
      </main>
    </div>
  );
}
