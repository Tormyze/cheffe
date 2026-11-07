import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

const userSelect = {
  id: true,
  name: true,
  username: true,
  bio: true,
  email: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

const validationError = (message: string) => {
  const error = new Error(message);
  Object.assign(error, { statusCode: 400 });
  return error;
};

const normalizeUsername = (username: string) => username.trim().toLowerCase();

const validateUsername = (username: unknown) => {
  if (typeof username !== "string") {
    throw validationError("Username deve ser um texto.");
  }

  const normalizedUsername = normalizeUsername(username);
  if (!/^[a-z0-9_]{1,20}$/.test(normalizedUsername)) {
    throw validationError(
      "Username deve ter entre 1 e 20 caracteres e conter apenas letras, números e underscore.",
    );
  }

  return normalizedUsername;
};

const validateBio = (bio: unknown) => {
  if (bio === undefined || bio === null) {
    return "";
  }

  if (typeof bio !== "string" || bio.length > 200) {
    throw validationError("A bio deve ter no máximo 200 caracteres.");
  }

  return bio;
};

const duplicateUsernameError = () => {
  const error = new Error("Username já está ocupado.");
  Object.assign(error, { statusCode: 409 });
  return error;
};

const isUniqueConstraintError = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === "P2002" &&
  Array.isArray(error.meta?.target) &&
  error.meta.target.includes("username");

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  username: string,
  bio: string | undefined,
) => {
  const normalizedUsername = validateUsername(username);
  const normalizedBio = validateBio(bio);

  // verifica se o e-mail já está cadastrado
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { username: normalizedUsername }] },
    select: { email: true, username: true },
  });
  if (existingUser) {
    if (existingUser.username === normalizedUsername) {
      throw duplicateUsernameError();
    }

    const error = new Error("E-mail já cadastrado.");
    Object.assign(error, { statusCode: 409 });
    throw error;
  }

  // criptografa a senha com bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // salva o novo usuário no banco
  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        username: normalizedUsername,
        bio: normalizedBio,
        password: hashedPassword,
      },
      select: userSelect,
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw duplicateUsernameError();
    }
    throw error;
  }
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

export const updateProfile = async (
  userId: string,
  data: { name?: string; username?: string; bio?: string },
) => {
  const updateData: { name?: string; username?: string; bio?: string } = {};

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || !data.name.trim()) {
      const error = new Error("Nome é obrigatório.");
      Object.assign(error, { statusCode: 400 });
      throw error;
    }
    updateData.name = data.name.trim();
  }

  if (data.username !== undefined) {
    updateData.username = validateUsername(data.username);
  }

  if (data.bio !== undefined) {
    updateData.bio = validateBio(data.bio);
  }

  if (Object.keys(updateData).length === 0) {
    const error = new Error("Informe ao menos um campo para atualizar.");
    Object.assign(error, { statusCode: 400 });
    throw error;
  }

  try {
    return await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: userSelect,
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw duplicateUsernameError();
    }
    throw error;
  }
};