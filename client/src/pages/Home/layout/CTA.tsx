import Container from "../../../layout/Container";
import Button from "../../../components/Button";

export default function CTA() {
  return (
    <section className="text-black py-12 sm:py-20 lg:py-28">
      <Container>
        <article className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
          <div className="flex flex-1 flex-col items-start gap-6 sm:gap-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <h2 className="text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.2]">
                Encontre o que você ama
              </h2>
              <p className="font-spectral text-sm leading-relaxed text-black/80 sm:text-base lg:text-lg">
                Aprenda com cada receita e experimente os melhores sabores.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <Button className="bg-linear-to-r from-zest to-zest-light text-xs font-spectral text-white shadow-md sm:text-sm">
                Buscar
              </Button>
              <Button className="text-xs font-spectral border border-black-20 text-black sm:text-sm">
                Explorar
              </Button>
            </div>
          </div>

          <div className="w-full flex-1">
            <img
              src="https://images.unsplash.com/photo-1565895405140-6b9830a88c19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudCUyMGZvb2QlMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Pessoa servindo-se à mesa de um restaurante"
              className="h-56 w-full rounded-2xl object-cover sm:h-80 lg:h-96"
            />
          </div>
        </article>
      </Container>
    </section>
  );
}