import mongoose, { Schema } from "mongoose";

export type RoomStatus = "occupied" | "vacant_clean" | "vacant_dirty" | "ooo" | "reserved";

export interface IRoom {
  number: string;
  status: RoomStatus;
  floor?: number;
  type?: string;
}

const roomSchema = new Schema<IRoom>(
  {
    number: { type: String, required: true, unique: true, trim: true, index: true },
    status: {
      type: String,
      enum: ["occupied", "vacant_clean", "vacant_dirty", "ooo", "reserved"],
      default: "vacant_clean",
      index: true,
    },
    floor: { type: Number },
    type: { type: String, trim: true },
  },
  { timestamps: true }
);

roomSchema.index({ status: 1, number: 1 });

export const Room = mongoose.model<IRoom>("Room", roomSchema);
