import { Application } from "express";
import { signup, login } from "../controllers/authController";

const authRoutes = (app: Application) => {
  // Login usuario
  app.post("/auth/login", login);

  // Singup Usuario
  app.post("/auth/singup", signup);
};

export default authRoutes;
