
export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="mx-auto w-full max-w-7xl flex-1 bg-gray-50 p-6 pt-8 dark:bg-gray-950">
          {children}
        </main>
      </div>

    </div>
  );
}
