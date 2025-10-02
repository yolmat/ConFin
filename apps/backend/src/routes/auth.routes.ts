import { prisma } from "../db/client";
import { Application } from "express";
import { login } from "../services/auth.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { allUsers, signup } from "../controllers/authController";

const authRoutes = (app: Application) => {
  // Login usuario
  app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await login(email, password);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // Singup Usuario
  app.post("/auth/singup", signup);

  // Usuario logado
  app.get("/user/me", authMiddleware, async (req, res) => {
    const userId = (req as any).user.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      return res.status(404).json({ error: "Usuaário não encontrado" });

    res.json({ id: user.id, name: user.name, email: user.email });
  });

  app.get("/users/all", allUsers);
};

export default authRoutes;
