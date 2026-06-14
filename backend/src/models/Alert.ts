import mongoose, { Schema, Types } from "mongoose";

export type AlertSeverity = "danger" | "warn" | "ok";
export type AlertStatus = "open" | "resolved";

export interface IAlert {
  room?: Types.ObjectId;
  title: string;
  meta: string;
  type: AlertSeverity;
  department?: string;
  status: AlertStatus;
}

const alertSchema = new Schema<IAlert>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", index: true },
    title: { type: String, required: true, trim: true },
    meta: { type: String, required: true, trim: true },
    type: { type: String, enum: ["danger", "warn", "ok"], default: "warn", index: true },
    department: { type: String, trim: true },
    status: { type: String, enum: ["open", "resolved"], default: "open", index: true },
  },
  { timestamps: true }
);

alertSchema.index({ createdAt: -1 });

export const Alert = mongoose.model<IAlert>("Alert", alertSchema);
