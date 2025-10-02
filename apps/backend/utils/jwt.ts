import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET || "super-secret-key";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret-key";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
