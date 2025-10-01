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

import { allUsers } from "./controllers/authController";
import { login } from "./services/auth.service";

const app = express();
app.use(json());

// Rotas de teste
app.get("/transactions", getTransactions);
app.post("/transactions", createTransaction);
app.post("/transactions/partial", partialPayment);
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/users", allUsers);
app.get("/allTranisitonsGlobal", allTranisitonsGlobal);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
