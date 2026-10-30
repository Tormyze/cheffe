import { prisma } from "../database/prisma";

export const favoriteService = {
  // Alternar favorito (se existir remove, se não existir cria)
  async toggleFavorite(userId: string, recipeId: string) {
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
      return { isFavorite: false };
    }

    await prisma.favorite.create({
      data: {
        userId,
        recipeId,
      },
    });

    return { isFavorite: true };
  },

  // listar as receitas favoritadas pelo usuário
  async getUserFavorites(userId: string) {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        recipe: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return favorites.map((fav) => fav.recipe);
  },
};