import { createContext } from "react";
import type { LoginPayload, RegisterPayload } from "../services/recipeService";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (data: LoginPayload) => Promise<void>;
  signUp: (data: RegisterPayload) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);