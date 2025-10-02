/*
  Controller de autenticação
 */
import { Request, Response } from "express";
import { prisma } from "../db/client";
import bcrypt from "bcryptjs";
import { loginSchema, singupSchema } from "../schemas/auth";
import { loginService } from "../services/auth.service";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  const result = singupSchema.safeParse(req.body);

  if (!result.success)
    return res.status(400).json({ error: result.error.format() });

  const { name, email, password } = result.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Usuario já cadastrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    // Criar tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Salvar refresh token no banco
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      },
    });

    res.json({ result, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success)
    return res.status(400).json({ error: result.error.format() });

  const { email, password } = result.data;

  try {
    const result = await loginService(email, password);

    // Criar tokens
    const accessToken = generateAccessToken(result.user.id);
    const refreshToken = generateRefreshToken(result.user.id);

    // Salvar refresh token no banco
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: result.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      },
    });

    res.json({ result, accessToken, refreshToken });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) return res.json(404).json({ error: "Usuario não encontrado" });

    return res.json(user);
  } catch (e) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ error: "Token ausente" });

  try {
    const payload = verifyRefreshToken(refreshToken) as any;

    const savedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!savedToken || savedToken.expiresAt < new Date())
      return res
        .status(401)
        .json({ error: "Refresh token invalido ou expirado" });

    const newAccessToken = generateAccessToken(payload.userId);

    res.json({ accessToken: newAccessToken });
  } catch (e) {
    return res.status(401).json({ error: "Token invalido" });
  }
};

export const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    res.status(500).json({ e });
  }
};
