import { Application } from "express";
import authRoutes from "./auth.routes";
import transactionsRoutes from "./transactions.routes";

const routes = (app: Application) => {
  authRoutes(app);
  transactionsRoutes(app);
};

export default routes;
