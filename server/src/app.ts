import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipeRoutes";
import authRoutes from "./routes/authRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173", // desenvolvimento local com Vite
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin não autorizada pelo CORS"));
    },
  })
);

const PORT = process.env.PORT || 3001;

// todas as rotas da API serão prefixadas com /api
app.use('/api/recipes', recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/uploads", uploadRoutes);

// inicia o servidor apenas se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
  });
}

export default app;

// app.ts - arquivo de configuração do server