import type { Request, Response } from "express";
import * as recipeService from "../services/recipeService";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import type { CreateRecipeInput } from "../types/recipe";

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const getRecipeById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Receita não encontrada" });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Erro ao buscar receita por id:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const postRecipe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      title,
      imgUrl,
      category,
      prepTime,
      ingredients,
      steps,
    }: CreateRecipeInput = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (
      !title ||
      !imgUrl ||
      !category ||
      !Number.isFinite(prepTime) ||
      !Array.isArray(ingredients) ||
      !ingredients.length ||
      !Array.isArray(steps) ||
      !steps.length
    ) {
      return res.status(400).json({ error: "Dados da receita inválidos." });
    }

    if (
      ingredients.some(
        (ingredient) =>
          !ingredient ||
          typeof ingredient.name !== "string" ||
          !ingredient.name.trim(),
      )
    ) {
      return res
        .status(400)
        .json({ error: "Dados dos ingredientes inválidos." });
    }

    const recipe = await recipeService.createRecipe(userId, {
      title,
      imgUrl,
      category,
      prepTime,
      ingredients,
      steps,
    });

    return res.status(201).json(recipe);
  } catch (error) {
    console.error("Erro ao criar receita:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const editRecipe = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const {
      title,
      imgUrl,
      category,
      prepTime,
      ingredients,
      steps,
    }: CreateRecipeInput = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (typeof id !== "string" || !id) {
      return res.status(400).json({ error: "Identificador da receita inválido." });
    }

    if (
      !title ||
      !imgUrl ||
      !category ||
      !Number.isFinite(prepTime) ||
      !Array.isArray(ingredients) ||
      !ingredients.length ||
      !Array.isArray(steps) ||
      !steps.length
    ) {
      return res.status(400).json({ error: "Dados da receita inválidos." });
    }

    if (
      ingredients.some(
        (ingredient) =>
          !ingredient ||
          typeof ingredient.name !== "string" ||
          !ingredient.name.trim(),
      )
    ) {
      return res
        .status(400)
        .json({ error: "Dados dos ingredientes inválidos." });
    }

    const recipe = await recipeService.updateRecipe(id, userId, {
      title,
      imgUrl,
      category,
      prepTime,
      ingredients,
      steps,
    });

    if (!recipe) {
      return res.status(404).json({ message: "Receita não encontrada." });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Erro ao editar receita:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const deleteRecipe = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (typeof id !== "string" || !id) {
      return res.status(400).json({ error: "Identificador da receita inválido." });
    }

    const deleted = await recipeService.deleteRecipe(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Receita não encontrada." });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir receita:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const checkHealth = (req: Request, res: Response) =>
  res.status(200).json({ status: "OK", uptime: process.uptime() });

// recipeController.ts - arquivo do controller da API

// o controller é responsável por receber a requisição e enviar a resposta para o cliente. Ele é chamado pelas rotas da API.

// caso o processamento dos dados seja complexo ou o código fique muito extenso, o controller pode chamar funções de serviços (services) para realizar o processamento ou quaisquer outras que façam sentido.
