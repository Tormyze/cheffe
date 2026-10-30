import { Router } from "express";
import { favoriteController } from "../controller/favoriteController";
import { authenticateToken } from "../middlewares/authMiddleware";

const favoriteRoutes = Router();

// Todas as rotas de favorito exigem autenticação!
favoriteRoutes.post("/:recipeId", authenticateToken, favoriteController.toggle);
favoriteRoutes.get("/", authenticateToken, favoriteController.list);
// router.METHOD(caminho, ...middlewares, controller)

export default favoriteRoutes;