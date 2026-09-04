import Container from "../../../layout/Container";
import StepCard from "../../../components/StepCard";

const stepsData = [
  {
    step: "Passo 1",
    title: "Escolha a receita que chama seu nome",
    description: "Navegue pelas categorias ou busque pelo prato desejado.",
    linkText: "Explorar",
    linkTo: "#",
    imageUrl: "https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb",
  },
  {
    step: "Passo 2",
    title: "Siga o passo a passo sem medo",
    description: "Ingredientes claros e instruções diretas para você executar bem.",
    linkText: "Ver receitas",
    linkTo: "#",
    imageUrl: "https://images.unsplash.com/photo-1653233797467-1a528819fd4f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGNvb2t8ZW58MHx8MHx8fDA%3D",
  },
  {
    step: "Passo 3",
    title: "Aproveite o seu mais novo sabor",
    description: "Reúna-se com quem você ama e volte sempre que quiser, quando quiser.",
    linkText: "Destaques",
    linkTo: "#",
    imageUrl: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudCUyMGVhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function HowWorks() {
  return (
    <section className="bg-black py-12 sm:py-20 lg:py-28">
      <Container className="flex flex-col gap-8 sm:gap-14 lg:gap-16">
        <header className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center sm:gap-4">
          <span className="font-spectral text-sm font-semibold text-zest sm:text-base">
            Como funciona
          </span>

          <h2 className="text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            <span className="text-zest">Cozinhe </span>
            sem complicação
          </h2>

          <p className="font-spectral text-sm leading-relaxed sm:text-base lg:text-lg">
            Três passos simples entre você e um prato memorável
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {stepsData.map((item) => (
            <StepCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              linkText={item.linkText}
              linkTo={item.linkTo}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}