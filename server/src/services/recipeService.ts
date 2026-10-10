import { recipesData } from '../data/recipesData.js';

export const getAllRecipes = () => recipesData;

export const getRecipeById = (id: string) => {
  return recipesData.find((recipe) => recipe.id === id);
};