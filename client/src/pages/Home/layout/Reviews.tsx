import Container from "../../../layout/Container";
import ReviewCard, { type ReviewCardProps } from "../../../components/ReviewCard";

const reviewsData: ReviewCardProps[] = [
  {
    quote:
      "Fiz a moqueca para minha mãe e ela disse que lembrava a da Bahia. Nunca tinha cozinhado peixe antes.",
    author: "Mariana Lopes",
    role: "Cozinheira de primeira viagem",
    avatarUrl: "https://randomuser.me/api/portraits/women/43.jpg",
  },
  {
    quote:
      "O passo a passo do pão de queijo é tão claro que até meu filho de dez anos conseguiu fazer sozinho.",
    author: "Carlos Eduardo",
    role: "Pai e cozinheiro amador",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "Eu achava que feijoada era complicada demais. O Cheffe me provou o contrário. Ficou perfeita.",
    author: "Marcio Felipe",
    role: "Apaixonado por receitas",
    avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

export default function Reviews() {
  return (
    <section className="bg-black py-12 sm:py-20 lg:py-28">
      <Container className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
        <header className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center sm:gap-4">
          <h2 className="font-aleo text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            Quem <span className="text-zest">cozinha</span>
          </h2>
          <p className="font-spectral text-sm leading-relaxed sm:text-base lg:text-lg">
            Histórias de quem aprendeu um prato novo com a gente
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {reviewsData.map((review) => (
            <ReviewCard
              key={review.author}
              quote={review.quote}
              author={review.author}
              role={review.role}
              avatarUrl={review.avatarUrl}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}