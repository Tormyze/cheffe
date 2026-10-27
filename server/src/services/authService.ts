import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  // verifica se o e-mail já está cadastrado
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error: any = new Error("E-mail já cadastrado.");
    error.statusCode = 409;
    throw error;
  }

  // criptografa a senha com bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // salva o novo usuário no banco
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  // verifica se o e-mail existe
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const error: any = new Error("E-mail ou senha inválidos.");
    error.statusCode = 401;
    throw error;
  }

  // compara a senha com o hash no banco
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error: any = new Error("E-mail ou senha inválidos.");
    error.statusCode = 401;
    throw error;
  }

  // gera o token JWT (payload + segredo + expiração)
  const secret = process.env.JWT_SECRET || "default_secret";
  const token = jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: "7d" }
  );

  // retornar dados do usuário (sem a senha) e o token
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};