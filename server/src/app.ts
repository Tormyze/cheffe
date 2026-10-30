import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipeRoutes";
import authRoutes from "./routes/authRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// todas as rotas da API serão prefixadas com /api
app.use('/api/recipes', recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

// inicia o servidor apenas se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
  });
}

export default app;

// app.ts - arquivo de configuração do server