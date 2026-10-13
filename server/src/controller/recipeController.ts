import type { Request, Response } from 'express';
import * as recipeService from '../services/recipeService';

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const getRecipeById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error('Erro ao buscar receita por id:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

// recipeController.ts - arquivo do controller da API

// o controller é responsável por receber a requisição e enviar a resposta para o cliente. Ele é chamado pelas rotas da API.

// caso o processamento dos dados seja complexo ou o código fique muito extenso, o controller pode chamar funções de serviços (services) para realizar o processamento ou quaisquer outras que façam sentido.
