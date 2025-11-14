/*
  Controller de Transações
 */
import { Request, Response } from "express";
import { prisma } from "../db/client";
import * as transactionService from "../services/transaction.service";
import jwt from "jsonwebtoken";
import { transactionCreateSchema } from "../schemas/transaction";

export const createTransaction = async (req: Request, res: Response) => {
  const result = transactionCreateSchema.safeParse(req.body);

  if (!result.success)
    return res.status(400).json({ error: result.error.format() });

  const authHeader = req.headers.authorization as any;
  const [, token] = authHeader.split(" ");
  const decoded = jwt.decode(token) as any;

  if (req.body.id !== decoded.userId)
    return res.status(400).json({ message: "Usuarios divergentes" });
  try {
    const result = await transactionService.createTransaction(
      req.body.id,
      req.body
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const allTranisitonsGlobal = async (req: Request, res: Response) => {
  try {
    const transitions = await prisma.transaction.findMany();
    res.json(transitions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const allTransactionUsers = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const transactionsUser = await prisma.transaction.findMany({
      where: { userId },
    });

    if (!userId) return res.json(404).json({ error: "Usuario não encontrado" });
    return res.json(transactionsUser);
  } catch (e) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
