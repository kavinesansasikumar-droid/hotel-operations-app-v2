import type {
  ApiErrorBody,
  AuthResponse,
  DashboardSummary,
  LoginBody,
  TodayReservationsResponse,
} from "@/types/api";

function getBaseUrl(): string {
  const env = import.meta.env.VITE_API_URL;
  if (env) return env.replace(/\/$/, "");
  return "";
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Invalid JSON response");
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getBaseUrl();
  const url = path.startsWith("http") ? path : `${base}${path}`;
  const token = localStorage.getItem("fortel_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init?.headers || {}),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const body = await parseJson<ApiErrorBody>(res).catch(() => null);
    const message = body?.error?.message || res.statusText || "Request failed";
    const code = body?.error?.code;
    throw new ApiError(message, res.status, code);
  }
  return parseJson<T>(res);
}

/** Aggregated KPIs + room status strip */
export function getDashboardSummary(): Promise<DashboardSummary> {
  return request<DashboardSummary>("/api/dashboard/summary");
}

export function getTodayReservations(): Promise<TodayReservationsResponse> {
  return request<TodayReservationsResponse>("/api/reservations/today");
}

export function login(body: LoginBody): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Demo fallback when API is offline — matches prototype data shape */
export const mockDashboard: DashboardSummary = {
  occupancy: { pct: 82, occupied: 66, total: 80 },
  arrivals: { count: 42, expected: 48 },
  departures: { count: 30, expected: 32 },
  revenue: { amount: "₹ 1,75,000", adr: "₹ 4,200" },
  roomStatus: [
    { key: "occupied", label: "Occupied", count: 66 },
    { key: "clean", label: "Vacant Clean", count: 18 },
    { key: "dirty", label: "Vacant Dirty", count: 12 },
    { key: "ooo", label: "Out of Order", count: 4 },
    { key: "reserved", label: "Reserved", count: 0 },
  ],
};

export const mockToday: TodayReservationsResponse = {
  arrivals: [
    { name: "Rajesh Kumar", room: "201", eta: "10:30 AM", vip: false },
    { name: "Priya Sharma", room: "305", eta: "11:00 AM", vip: true },
    { name: "James Wilson", room: "412", eta: "02:15 PM", vip: false },
    { name: "Anita Desai", room: "108", eta: "04:00 PM", vip: false },
  ],
  departures: [
    { name: "Michael Brown", room: "215", checkout: "11:00 AM" },
    { name: "Sarah Lee", room: "302", checkout: "12:30 PM" },
    { name: "Vikram Singh", room: "401", checkout: "10:00 AM" },
    { name: "Emma Thompson", room: "118", checkout: "09:00 AM" },
  ],
  vipInHouse: [
    { name: "Priya Sharma", room: "305", since: "2 Days" },
    { name: "David Chen", room: "502", since: "5 Days" },
    { name: "Meera Patel", room: "210", since: "1 Day" },
  ],
  alerts: [
    { type: "danger", title: "Room 205 — AC not working", meta: "Maintenance · 08:15 AM" },
    { type: "warn", title: "Room 112 — Late checkout requested", meta: "Front Office · 08:45 AM" },
    { type: "ok", title: "Room 305 — Cleaned & ready", meta: "Housekeeping · 09:00 AM" },
    { type: "danger", title: "Room 418 — Guest medical assistance", meta: "Security · 09:12 AM" },
  ],
};
