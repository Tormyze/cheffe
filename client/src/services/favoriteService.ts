import api from "./api";
import type { Recipe } from "../types/recipe";

export const favoriteService = {
  toggleFavorite: async (recipeId: string): Promise<{ isFavorite: boolean }> => {
    const response = await api.post(`/favorites/${recipeId}`);
    return response.data;
  },

  getFavorites: async (): Promise<Recipe[]> => {
    const response = await api.get("/favorites");
    return response.data;
  },
};