import Container from "../../../layout/Container";
import Button from "../../../components/Button";
import RecipeCard from "../../../components/RecipeCard";
import { mockRecipes } from "../../../mocks/recipesMock";

export default function Featured() {
  return (
    <section className="text-black">
      <Container className="py-6 space-y-6">
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-medium">Destaques</h3>
            <h1 className="text-4xl font-medium">Receitas</h1>
            <p className="text-sm text-black-60">
              Pratos que escolhemos a dedo para você começar hoje
            </p>
          </div>
          <div>
            <Button className="text-xs border-2 border-black-20">
              Ver todas
            </Button>
          </div>
        </article>

        <article className="grid grid-cols-1 gap-4">
          {mockRecipes.slice(0, 9).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </article>
      </Container>
    </section>
  );
}
