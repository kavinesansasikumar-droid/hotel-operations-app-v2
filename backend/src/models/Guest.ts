import mongoose, { Schema } from "mongoose";

export interface IGuest {
  name: string;
  vip: boolean;
  email?: string;
  phone?: string;
}

const guestSchema = new Schema<IGuest>(
  {
    name: { type: String, required: true, trim: true, index: true },
    vip: { type: Boolean, default: false, index: true },
    email: { type: String, lowercase: true, trim: true },
    phone: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Guest = mongoose.model<IGuest>("Guest", guestSchema);
