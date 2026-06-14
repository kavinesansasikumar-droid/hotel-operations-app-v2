export type UserRole = "front_office" | "housekeeping" | "maintenance" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface RoomStatusItem {
  key: "occupied" | "clean" | "dirty" | "ooo" | "reserved";
  label: string;
  count: number;
}

export interface DashboardSummary {
  occupancy: { pct: number; occupied: number; total: number };
  arrivals: { count: number; expected: number };
  departures: { count: number; expected: number };
  revenue: { amount: string; adr: string };
  roomStatus: RoomStatusItem[];
}

export interface ArrivalRow {
  name: string;
  room: string;
  eta: string;
  vip?: boolean;
}

export interface DepartureRow {
  name: string;
  room: string;
  checkout: string;
}

export interface VipRow {
  name: string;
  room: string;
  since: string;
}

export interface AlertRow {
  type: "danger" | "warn" | "ok";
  title: string;
  meta: string;
}

export interface TodayReservationsResponse {
  arrivals: ArrivalRow[];
  departures: DepartureRow[];
  vipInHouse: VipRow[];
  alerts: AlertRow[];
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface ApiErrorBody {
  error: { code: string; message: string };
}
