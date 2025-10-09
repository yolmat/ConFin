import { Application } from "express";
import {
  allTranisitonsGlobal,
  createTransaction,
} from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const transactionsRoutes = (app: Application) => {
  // Todas as rotas precisam ter token validos
  app.use(authMiddleware);

  // Criar nova transação
  app.post("/transaction/newtrasaction", createTransaction);

  // Tras todas as transações
  app.get("/transaction/all", allTranisitonsGlobal);
};

export default transactionsRoutes;
