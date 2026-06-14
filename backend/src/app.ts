import cors from "cors";
// Inside your app setup code, right after initializing express:
const app = express();
app.use(cors()); // This allows port 5173 to freely request the data!
app.use(express.json());
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { loadEnv } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/auth.routes.js";
import { dashboardRouter } from "./routes/dashboard.routes.js";
import { reservationRouter } from "./routes/reservation.routes.js";
import { roomRouter } from "./routes/room.routes.js";

export function createApp() {
  const env = loadEnv();
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(",").map((s) => s.trim()),
      credentials: true,
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use("/api/reservations", reservationRouter);
  app.use("/api/rooms", roomRouter);

  app.use(errorHandler);
  return app;
}
