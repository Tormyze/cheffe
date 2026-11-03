import { createContext } from "react";
import type { Recipe } from "../types/recipe";

export interface FavoritesContextData {
  favoriteIds: string[];
  favoriteRecipes: Recipe[];
  loadingFavorites: boolean;
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipeId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

export const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData
);