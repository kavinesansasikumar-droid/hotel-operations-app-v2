import mongoose, { Schema, Types } from "mongoose";

export type ReservationStatus = "confirmed" | "checked_in" | "checked_out" | "cancelled";

export interface IReservation {
  guest: Types.ObjectId;
  room: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  status: ReservationStatus;
  eta?: string;
  checkoutTime?: string;
}

const reservationSchema = new Schema<IReservation>(
  {
    guest: { type: Schema.Types.ObjectId, ref: "Guest", required: true, index: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true, index: true },
    checkIn: { type: Date, required: true, index: true },
    checkOut: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ["confirmed", "checked_in", "checked_out", "cancelled"],
      default: "confirmed",
      index: true,
    },
    eta: { type: String, trim: true },
    checkoutTime: { type: String, trim: true },
  },
  { timestamps: true }
);

reservationSchema.index({ checkIn: 1, status: 1 });
reservationSchema.index({ checkOut: 1, status: 1 });

export const Reservation = mongoose.model<IReservation>("Reservation", reservationSchema);
