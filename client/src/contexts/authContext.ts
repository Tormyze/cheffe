import { createContext } from "react";
import type { LoginPayload, RegisterPayload, User } from "../services/recipeService";
export type { User } from "../services/recipeService";

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (data: LoginPayload) => Promise<void>;
  signUp: (data: RegisterPayload) => Promise<void>;
  updateUser: (data: User) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);