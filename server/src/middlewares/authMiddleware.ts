import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// estende o Request do Express e inclui o usuário autenticado
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction // JS NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // extrai o token de "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
  }

  try {
    const secret = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secret) as { id: string; email: string };

    // anexa os dados do user na req
    req.user = decoded;

    return next(); // req volta para o controller
  } catch (error) {
    return res.status(403).json({ error: "Token inválido ou expirado." });
  }
};