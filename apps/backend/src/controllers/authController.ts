/*
  Controller de autenticação
 */
import { Request, Response } from "express";
import { prisma } from "../db/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { singupSchema } from "../schemas/auth";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

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

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error });
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
