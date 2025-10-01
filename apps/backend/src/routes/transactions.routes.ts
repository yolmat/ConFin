import { Router } from "express";
import {
  getTransactions,
  createTransaction,
} from "../controllers/transactionController";

const router = Router();

// Listar transações com paginação
router.get("/", getTransactions);

// Criar nova transação
router.post("/", createTransaction);

export default router;
