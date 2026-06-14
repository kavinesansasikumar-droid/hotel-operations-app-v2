import { Router } from "express";
import { z } from "zod";
import { login, me, register } from "../controllers/auth.controller.js";
import { authRequired } from "../middleware/auth.js";
import { validateBody } from "../middleware/validateRequest.js";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.enum(["front_office", "housekeeping", "maintenance", "admin"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/me", authRequired, me);
