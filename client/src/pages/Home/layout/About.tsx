import Container from "../../../layout/Container";
import Button from "../../../components/Button";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

export default function About() {
  return (
    <section className="py-6 sm:py-20 lg:py-28">
      <Container className="text-black flex flex-col gap-6">
        <article className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
          <div className="flex flex-1 flex-col items-start gap-4 sm:gap-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <span className="font-spectral text-sm font-semibold sm:text-base">
                Sobre
              </span>

              <h2 className="text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.2]">
                O <span className="text-zest">Cheffe </span>nasceu do cheiro da
                cozinha
              </h2>

              <p className="font-spectral text-sm leading-relaxed text-black/80 sm:text-base lg:text-lg">
                Catalogamos as receitas que contam a história do Brasil.
                Acreditamos que qualquer pessoa pode aprender a cozinhar, um
                prato de cada vez.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Button className="text-xs font-spectral border-2 border-black-20">
                Explorar
              </Button>

              <NavLink
                to="#"
                className="inline-flex items-center gap-2 font-spectral text-sm font-medium transition-opacity hover:opacity-75 sm:text-base"
              >
                Saiba mais
                <ChevronRight className="w-4" />
              </NavLink>
            </div>
          </div>

          <div className="w-full flex-1">
            <img
              src="https://images.unsplash.com/photo-1572715376701-98568319fd0b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Cozinha brasileira tradicional"
              className="h-64 w-full rounded-2xl object-cover sm:h-96 lg:h-135 xl:h-160"
            />
          </div>
        </article>
      </Container>
    </section>
  );
}
