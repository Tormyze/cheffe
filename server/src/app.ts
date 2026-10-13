import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/recipeRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// todas as rotas da API serão prefixadas com /api
app.use('/api', routes);

// inicia o servidor apenas se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}!`);
  });
}

export default app;

// app.ts - arquivo de configuração do server