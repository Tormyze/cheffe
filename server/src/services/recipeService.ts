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
  user: recipe.user
    ? {
        id: recipe.user.id,
        username: recipe.user.username,
      }
    : null,
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

const includeRecipeRelations = {
  ...includeIngredients,
  user: {
    select: {
      id: true,
      username: true,
    },
  },
};

export const getAllRecipes = async () => {
  const recipes = await prisma.recipe.findMany({
    include: includeRecipeRelations,
  });

  return recipes.map(formatRecipe);
};

export const getRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: includeRecipeRelations,
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
      include: includeRecipeRelations,
    });
  });

  return formatRecipe(recipe);
};

export const updateRecipe = async (
  id: string,
  userId: string,
  data: CreateRecipeInput,
) => {
  const recipe = await prisma.$transaction(async (transaction) => {
    const existingRecipe = await transaction.recipe.findFirst({
      where: { id, userId },
    });

    if (!existingRecipe) return null;

    await transaction.recipeIngredient.deleteMany({
      where: { recipeId: id },
    });

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

    return transaction.recipe.update({
      where: { id },
      data: {
        title: data.title,
        imgUrl: data.imgUrl,
        category: data.category,
        prepTime: data.prepTime,
        steps: data.steps,
        ingredients: { create: recipeIngredients },
      },
      include: includeRecipeRelations,
    });
  });

  return recipe ? formatRecipe(recipe) : null;
};

export const deleteRecipe = async (id: string, userId: string) => {
  const recipe = await prisma.recipe.findFirst({
    where: { id, userId },
    select: { id: true },
  });

  if (!recipe) return false;

  await prisma.recipe.delete({
    where: { id: recipe.id },
  });

  return true;
};