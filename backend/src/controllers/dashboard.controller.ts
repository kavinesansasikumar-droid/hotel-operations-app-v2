import type { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboard.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const summary = asyncHandler(async (_req: Request, res: Response) => {
  const data = await getDashboardSummary();
  res.json(data);
});
