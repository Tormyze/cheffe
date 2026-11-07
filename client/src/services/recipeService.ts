import api from "./api";
import type { Category, Ingredient, Recipe } from "../types/recipe";

export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  email: string;
  createdAt?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  username: string;
  bio: string;
} // tipagem do payload de cadastro

export interface LoginPayload {
  email: string;
  password: string;
} // tipagem do payload de login

export interface CreateRecipePayload {
  title: string;
  imgUrl: string;
  category: Category;
  prepTime: number;
  ingredients: Omit<Ingredient, "id">[];
  steps: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
} // tipagem da resposta da API com token

export interface UpdateProfilePayload {
  name?: string;
  username?: string;
  bio?: string;
}

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await api.get<Recipe[]>("/recipes");
  return response.data;
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  const response = await api.get<Recipe>(`/recipes/${id}`);
  return response.data;
};

export const registerUser = async (data: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get<{ user: User }>("/auth/me");
  return response.data.user;
};

export const updateProfile = async (
  data: UpdateProfilePayload,
): Promise<User> => {
  const response = await api.patch<{ user: User }>("/auth/me", data);
  return response.data.user;
};

export const createRecipe = async (data: CreateRecipePayload): Promise<Recipe> => {
  const response = await api.post<Recipe>("/recipes", data);
  return response.data;
};

export const updateRecipe = async (
  id: string,
  data: CreateRecipePayload,
): Promise<Recipe> => {
  const response = await api.patch<Recipe>(`/recipes/${id}`, data);
  return response.data;
};

export const deleteRecipe = async (id: string): Promise<void> => {
  await api.delete(`/recipes/${id}`);
};