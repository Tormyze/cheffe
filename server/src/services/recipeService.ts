import { prisma } from '../database/prisma';

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