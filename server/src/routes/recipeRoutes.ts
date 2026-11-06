import { Router } from "express";
import {
  checkHealth,
  deleteRecipe,
  editRecipe,
  getRecipeById,
  getRecipes,
  postRecipe,
} from "../controller/recipeController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);

router.post("/", authenticateToken, postRecipe);
router.patch("/:id", authenticateToken, editRecipe);
router.delete("/:id", authenticateToken, deleteRecipe);

// monitoramento e keep-alive
router.get("/health", checkHealth);

export default router;

// recipeRoutes.ts - arquivo das rotas da API
