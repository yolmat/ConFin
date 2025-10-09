/*
  Controller de Transações
 */
import { Request, Response } from "express";
import { prisma } from "../db/client";
import * as transactionService from "../services/transaction.service";

export const createTransaction = async (req: Request, res: Response) => {
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
