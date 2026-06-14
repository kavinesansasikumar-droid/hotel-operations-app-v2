import { Router } from "express";
import { today } from "../controllers/reservation.controller.js";
import { authRequired } from "../middleware/auth.js";

export const reservationRouter = Router();

reservationRouter.get("/today", authRequired, today);
