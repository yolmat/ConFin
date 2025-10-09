import { Application } from "express";
import authRoutes from "./auth.routes";
import transactionsRoutes from "./transaction.routes";
import userRoutes from "./user.routes";

const routes = (app: Application) => {
  authRoutes(app);
  transactionsRoutes(app);
  userRoutes(app);
};

export default routes;
