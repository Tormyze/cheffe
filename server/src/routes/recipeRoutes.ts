import { Router } from "express";
import {
  checkHealth,
  getRecipeById,
  getRecipes,
} from "../controller/recipeController";

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);

// monitoramento e keep-alive
router.get("/health", checkHealth);

export default router;

// recipeRoutes.ts - arquivo das rotas da API
