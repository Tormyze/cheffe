import { useState, useEffect } from "react";
import { loginUser, registerUser, type LoginPayload, type RegisterPayload } from "../services/recipeService";
import { AuthContext, type User } from "./authContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // carrega os dados salvos no localStorage ao iniciar a aplicação
  useEffect(() => {
    function loadStorageData() {
      const storedToken = localStorage.getItem("@cheffe:token");
      const storedUser = localStorage.getItem("@cheffe:user");

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Erro ao carregar usuário do localStorage:", error);
          localStorage.removeItem("@cheffe:token");
          localStorage.removeItem("@cheffe:user");
        }
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async (credentials: LoginPayload) => {
    const data = await loginUser(credentials);
    
    setUser(data.user);
    localStorage.setItem("@cheffe:token", data.token);
    localStorage.setItem("@cheffe:user", JSON.stringify(data.user));
  };

  const signUp = async (credentials: RegisterPayload) => {
    await registerUser(credentials);
  };

  const signOut = () => {
    localStorage.removeItem("@cheffe:token");
    localStorage.removeItem("@cheffe:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
