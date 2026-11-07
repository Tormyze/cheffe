import { Router } from "express";
import { register, login, getProfile, updateProfile } from "../controller/authController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getProfile);
router.patch("/me", authenticateToken, updateProfile);

export default router;

// authRoutes.ts - arquivo das rotas de autenticação da API