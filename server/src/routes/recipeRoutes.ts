import { Router } from 'express';
import { getRecipeById, getRecipes } from '../controller/recipeController.js';

const router = Router();

router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipeById);

export default router;

// recipeRoutes.ts - arquivo das rotas da API