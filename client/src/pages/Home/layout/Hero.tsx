import Container from "../../../layout/Container";
import Button from "../../../components/Button";

export default function Hero() {
  return (
    <section className="relative flex min-h-100 w-full flex-col justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat py-12 sm:py-20 lg:h-151.5 lg:py-0">
      <div className="absolute inset-0 bg-black/40" /> {/* sombra de fundo */}
      <Container className="relative z-10 w-full">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          {/* Left side */}
          <div className="flex flex-1 flex-col items-center gap-6 text-center sm:gap-8 lg:items-start lg:text-left">
            <h1 className="font-aleo text-3xl font-medium leading-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.2]">
              Aprenda a cozinhar o Brasil de verdade
            </h1>
            <div className="flex items-center gap-4">
              <Button className="bg-linear-to-r from-zest to-zest-light px-6 py-2.5 text-sm font-spectral text-white shadow-md transition-all hover:cursor-pointer hover:brightness-105 sm:text-base">
                Buscar
              </Button>
              <Button className="border border-zest-light px-6 py-2.5 text-sm font-spectral text-zest-light transition-all hover:cursor-pointer hover:bg-zest-light/10">
                Explorar
              </Button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-1 justify-center text-center lg:justify-end lg:text-left">
            <p className="font-aleo text-sm font-normal leading-relaxed text-white/90 sm:text-base lg:max-w-md lg:text-xl lg:leading-8 xl:max-w-120">
              Receitas brasileiras autênticas para todos os dias. Encontre o
              próximo prato que vai reunir sua família à mesa.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
