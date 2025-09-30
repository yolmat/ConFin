/*
  Controller de Transações
 */
import { Request, Response } from "express";
import { prisma } from "../db/client";

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { cursor, take = 10, userId } = req.query;

    const transactions = await prisma.transaction.findMany({
      where: { userId: String(userId) },
      take: Number(take),
      cursor: cursor ? { id: String(cursor) } : undefined,
      orderBy: { createdAt: "desc" },
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, title, amountTotal, paidAmount = 0 } = req.body;

    const pendingAmount = amountTotal - paidAmount;

    const status = pendingAmount <= 0 ? "PAID" : "PENDING";

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        title,
        amountTotal,
        paidAmount,
        pendingAmount,
        status,
      },
    });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const partialPayment = async (req: Request, res: Response) => {
  try {
    const { transactionId, amountPaid } = req.body;

    const transaction = await prisma.transaction.findUnique({
      where: { id: String(transactionId) },
    });

    if (!transaction)
      return res.status(404).json({ message: "Transação não encontrada" });

    const newPaidAmount = transaction.paidAmount + amountPaid;
    const newPendingAmount = transaction.amountTotal - newPaidAmount;
    const status = newPendingAmount <= 0 ? "PAID" : "PENDING";

    const updatedTransaction = await prisma.transaction.update({
      where: { id: String(transactionId) },
      data: {
        paidAmount: newPaidAmount,
        pendingAmount: newPendingAmount,
        status,
      },
    });

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error });
  }
};
