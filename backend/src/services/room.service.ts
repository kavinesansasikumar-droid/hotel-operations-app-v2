import { AppError } from "../middleware/errorHandler.js";
import type { RoomStatus } from "../models/Room.js";
import { Room } from "../models/Room.js";

export async function listRooms() {
  return Room.find().sort({ number: 1 }).lean();
}

export async function updateRoomStatus(roomId: string, status: RoomStatus) {
  const room = await Room.findByIdAndUpdate(roomId, { status }, { new: true }).lean();
  if (!room) throw new AppError(404, "NOT_FOUND", "Room not found");
  return room;
}
