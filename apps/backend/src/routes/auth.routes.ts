import { Router } from "express";
import { login } from "../services/auth.service";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
