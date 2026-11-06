import { Router } from "express";
import {
  checkHealth,
  getRecipeById,
  getRecipes,
  postRecipe,
} from "../controller/recipeController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);

router.post("/", authenticateToken, postRecipe);

// monitoramento e keep-alive
router.get("/health", checkHealth);

export default router;

// recipeRoutes.ts - arquivo das rotas da API
