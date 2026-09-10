import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <header className="flex justify-center pt-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-[11px] font-bold text-white">
            AM
          </div>
          <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100">
            African Metabolome Database
          </span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
            <div className="mt-6 space-y-4">{children}</div>
          </div>
          {footer && (
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {footer}
            </div>
          )}
        </div>
      </main>

      <footer className="pb-6 text-center text-xs text-gray-400 dark:text-gray-600">
        © {new Date().getFullYear()} African Metabolome Database
      </footer>
    </div>
  );
}