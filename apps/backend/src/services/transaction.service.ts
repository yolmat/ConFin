import { prisma } from "../db/client";
import { TransactionStatus } from "@prisma/client";

export const createTransaction = async (userId: string, data: any) => {
  const { title, type, amountTotal, paidAmount, date } = data;

  let pendingAmountCount = amountTotal - paidAmount;
  let status: TransactionStatus =
    pendingAmountCount < 0 ? TransactionStatus.PENDING : TransactionStatus.PAID;

  const transaction = prisma.transaction.create({
    data: {
      userId,
      title,
      type,
      amountTotal,
      paidAmount,
      pendingAmount: pendingAmountCount,
      status,
      date: new Date(date),
    },
  });

  return transaction;
};
