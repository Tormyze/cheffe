import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (name: string, email: string, password: string) => {
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