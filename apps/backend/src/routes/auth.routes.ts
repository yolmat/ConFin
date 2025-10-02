import { Application } from "express";
import { signup, login, refresh } from "../controllers/authController";

const authRoutes = (app: Application) => {
  // Login usuario
  app.post("/auth/login", login);

  // Singup Usuario
  app.post("/auth/singup", signup);

  // Refresh Token
  app.post("/auth/refresh", refresh);
};

export default authRoutes;
