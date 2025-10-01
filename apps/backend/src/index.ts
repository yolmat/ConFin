/*
    Inicialização do Express
 */
import express from "express";
import { json } from "body-parser";
import {
  allTranisitonsGlobal,
  createTransaction,
  getTransactions,
  partialPayment,
} from "./controllers/transactionController";

import { login, allUsers } from "./controllers/authController";

const app = express();
app.use(json());

// Rotas de teste
app.get("/transactions", getTransactions);
app.post("/transactions", createTransaction);
app.post("/transactions/partial", partialPayment);
app.post("/login", login);
app.get("/users", allUsers);
app.get("/allTranisitonsGlobal", allTranisitonsGlobal);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
