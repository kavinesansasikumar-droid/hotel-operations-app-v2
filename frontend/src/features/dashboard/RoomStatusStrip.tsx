import type { RoomStatusItem } from "@/types/api";

const dot: Record<RoomStatusItem["key"], string> = {
  occupied: "bg-green-600",
  clean: "bg-blue-600",
  dirty: "bg-yellow-600",
  ooo: "bg-red-600",
  reserved: "bg-violet-600",
};

export function RoomStatusStrip({ items }: { items: RoomStatusItem[] }) {
  return (
    <section
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-card dark:border-gray-700 dark:bg-gray-900/80"
      aria-labelledby="room-status-heading"
    >
      <h2 id="room-status-heading" className="mb-3.5 text-[15px] font-bold text-gray-900 dark:text-white">
        Room Status Overview
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center gap-2.5 rounded-[10px] bg-gray-50 p-3 transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800"
          >
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dot[item.key]}`} aria-hidden />
            <div>
              <div className="text-xl font-bold tabular-nums text-gray-900 dark:text-white">
                {String(item.count).padStart(2, "0")}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
