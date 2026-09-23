import Container from "../../../layout/Container";
import Button from "../../../components/Button";
import RecipeCard from "../../../components/RecipeCard";
import { mockRecipes } from "../../../mocks/recipesMock";

export default function Featured() {
  return (
    <section id="featured" className="text-black py-6 sm:py-20 lg:py-28">
      <Container className="space-y-6 sm:space-y-12">
        <article className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-medium">Destaques</h3>
            <h1 className="text-4xl font-medium sm:text-5xl">Receitas</h1>
            <p className="text-sm text-black-60 sm:text-base">
              Pratos que escolhemos a dedo para você começar hoje
            </p>
          </div>
          <div>
            <Button className="text-xs border border-black-20 hover:cursor-pointer hover:opacity-90 sm:text-sm">
              Ver todas
            </Button>
          </div>
        </article>
        <article className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {mockRecipes.slice(0, 8).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} className="hover:cursor-pointer" />
          ))}
        </article>
      </Container>
    </section>
  );
}