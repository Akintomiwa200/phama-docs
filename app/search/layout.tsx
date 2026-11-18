import Link from "next/link";
import { SearchHeaderAuth } from "@/components/search/SearchHeaderAuth";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950">
      <header className="border-b border-gray-100 dark:border-gray-900">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-gray-900 transition-colors hover:text-rose-600 dark:text-gray-100 dark:hover:text-rose-400"
          >
            African Metabolome DB
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/search?type=Domain"
              className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Domains
            </Link>
            <SearchHeaderAuth />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
