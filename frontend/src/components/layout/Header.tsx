import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Header({
  userName,
  userRole,
  onMenu,
}: {
  userName: string;
  userRole: string;
  onMenu: () => void;
}) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const h = now.getHours();
  const greet = h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/90">
      <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 lg:hidden dark:border-gray-800">
        <Button variant="icon" aria-label="Open menu" onClick={onMenu}>
          <span className="text-lg leading-none">☰</span>
        </Button>
        <span className="font-semibold">Fortel Hotel</span>
        <span className="w-10" aria-hidden />
      </div>
      <div className="flex flex-wrap items-start justify-between gap-4 px-6 py-5">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-[15px] font-semibold text-gray-900 dark:text-white">
            Fortel Hotel, Chennai
            <ChevronDown className="h-4 w-4 opacity-50" aria-hidden />
          </div>
          <h1 className="text-[22px] font-bold tracking-tight text-gray-900 dark:text-white">
            {greet}, {userName} 👋
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Here&apos;s what&apos;s happening in your hotel today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400"
            aria-label="Current date and time"
          >
            <span>{dateStr}</span>
            <span>{timeStr}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-lg bg-gray-100 p-2.5 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Notifications, 3 unread"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
                3
              </span>
            </button>
            <div
              className="flex items-center gap-2.5 rounded-full bg-gray-100 py-1.5 pl-1.5 pr-3 dark:bg-gray-800"
              role="group"
              aria-label="Signed in user"
            >
              <div className="grid h-9 w-9 place-items-center rounded-full bg-sidebar-accent text-xs font-bold text-white">
                {userName
                  .split(/\s+/)
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{userName}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{userRole}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
