import Container from "../../../layout/Container";
import CategoryCard from "../../../components/CategoryCard";

export default function Categories() {
  return (
    <section className="bg-black">
      <Container className="flex flex-col gap-6 py-6">
        <header className="max-w-3xl mx-auto flex flex-col gap-2 text-center sm:gap-4">
          <span className="font-spectral text-sm font-semibold text-zest sm:text-base">
            Categorias
          </span>

          <h2 className="text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            <span>Explore por </span>
            <span className="text-zest">sabor</span>
          </h2>

          <p className="font-spectral text-sm sm:text-lg">
            Encontre receitas separadas pelo que você ama cozinhar
          </p>
        </header>

        <article className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
          <CategoryCard
            category="Doces"
            description="Brigadeiros, bolos e tudo que adoça a vida"
          />
          <CategoryCard
            category="Lanches"
            description="Coxinhas, empadas e petiscos para qualquer hora"
          />
          <CategoryCard
            category="Massas"
            description="Macarrão, lasanha e pratos que abraçam a alma"
            isLarge
          />
          <CategoryCard
            category="Bebidas"
            description="Sucos, drinks e tudo para acompanhar sua refeição"
            isLarge
          />
          <CategoryCard
            category="Almoço"
            description="O Brasil inteiro em um só lugar para você"
          />
          <CategoryCard
            category="Sobremesas"
            description="O final perfeito para qualquer refeição em família"
          />
        </article>
      </Container>
    </section>
  );
}
