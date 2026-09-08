import { AppShell } from "@/components/dashboard/AppShell";

export default function MedicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}