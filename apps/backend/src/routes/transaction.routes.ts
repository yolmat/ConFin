import { Application } from "express";
import {
  allTranisitonsGlobal,
  allTransactionUsers,
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

  // Tras todas as transações com base no token do usuario
  app.get("/transaction/AllTransactionsUsers", allTransactionUsers);
};

export default transactionsRoutes;
