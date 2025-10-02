import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

export const config = {
  port: process.env.PORT || 6000,
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
};

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: "Muitas requisições. tente novamente mais tarde",
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: "Muitas tentativas de login, tente novamente mais tarde",
});
