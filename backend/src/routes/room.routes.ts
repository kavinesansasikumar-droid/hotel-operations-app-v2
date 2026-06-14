import { Router } from "express";
import { z } from "zod";
import { list, patchStatus } from "../controllers/room.controller.js";
import { authRequired, requireRole } from "../middleware/auth.js";
import { validateBody } from "../middleware/validateRequest.js";

const patchSchema = z.object({
  status: z.enum(["occupied", "vacant_clean", "vacant_dirty", "ooo", "reserved"]),
});

export const roomRouter = Router();

roomRouter.get("/", authRequired, list);
roomRouter.patch("/:id/status", authRequired, requireRole("admin", "front_office"), validateBody(patchSchema), patchStatus);
