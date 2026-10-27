import { Router } from "express";
import { register, login } from "../controller/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;

// authRoutes.ts - arquivo das rotas de autenticação da API