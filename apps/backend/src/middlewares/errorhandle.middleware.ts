// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import winston from "winston";

// Configuração básica do Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
  });

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Erro interno no servidor",
  });
};
