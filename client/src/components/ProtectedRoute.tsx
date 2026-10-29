import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  // enquanto verifica o localStorage no boot da aplicação
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-spectral text-gray-500">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // se estiver autenticado, libera o acesso às rotas filhas
  return <Outlet />;
};

export default ProtectedRoute;