import {
  BarChart3,
  BedDouble,
  Bell,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  MessageSquare,
  Moon,
  Settings,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import { OccupancyDonut } from "@/features/dashboard/OccupancyDonut";
import type { DashboardSummary } from "@/types/api";

const navMain: { label: string; icon: typeof LayoutDashboard; href: string }[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#" },
  { label: "Arrivals", icon: LogIn, href: "#" },
  { label: "Departures", icon: LogOut, href: "#" },
  { label: "In House", icon: Home, href: "#" },
  { label: "Room Status", icon: BedDouble, href: "#" },
  { label: "Housekeeping", icon: Sparkles, href: "#" },
  { label: "Maintenance", icon: Wrench, href: "#" },
  { label: "Reports", icon: BarChart3, href: "#" },
];

const navAccount: { label: string; icon: typeof MessageSquare; href: string }[] = [
  { label: "Chat", icon: MessageSquare, href: "#" },
  { label: "Notifications", icon: Bell, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
  { label: "Logout", icon: LogOut, href: "#" },
];

function NavLink({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof LayoutDashboard;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href="#main"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-sidebar-accent text-white"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
      {label}
    </a>
  );
}

export function Sidebar({
  open,
  onClose,
  summary,
  dark,
  onToggleTheme,
}: {
  open: boolean;
  onClose: () => void;
  summary: DashboardSummary;
  dark: boolean;
  onToggleTheme: () => void;
}): ReactNode {
  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className={`fixed inset-0 z-[199] bg-slate-900/50 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-[200] flex w-[272px] max-w-[88vw] flex-col bg-sidebar text-slate-200 shadow-xl transition-transform lg:static lg:z-0 lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-amber-400 to-amber-700 text-lg"
            aria-hidden
          >
            🏨
          </div>
          <span className="text-sm font-bold tracking-wide text-white">FORTEL HOTEL</span>
        </div>
        <nav className="flex-1 overflow-y-auto px-2.5 py-3" aria-label="Hotel modules">
          <div className="space-y-1">
            {navMain.map((item, i) => (
              <NavLink key={item.label} {...item} active={i === 0} onClick={onClose} />
            ))}
          </div>
          <p className="mb-1 mt-4 px-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Account
          </p>
          <div className="space-y-1">
            {navAccount.map((item) => (
              <NavLink key={item.label} {...item} onClick={onClose} />
            ))}
          </div>
          <div className="mt-4 px-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {dark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </nav>
        <div className="m-3 rounded-[10px] border border-white/10 bg-white/5 p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-100">Today&apos;s Occupancy</h2>
          <OccupancyDonut occupied={summary.occupancy.occupied} total={summary.occupancy.total} />
          <p className="mt-2 text-center text-sm text-slate-400">
            <span className="text-xl font-bold text-white">{summary.occupancy.pct}%</span>
            <br />
            {summary.occupancy.occupied} / {summary.occupancy.total} Rooms
          </p>
        </div>
      </aside>
    </>
  );
}
