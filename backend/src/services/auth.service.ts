import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loadEnv } from "../config/env.js";
import { AppError } from "../middleware/errorHandler.js";
import type { UserRole } from "../models/User.js";
import { User } from "../models/User.js";

function signToken(userId: string, role: UserRole): string {
  const env = loadEnv();
  return jwt.sign({ sub: userId, role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] });
}

export async function registerUser(input: {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}) {
  const existing = await User.findOne({ email: input.email });
  if (existing) throw new AppError(409, "EMAIL_IN_USE", "Email already registered");
  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await User.create({
    email: input.email,
    passwordHash,
    name: input.name,
    role: input.role ?? "front_office",
  });
  const token = signToken(user.id, user.role);
  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user?.passwordHash) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
  const token = signToken(user.id, user.role);
  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  };
}

export async function getUserById(id: string) {
  const user = await User.findById(id).lean();
  if (!user) throw new AppError(404, "NOT_FOUND", "User not found");
  return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
}
