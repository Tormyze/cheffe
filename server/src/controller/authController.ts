import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // validação básica do backend para os campos obrigatórios conforme as regras de negócio
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "A senha deve conter no mínimo 6 caracteres." });
    }

    const user = await authService.registerUser(name, email, password);
    return res.status(201).json({ message: "Usuário cadastrado com sucesso!", user });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ error: error.message || "Erro interno do servidor." });
  }
};