import { prisma } from '../../src/database/prisma.js';
import recipesData from './seedData.json' with { type: 'json' };

async function main() {
  console.log('🌱 Povoando banco com relacionamento N:N (Tabela Pivô)...');

  await prisma.recipeIngredient.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();

  for (const recipe of recipesData) {
    const createdRecipe = await prisma.recipe.create({
      data: {
        id: recipe.id,
        title: recipe.title,
        imgUrl: recipe.imgUrl,
        category: recipe.category,
        prepTime: recipe.prepTime,
        steps: recipe.steps,
      },
    });

    for (const ing of recipe.ingredients) {
      const dbIngredient = await prisma.ingredient.upsert({
        where: { name: ing.name },
        update: {},
        create: { name: ing.name },
      });

      await prisma.recipeIngredient.create({
        data: {
          recipeId: createdRecipe.id,
          ingredientId: dbIngredient.id,
          amount: ing.amount,
          unit: ing.unit,
          description: ing.description,
        },
      });
    }
  }

  console.log('✅ Banco de dados N:N povoado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao povoar o banco:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });