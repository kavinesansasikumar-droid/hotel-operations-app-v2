import mongoose, { Schema } from "mongoose";

export type UserRole = "front_office" | "housekeeping" | "maintenance" | "admin";

export interface IUser {
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["front_office", "housekeeping", "maintenance", "admin"],
      default: "front_office",
      index: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
