import type { Request, Response } from "express";
import { getTodayReservationsDetail } from "../services/dashboard.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const today = asyncHandler(async (_req: Request, res: Response) => {
  const data = await getTodayReservationsDetail();
  res.json(data);
});
