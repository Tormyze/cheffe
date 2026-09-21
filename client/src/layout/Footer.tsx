import Container from "./Container";
import { NavLink } from "react-router";
import { facebook, instagram, x, linkedin, youtube } from "../assets/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-black py-16 sm:py-20">
      <Container className="flex flex-col gap-12 sm:gap-16">
        <article className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex flex-1 flex-col items-start gap-6 sm:gap-8">
            <NavLink to="/" className="inline-flex items-center gap-2">
              <img src="/logo.svg" alt="Cheffe Logo" className="h-8" />
            </NavLink>

            <div className="flex flex-col gap-5 font-spectral text-sm text-white/80">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-white">Endereço</span>
                <p>Rua das Especiarias, 45, São Paulo, SP</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-semibold text-white">Contato</span>
                <div className="flex flex-col gap-0.5">
                  <a
                    href="tel:1134567890"
                    className="underline hover:text-zest transition-colors"
                  >
                    (11) 3456-7890
                  </a>
                  <a
                    href="mailto:contato@cheffe.com.br"
                    className="underline hover:text-zest transition-colors"
                  >
                    contato@cheffe.com.br
                  </a>
                </div>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 text-white/70">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-zest transition-colors"
              >
                <img src={facebook} alt="Facebook" className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-zest transition-colors"
              >
                <img src={instagram} alt="Instagram" className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="hover:text-zest transition-colors"
              >
                <img src={x} alt="X" className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-zest transition-colors"
              >
                <img src={linkedin} alt="LinkedIn" className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Youtube"
                className="hover:text-zest transition-colors"
              >
                <img src={youtube} alt="Youtube" className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* NavLinks */}
          <nav className="grid grid-cols-2 gap-8 sm:gap-12 lg:gap-16 font-spectral text-sm font-medium">
            <ul className="flex flex-col gap-3">
              <li>
                <NavLink to="/" className="hover:text-zest transition-colors">
                  Início
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#featured"
                  className="hover:text-zest transition-colors"
                >
                  Receitas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#categories"
                  className="hover:text-zest transition-colors"
                >
                  Categorias
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="hover:text-zest transition-colors"
                >
                  Explorar
                </NavLink>
              </li>
            </ul>

            <ul className="flex flex-col gap-3">
              <li>
                <NavLink
                  to="/#how-it-works"
                  className="hover:text-zest transition-colors"
                >
                  Como funciona
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#reviews"
                  className="hover:text-zest transition-colors"
                >
                  Depoimentos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#about"
                  className="hover:text-zest transition-colors"
                >
                  Sobre nós
                </NavLink>
              </li>
              <li>
                <a
                  href="mailto:contato@cheffe.com.br"
                  className="hover:text-zest transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </article>

        {/* Copyright and Terms */}
        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 text-xs font-spectral text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Cheffe. Todos os direitos reservados.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6">
            <span className="underline hover:text-white cursor-pointer transition-colors">
              Política de privacidade
            </span>
            <span className="underline hover:text-white cursor-pointer transition-colors">
              Termos de serviço
            </span>
            <span className="underline hover:text-white cursor-pointer transition-colors">
              Configurações de cookies
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
