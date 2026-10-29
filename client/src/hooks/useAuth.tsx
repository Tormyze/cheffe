import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

// hook customizado para facilitar o consumo do contexto nos componentes
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
