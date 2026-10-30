import { Response } from "express";
import { favoriteService } from "../services/favoriteService";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const favoriteController = {
  async toggle(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const recipeId = req.params.recipeId as string;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const result = await favoriteService.toggleFavorite(userId, recipeId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao alternar favorito." });
    }
  },

  async list(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const favorites = await favoriteService.getUserFavorites(userId);
      return res.status(200).json(favorites);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar favoritos." });
    }
  },
};