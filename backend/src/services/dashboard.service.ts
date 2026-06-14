import { Alert } from "../models/Alert.js";
import { Guest } from "../models/Guest.js";
import { Reservation } from "../models/Reservation.js";
import { Room } from "../models/Room.js";

function startEndOfToday() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

const statusToKey: Record<string, "occupied" | "clean" | "dirty" | "ooo" | "reserved"> = {
  occupied: "occupied",
  vacant_clean: "clean",
  vacant_dirty: "dirty",
  ooo: "ooo",
  reserved: "reserved",
};

const keyLabels: Record<string, string> = {
  occupied: "Occupied",
  clean: "Vacant Clean",
  dirty: "Vacant Dirty",
  ooo: "Out of Order",
  reserved: "Reserved",
};

export async function getDashboardSummary() {
  const total = await Room.countDocuments();
  const occupied = await Room.countDocuments({ status: "occupied" });
  const pct = total === 0 ? 0 : Math.round((occupied / total) * 100);

  const { start, end } = startEndOfToday();
  const arrivalCount = await Reservation.countDocuments({
    checkIn: { $gte: start, $lte: end },
    status: { $in: ["confirmed", "checked_in"] },
  });
  const departureCount = await Reservation.countDocuments({
    checkOut: { $gte: start, $lte: end },
    status: { $in: ["checked_in", "confirmed"] },
  });

  const statusCounts = await Room.aggregate<{ _id: string; count: number }>([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const map = new Map<string, number>();
  for (const s of statusCounts) {
    const key = statusToKey[s._id];
    if (key) map.set(key, s.count);
  }
  const roomStatus = (["occupied", "clean", "dirty", "ooo", "reserved"] as const).map((key) => ({
    key,
    label: keyLabels[key],
    count: map.get(key) ?? 0,
  }));

  return {
    occupancy: { pct, occupied, total },
    arrivals: { count: arrivalCount, expected: arrivalCount },
    departures: { count: departureCount, expected: departureCount },
    revenue: { amount: "₹ 1,75,000", adr: "₹ 4,200" },
    roomStatus,
  };
}

export async function getTodayReservationsDetail() {
  const { start, end } = startEndOfToday();

  const arrivals = await Reservation.find({
    checkIn: { $gte: start, $lte: end },
    status: { $in: ["confirmed", "checked_in"] },
  })
    .populate("guest", "name vip")
    .populate("room", "number")
    .lean();

  const departures = await Reservation.find({
    checkOut: { $gte: start, $lte: end },
    status: { $in: ["checked_in", "confirmed"] },
  })
    .populate("guest", "name")
    .populate("room", "number")
    .lean();

  const vipGuests = await Guest.find({ vip: true }).select("_id").lean();

  const vipRes = await Reservation.find({
    status: "checked_in",
    checkOut: { $gt: new Date() },
    guest: { $in: vipGuests.map((g) => g._id) },
  })
    .populate("guest", "name")
    .populate("room", "number")
    .lean();

  const alerts = await Alert.find({ status: "open" })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  return {
    arrivals: arrivals.map((r) => {
      const g = r.guest as { name?: string; vip?: boolean } | null;
      const rm = r.room as { number?: string } | null;
      return {
        name: g?.name ?? "Guest",
        room: rm?.number ?? "—",
        eta: r.eta ?? "—",
        vip: Boolean(g?.vip),
      };
    }),
    departures: departures.map((r) => {
      const g = r.guest as { name?: string } | null;
      const rm = r.room as { number?: string } | null;
      return {
        name: g?.name ?? "Guest",
        room: rm?.number ?? "—",
        checkout: r.checkoutTime ?? "11:00 AM",
      };
    }),
    vipInHouse: vipRes.map((r) => {
      const g = r.guest as { name?: string } | null;
      const rm = r.room as { number?: string } | null;
      const sinceMs = Date.now() - new Date(r.checkIn).getTime();
      const days = Math.max(1, Math.floor(sinceMs / (86400000)));
      return {
        name: g?.name ?? "VIP Guest",
        room: rm?.number ?? "—",
        since: `${days} Day${days > 1 ? "s" : ""}`,
      };
    }),
    alerts: alerts.map((a) => ({
      type: a.type,
      title: a.title,
      meta: a.meta,
    })),
  };
}
