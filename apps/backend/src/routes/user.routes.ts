import { Application } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { allUsers, getMe } from "../controllers/authController";

const userRoutes = (app: Application) => {
  // Usuario logado
  app.get("/user/me", authMiddleware, getMe);

  // Todos os usuarios
  app.get("/users/all", allUsers);
};

export default userRoutes;
