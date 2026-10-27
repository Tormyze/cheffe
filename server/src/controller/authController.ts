import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    const result = await authService.loginUser(email, password);
    return res.status(200).json({ message: "Login realizado com sucesso!", ...result });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({ error: error.message || "Erro interno do servidor." });
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        recipes: true
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: "Erro ao buscar dados do perfil." });
  }
};