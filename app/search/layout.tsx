import { AppShell } from "@/components/dashboard/AppShell";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}