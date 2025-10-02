import { Application } from "express";
import {
  getTransactions,
  createTransaction,
} from "../controllers/transactionController";

const transactionsRoutes = (app: Application) => {
  // Listar transações com paginação
  app.get("/", getTransactions);

  // Criar nova transação
  app.post("/", createTransaction);
};

export default transactionsRoutes;
