import type { Request, Response } from "express";
import * as recipeService from '../services/recipeService.js';

export const getRecipes = (req: Request, res: Response) => {
  const recipes = recipeService.getAllRecipes();
  return res.status(200).json(recipes);
};

export const getRecipeById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const recipe = recipeService.getRecipeById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'Receita não encontrada' });
  }

  return res.status(200).json(recipe);
};

// recipeController.ts - arquivo do controller da API

// o controller é responsável por receber a requisição e enviar a resposta para o cliente. Ele é chamado pelas rotas da API.

// caso o processamento dos dados seja complexo ou o código fique muito extenso, o controller pode chamar funções de serviços (services) para realizar o processamento ou quaisquer outras que façam sentido.
