import { useState, type ReactNode } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { useTheme } from "@/hooks/useTheme";
import type { DashboardSummary } from "@/types/api";

export function AppShell({
  summary,
  children,
}: {
  summary: DashboardSummary;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <div className="flex min-h-screen pb-[60px] lg:pb-0">
      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        summary={summary}
        dark={dark}
        onToggleTheme={toggle}
      />
      <div className="flex min-w-0 flex-1 flex-col bg-page dark:bg-page-dark">
        <Header userName="Sakthi" userRole="Front Office" onMenu={() => setMenuOpen(true)} />
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
