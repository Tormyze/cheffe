import Container from "../../../layout/Container";
import Button from "../../../components/Button";

export default function Hero() {
  return (
    <section className="relative bg-[url('./hero-bg.jpg')] bg-cover bg-center bg-no-repeat flex flex-col">
      <div className="absolute inset-0 bg-black/50" />
      <Container className="relative z-10 flex flex-col items-center justify-center grow py-10 gap-8">
        <article className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-medium text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Aprenda a cozinhar o Brasil de verdade
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <Button className="bg-linear-to-r from-zest to-zest-light text-white">
              Buscar
            </Button>
            <Button className="text-zest-light border border-zest-light">
              Explorar
            </Button>
          </div>
        </article>
        <article>
          <p className="text-white/80 text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Receitas brasileiras autênticas para todos os dias. Encontre o
            próximo prato que vai reunir sua família à mesa.
          </p>
        </article>
      </Container>
    </section>
  );
}
