/*
    Inicialização do Express
 */
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import routes from "./routes/index.routes";
import { errorHandler } from "./middlewares/errorhandle.middleware";
import helmet from "helmet";
import { limiter } from "./configs";

const app = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.use(limiter);
routes(app);

app.use(errorHandler);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
