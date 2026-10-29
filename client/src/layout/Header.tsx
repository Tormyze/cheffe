import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import Container from "./Container";
// import Button from "../components/Button";
import UserProfileBadge from "../components/UserProfileBadge";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="w-full py-2 md:py-4 border-b-4 border-zest bg-white sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/logo.svg" alt="Cheffe Logo" className="h-7" />
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden items-center gap-8 md:flex font-spectral text-base text-zest">
            <div className="flex items-center gap-8">
              <Link to="/" className="hover:underline">
                Início
              </Link>
              <Link to="/receitas" className="hover:underline">
                Receitas
              </Link>
            </div>

            {/* badge do usuário */}
            {isAuthenticated ? (
              <UserProfileBadge />
            ) : (
              <div className="text-sm flex items-center gap-4">
                {/* <Link to="/login">
                  <Button className="outline outline-zest-light text-zest hover:bg-zest/10 transition-colors cursor-pointer">
                    Entrar
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button className="bg-zest text-white hover:opacity-90 transition-opacity cursor-pointer">
                    Criar
                  </Button>
                </Link> */}
              </div>
            )}
          </nav>

          {/* Botão Menu Mobile */}
          <button
            type="button"
            onClick={toggleMenu}
            className="py-2 md:hidden cursor-pointer"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? (
              <X className="text-zest" />
            ) : (
              <Menu className="text-zest" />
            )}
          </button>
        </div>

        {/* Dropdown Menu Mobile */}
        {isMenuOpen && (
          <nav className="flex flex-col gap-4 pt-4 pb-2 border-t border-black/10 mt-2 font-spectral text-base text-zest md:hidden">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="hover:underline"
            >
              Início
            </Link>
            <Link
              to="/receitas"
              onClick={() => setIsMenuOpen(false)}
              className="hover:underline"
            >
              Receitas
            </Link>

            {isAuthenticated ? (
              <div onClick={() => setIsMenuOpen(false)}>
                <UserProfileBadge />
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-black/10">
                {/* <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-2 rounded-xl outline outline-zest-light font-medium"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-center py-2 bg-zest rounded-xl text-white font-medium"
                >
                  Criar
                </Link> */}
              </div>
            )}
          </nav>
        )}
      </Container>
    </header>
  );
}
