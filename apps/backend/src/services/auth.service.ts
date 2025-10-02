import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../db/client";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export async function loginService(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Usuário não encontrado");

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error("Senha inválida");

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return { token, user };
}
