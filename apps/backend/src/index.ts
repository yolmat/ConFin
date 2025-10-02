/*
    Inicialização do Express
 */
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import routes from "./routes/index.routes";

const app = express();

app.use(cors());
app.use(json());

routes(app);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
