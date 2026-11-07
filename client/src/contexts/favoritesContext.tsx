import React, { useState, useEffect } from "react";
import { FavoritesContext } from "./favoritesContext";
import { favoriteService } from "../services/favoriteService";
import { useAuth } from "../hooks/useAuth";
import type { Recipe } from "../types/recipe";

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const isFavorite = (recipeId: string) => favoriteIds.includes(recipeId);

  const fetchFavorites = async () => {
    if (!isAuthenticated) {
      setFavoriteRecipes([]);
      setFavoriteIds([]);
      return;
    }

    try {
      setLoadingFavorites(true);
      const data = await favoriteService.getFavorites();
      setFavoriteRecipes(data);
      setFavoriteIds(data.map((recipe) => recipe.id));
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    // se não estiver autenticado, a busca nem inicia
    if (!isAuthenticated) return;

    favoriteService
      .getFavorites()
      .then((data) => {
        setFavoriteRecipes(data);
        setFavoriteIds(data.map((recipe) => recipe.id));
      })
      .catch((err) => {
        console.error("Erro ao carregar favoritos:", err);
      });
  }, [isAuthenticated]);

  const toggleFavorite = async (recipeId: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    // Atualização Otimista local
    const isCurrentlyFav = favoriteIds.includes(recipeId);
    if (isCurrentlyFav) {
      setFavoriteIds((prev) => prev.filter((id) => id !== recipeId));
      setFavoriteRecipes((prev) =>
        prev.filter((recipe) => recipe.id !== recipeId),
      );
    } else {
      setFavoriteIds((prev) => [...prev, recipeId]);
    }

    try {
      await favoriteService.toggleFavorite(recipeId);
      await fetchFavorites();
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
      fetchFavorites();
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoriteRecipes,
        loadingFavorites,
        isFavorite,
        toggleFavorite,
        refreshFavorites: fetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
