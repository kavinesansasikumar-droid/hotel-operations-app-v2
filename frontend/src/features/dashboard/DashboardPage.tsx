import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/layout/AppShell";
import { getDashboardSummary, getTodayReservations, mockDashboard, mockToday } from "@/lib/api";
import { DashboardTables } from "@/features/dashboard/DashboardTables";
import { KpiGrid } from "@/features/dashboard/KpiGrid";
import { QuickActions } from "@/features/dashboard/QuickActions";
import { RoomStatusStrip } from "@/features/dashboard/RoomStatusStrip";

function useDashboardData() {
  const summaryQuery = useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: async () => {
      try {
        return await getDashboardSummary();
      } catch {
        return mockDashboard;
      }
    },
    staleTime: 60_000,
  });

  const todayQuery = useQuery({
    queryKey: ["reservations", "today"],
    queryFn: async () => {
      try {
        return await getTodayReservations();
      } catch {
        return mockToday;
      }
    },
    staleTime: 60_000,
  });

  const summary = summaryQuery.data ?? mockDashboard;
  const today = todayQuery.data ?? mockToday;

  return {
    summary,
    today,
    isLoading: summaryQuery.isPending || todayQuery.isPending,
  };
}

export function DashboardPage() {
  const { summary, today, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page dark:bg-page-dark">
        <p className="text-gray-600 dark:text-gray-400">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <AppShell summary={summary}>
      <main id="main" className="flex-1 space-y-5 p-5 md:p-6">
        <h1 className="sr-only">Dashboard overview</h1>
        <KpiGrid summary={summary} />
        <RoomStatusStrip items={summary.roomStatus} />
        <DashboardTables data={today} />
        <QuickActions />
      </main>
    </AppShell>
  );
}
