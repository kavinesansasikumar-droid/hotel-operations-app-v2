import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const BLUE = "#1a73e8";
const TRACK = "rgba(148, 163, 184, 0.35)";

export function OccupancyDonut({ occupied, total }: { occupied: number; total: number }) {
  const free = Math.max(0, total - occupied);
  const data = [
    { name: "Occupied", value: occupied },
    { name: "Available", value: free },
  ];

  return (
    <div className="mx-auto h-[140px] w-full max-w-[160px]" role="img" aria-label={`Occupancy ${occupied} of ${total} rooms`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="72%"
            outerRadius="100%"
            paddingAngle={0}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={index === 0 ? BLUE : TRACK} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
