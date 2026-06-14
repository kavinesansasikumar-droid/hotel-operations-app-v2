/**
 * Optional seed: demo rooms, guests, reservations, alerts, admin user.
 * Run: npm run seed (requires .env with MONGODB_URI, JWT_SECRET)
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { loadEnv } from "../config/env.js";
import type { RoomStatus } from "../models/Room.js";
import { Alert } from "../models/Alert.js";
import { Guest } from "../models/Guest.js";
import { Reservation } from "../models/Reservation.js";
import { Room } from "../models/Room.js";
import { User } from "../models/User.js";

async function run() {
  loadEnv();
  await mongoose.connect(process.env.MONGODB_URI!);

  await Promise.all([
    User.deleteMany({ email: "admin@fortel.example" }),
    Room.deleteMany({}),
    Guest.deleteMany({}),
    Reservation.deleteMany({}),
    Alert.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
  await User.create({
    email: "admin@fortel.example",
    passwordHash,
    name: "Sakthi",
    role: "admin",
  });

  /* 80 rooms — counts scaled from reference (66/18/12/4/0 on 100 → ~53/14/10/3/0 on 80) */
  const distribution: { status: RoomStatus; count: number }[] = [
    { status: "occupied", count: 53 },
    { status: "vacant_clean", count: 14 },
    { status: "vacant_dirty", count: 10 },
    { status: "ooo", count: 3 },
    { status: "reserved", count: 0 },
  ];

  const docs: { number: string; status: RoomStatus; floor: number; type: string }[] = [];
  let roomNo = 200;
  for (const { status, count } of distribution) {
    for (let i = 0; i < count; i++) {
      docs.push({
        number: String(roomNo++),
        status,
        floor: 2,
        type: "Standard",
      });
    }
  }
  await Room.insertMany(docs);
  const allRooms = await Room.find().sort({ number: 1 }).lean();

  const g1 = await Guest.create({ name: "Rajesh Kumar", vip: false });
  const g2 = await Guest.create({ name: "Priya Sharma", vip: true });
  const g5 = await Guest.create({ name: "David Chen", vip: true });

  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const r0 = allRooms[0]!;
  const r1 = allRooms[1]!;
  const r5 = allRooms[5]!;

  await Reservation.create({
    guest: g1._id,
    room: r0._id,
    checkIn: today,
    checkOut: tomorrow,
    status: "confirmed",
    eta: "10:30 AM",
  });
  await Reservation.create({
    guest: g2._id,
    room: r1._id,
    checkIn: today,
    checkOut: tomorrow,
    status: "checked_in",
    eta: "11:00 AM",
  });
  await Reservation.create({
    guest: g2._id,
    room: r1._id,
    checkIn: new Date(today.getTime() - 2 * 86400000),
    checkOut: tomorrow,
    status: "checked_in",
  });
  await Reservation.create({
    guest: g5._id,
    room: r5._id,
    checkIn: new Date(today.getTime() - 5 * 86400000),
    checkOut: tomorrow,
    status: "checked_in",
  });

  await Alert.create({
    title: "Room 205 — AC not working",
    meta: "Maintenance · 08:15 AM",
    type: "danger",
    department: "Maintenance",
  });
  await Alert.create({
    title: "Room 305 — Cleaned & ready",
    meta: "Housekeeping · 09:00 AM",
    type: "ok",
    department: "Housekeeping",
  });

  console.log("Seed complete. Login: admin@fortel.example / ChangeMe123!");
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
