import type { Request, Response } from "express";
import { listRooms, updateRoomStatus } from "../services/room.service.js";
import type { RoomStatus } from "../models/Room.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const list = asyncHandler(async (_req: Request, res: Response) => {
  const rooms = await listRooms();
  res.json({ rooms });
});

export const patchStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as { status: RoomStatus };
  const room = await updateRoomStatus(id, status);
  res.json({ room });
});
