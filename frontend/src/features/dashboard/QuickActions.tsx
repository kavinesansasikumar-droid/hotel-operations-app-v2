import { BarChart3, BedDouble, CalendarPlus, Sparkles, UserPlus, Wrench } from "lucide-react";

const actions = [
  { label: "Walk-in Check In", icon: UserPlus },
  { label: "New Reservation", icon: CalendarPlus },
  { label: "Room Availability", icon: BedDouble },
  { label: "Maintenance Request", icon: Wrench },
  { label: "Housekeeping Update", icon: Sparkles },
  { label: "Reports", icon: BarChart3 },
];

export function QuickActions() {
  return (
    <section aria-label="Quick actions">
      <h2 className="sr-only">Quick actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {actions.map(({ label, icon: Icon }) => (
          <a
            key={label}
            href={`#${label.replace(/\s+/g, "-").toLowerCase()}`}
            className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-5 text-center text-xs font-semibold text-gray-900 shadow-card transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:hover:border-gray-600"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-sidebar-accent dark:bg-gray-800">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
