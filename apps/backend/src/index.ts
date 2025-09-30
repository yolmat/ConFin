/*
    Inicialização do Express
 */
import express from "express";
import { json } from "body-parser";
import {
  createTransaction,
  getTransactions,
  partialPayment,
} from "./controllers/transactionController";

const app = express();
app.use(json());

// Rotas de teste
app.get("/transactions", getTransactions);
app.post("/transactions", createTransaction);
app.post("/transactions/partial", partialPayment);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
