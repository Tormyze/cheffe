import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// app.get('/receitas', (req, res) => {
//   res.status(200).send('Deu certo!');
// });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
