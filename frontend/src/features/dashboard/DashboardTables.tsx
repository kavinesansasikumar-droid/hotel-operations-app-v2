import { Crown } from "lucide-react";
import { BadgeVip } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { TodayReservationsResponse } from "@/types/api";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function GuestCell({ name, vip }: { name: string; vip?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200"
        aria-hidden
      >
        {initials(name)}
      </span>
      <span className="font-medium text-gray-900 dark:text-gray-100">{name}</span>
      {vip ? <BadgeVip /> : null}
    </div>
  );
}

export function DashboardTables({ data }: { data: TodayReservationsResponse }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-gray-200 px-[18px] py-4 dark:border-gray-700">
          <h2 className="text-[15px] font-bold text-gray-900 dark:text-white">Today Arrivals</h2>
          <a href="#arrivals" className="text-sm font-semibold text-sidebar-accent hover:underline">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Guests arriving today</caption>
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-gray-600 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
                <th scope="col" className="px-4 py-3 font-semibold">
                  Guest Name
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Room #
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  ETA
                </th>
              </tr>
            </thead>
            <tbody>
              {data.arrivals.map((r) => (
                <tr
                  key={r.room + r.name}
                  className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/30"
                >
                  <td className="px-4 py-3">
                    <GuestCell name={r.name} vip={r.vip} />
                  </td>
                  <td className="px-4 py-3 tabular-nums">{r.room}</td>
                  <td className="px-4 py-3">{r.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 px-[18px] py-3 text-sm font-semibold text-gray-600 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
          Total Arrivals: 42
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-gray-200 px-[18px] py-4 dark:border-gray-700">
          <h2 className="text-[15px] font-bold text-gray-900 dark:text-white">Today Departures</h2>
          <a href="#departures" className="text-sm font-semibold text-sidebar-accent hover:underline">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Guests departing today</caption>
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-gray-600 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
                <th scope="col" className="px-4 py-3 font-semibold">
                  Guest Name
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Room #
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Checkout
                </th>
              </tr>
            </thead>
            <tbody>
              {data.departures.map((r) => (
                <tr
                  key={r.room + r.name}
                  className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/30"
                >
                  <td className="px-4 py-3">
                    <GuestCell name={r.name} />
                  </td>
                  <td className="px-4 py-3 tabular-nums">{r.room}</td>
                  <td className="px-4 py-3">{r.checkout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-200 bg-gray-50 px-[18px] py-3 text-sm font-semibold text-gray-600 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
          Total Departures: 30
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-gray-200 px-[18px] py-4 dark:border-gray-700">
          <h2 className="text-[15px] font-bold text-gray-900 dark:text-white">VIP In-House</h2>
          <a href="#vip" className="text-sm font-semibold text-sidebar-accent hover:underline">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">VIP guests in house</caption>
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-gray-600 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
                <th scope="col" className="px-4 py-3 font-semibold">
                  Guest Name
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Room #
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Since
                </th>
              </tr>
            </thead>
            <tbody>
              {data.vipInHouse.map((r) => (
                <tr
                  key={r.room + r.name}
                  className="border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/30"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 shrink-0 text-amber-500" aria-hidden />
                      <span className="font-medium">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{r.room}</td>
                  <td className="px-4 py-3">{r.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-gray-200 px-[18px] py-4 dark:border-gray-700">
          <h2 className="text-[15px] font-bold text-gray-900 dark:text-white">Recent Alerts</h2>
          <a href="#alerts" className="text-sm font-semibold text-sidebar-accent hover:underline">
            View All
          </a>
        </div>
        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.alerts.map((a) => (
            <li key={a.title} className="flex gap-3 px-[18px] py-3.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30">
              <div
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                  a.type === "danger"
                    ? "bg-red-50 text-red-600 dark:bg-red-950/40"
                    : a.type === "warn"
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40"
                      : "bg-green-50 text-green-600 dark:bg-green-950/40"
                }`}
                aria-hidden
              >
                !
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{a.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{a.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
