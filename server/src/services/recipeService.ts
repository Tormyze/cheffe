import { prisma } from '../database/prisma';
import type { CreateRecipeInput } from '../types/recipe';

// helper para padronizar o retorno para a interface do Front-end
const formatRecipe = (recipe: any) => ({
  id: recipe.id,
  title: recipe.title,
  imgUrl: recipe.imgUrl,
  category: recipe.category,
  prepTime: recipe.prepTime,
  steps: recipe.steps,
  ingredients: recipe.ingredients.map((item: any) => ({
    id: item.ingredient.id,
    name: item.ingredient.name,
    amount: item.amount ?? undefined,
    unit: item.unit ?? undefined,
    description: item.description ?? undefined,
  })),
});

// inclui o relacionamento N:N da receita com os ingredientes
const includeIngredients = {
  ingredients: {
    include: {
      ingredient: true,
    },
  },
};

export const getAllRecipes = async () => {
  const recipes = await prisma.recipe.findMany({
    include: includeIngredients,
  });

  return recipes.map(formatRecipe);
};

export const getRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: includeIngredients,
  });

  if (!recipe) return null;

  return formatRecipe(recipe);
};

export const createRecipe = async (
  userId: string,
  data: CreateRecipeInput,
) => {
  const recipe = await prisma.$transaction(async (transaction) => {
    const recipeIngredients = [];

    for (const ingredient of data.ingredients) {
      const savedIngredient = await transaction.ingredient.upsert({
        where: { name: ingredient.name },
        update: {},
        create: { name: ingredient.name },
      });

      recipeIngredients.push({
        ingredientId: savedIngredient.id,
        amount: ingredient.amount,
        unit: ingredient.unit,
        description: ingredient.description,
      });
    }

    return transaction.recipe.create({
      data: {
        title: data.title,
        imgUrl: data.imgUrl,
        category: data.category,
        prepTime: data.prepTime,
        steps: data.steps,
        user: { connect: { id: userId } },
        ingredients: { create: recipeIngredients },
      },
      include: includeIngredients,
    });
  });

  return formatRecipe(recipe);
};