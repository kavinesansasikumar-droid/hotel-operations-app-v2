import { BedDouble, IndianRupee, LogOut, Users } from "lucide-react";
import type { DashboardSummary } from "@/types/api";

const cards: {
  key: keyof Pick<DashboardSummary, "occupancy" | "arrivals" | "departures" | "revenue">;
  label: string;
  gradient: string;
  icon: typeof BedDouble;
}[] = [
  { key: "occupancy", label: "Occupancy", gradient: "from-[#1a73e8] to-[#1557b0]", icon: BedDouble },
  { key: "arrivals", label: "Today Arrival", gradient: "from-green-600 to-green-700", icon: Users },
  { key: "departures", label: "Today Departure", gradient: "from-orange-600 to-orange-700", icon: LogOut },
  { key: "revenue", label: "Today Revenue", gradient: "from-violet-600 to-violet-800", icon: IndianRupee },
];

export function KpiGrid({ summary }: { summary: DashboardSummary }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key metrics">
      {cards.map(({ key, label, gradient, icon: Icon }) => {
        const v = summary[key];
        let value = "";
        let sub = "";
        if (key === "occupancy") {
          const o = v as DashboardSummary["occupancy"];
          value = `${o.pct}%`;
          sub = `${o.occupied} / ${o.total} Rooms`;
        } else if (key === "arrivals") {
          const a = v as DashboardSummary["arrivals"];
          value = String(a.count);
          sub = `Expected: ${a.expected}`;
        } else if (key === "departures") {
          const d = v as DashboardSummary["departures"];
          value = String(d.count);
          sub = `Expected: ${d.expected}`;
        } else {
          const r = v as DashboardSummary["revenue"];
          value = r.amount;
          sub = `ADR: ${r.adr}`;
        }
        return (
          <article
            key={key}
            className={`rounded-xl bg-gradient-to-br ${gradient} p-5 text-white shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[13px] font-semibold opacity-95">{label}</p>
                <p className="mt-2 text-[32px] font-bold leading-tight tracking-tight">{value}</p>
                <p className="mt-2 text-[13px] opacity-90">{sub}</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/20" aria-hidden>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
