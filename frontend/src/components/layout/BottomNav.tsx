import { BarChart3, LayoutDashboard, MessageSquare } from "lucide-react";

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[150] flex h-[60px] items-center justify-around border-t border-white/10 bg-sidebar lg:hidden"
      aria-label="Quick navigation"
    >
      <a
        href="#main"
        className="relative flex flex-col items-center gap-1 px-4 py-2 text-[11px] font-medium text-sidebar-accent"
        aria-current="page"
      >
        <LayoutDashboard className="h-5 w-5" />
        Dashboard
      </a>
      <a href="#chat" className="relative flex flex-col items-center gap-1 px-4 py-2 text-[11px] font-medium text-slate-400">
        <span className="absolute right-2 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
          5
        </span>
        <MessageSquare className="h-5 w-5" />
        Chat
      </a>
      <a href="#stats" className="flex flex-col items-center gap-1 px-4 py-2 text-[11px] font-medium text-slate-400">
        <BarChart3 className="h-5 w-5" />
        Statistics
      </a>
    </nav>
  );
}
