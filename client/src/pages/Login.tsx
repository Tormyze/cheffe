import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Container from "../layout/Container";
import { Input } from "../components/Input";
import Button from "../components/Button";
import googleIcon from "../assets/icons/google.svg";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Conectar com o endpoint de autenticação (JWT) via Axios
    console.log("Dados de Login:", { email, password });

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <section className="min-h-[calc(100vh-140px)] flex items-center justify-center py-8 sm:py-12 md:py-16 px-4">
      <Container className="flex justify-center items-center w-full">
        {/* Card Principal de Login */}
        <div className="w-full max-w-140 p-5 sm:p-8 md:p-12 bg-white rounded-2xl shadow border flex flex-col items-center gap-6 sm:gap-8 text-center">
          
          {/* Cabeçalho do Card */}
          <div className="w-full flex flex-col items-center gap-2 sm:gap-4">
            <h1 className="w-full text-center text-zest text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
              Login
            </h1>
            <p className="w-full text-center text-gray-700 text-sm sm:text-base md:text-lg font-spectral leading-relaxed">
              Entre com seus dados para acessar sua conta.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 sm:gap-6">
            <div className="w-full flex flex-col gap-4 sm:gap-5 text-left">
              <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Ações e Botões */}
            <div className="w-full flex flex-col gap-3 sm:gap-4 items-center">
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 px-6 bg-zest hover:bg-zest-dark text-white text-base font-medium rounded-xl transition-all shadow-xs cursor-pointer"
              >
                {loading ? "Entrando..." : "Login"}
              </Button>

              {/* Divisor "ou" */}
              <div className="w-full flex items-center justify-center gap-3 my-1">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-gray-500 text-sm sm:text-base font-normal font-spectral">
                  ou
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Botão do Google */}
              <button
                type="button"
                onClick={() => alert("Login com Google em desenvolvimento.")}
                className="w-full py-2.5 sm:py-3 px-6 bg-white border border-gray-300 rounded-xl font-medium text-gray-800 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 text-sm sm:text-base cursor-pointer"
              >
                <img src={googleIcon} alt="Google logo" className="w-4 h-4" />
                <span>Login com Google</span>
              </button>

              {/* Link para Cadastro */}
              <div className="w-full flex flex-wrap items-center justify-center gap-1.5 mt-2 text-sm sm:text-base font-spectral text-gray-700">
                <span>Não tem uma conta?</span>
                <Link
                  to="/cadastro"
                  className="font-medium text-zest hover:text-zest-dark transition-colors underline sm:no-underline"
                >
                  Criar conta
                </Link>
              </div>
            </div>
          </form>

        </div>
      </Container>
    </section>
  );
};

export default Login;