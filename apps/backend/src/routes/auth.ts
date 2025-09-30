import { Router } from "express";
import { signup, login } from "../controllers/authController";

const router = Router();

// Signup e Login
router.post("/signup", signup);
router.post("/login", login);

export default router;
