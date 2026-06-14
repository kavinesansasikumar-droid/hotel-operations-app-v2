import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getUserById, loginUser, registerUser } from "../services/auth.service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const out = await registerUser(req.body);
  res.status(201).json(out);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const out = await loginUser(email, password);
  res.json(out);
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const id = req.user?.sub;
  if (!id) {
    res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Missing user" } });
    return;
  }
  const user = await getUserById(id);
  res.json({ user });
});
