import { useState } from "react";
import { useParams, Link } from "react-router";
import { Check, Square } from "lucide-react";
import Container from "../layout/Container";
import { mockRecipes } from "../mocks/recipesMock";

export default function DetalhesReceita() {
  const { id } = useParams<{ id: string }>();
  const recipe = mockRecipes.find((item) => item.id === id);

  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  if (!recipe) {
    return (
      <div className="flex flex-col justify-center items-center py-20 text-center text-black">
        <Container className="space-y-4 lg:space-y-6">
          <h1 className="font-aleo text-3xl font-medium sm:text-4xl lg:text-5xl">
            Receita não encontrada!
          </h1>
          <Link
            to="/receitas"
            className="inline-block font-aleo text-black/60 underline hover:text-black"
          >
            Voltar para todas as receitas
          </Link>
        </Container>
      </div>
    );
  }

  const toggleIngredient = (ingredientId: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((item) => item !== ingredientId)
        : [...prev, ingredientId],
    );
  };

  const toggleStep = (stepIndex: number) => {
    setCheckedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((item) => item !== stepIndex)
        : [...prev, stepIndex],
    );
  };

  return (
    <main className="py-6 sm:py-8 text-black">
      <Container className="space-y-2 sm:space-y-3">
        {/* Breadcrumbs */}
        <nav className="font-aleo text-lg font-normal text-black sm:text-xl">
          <Link to="/receitas" className="hover:underline">
            Todas as receitas
          </Link>{" "}
          &gt; <span>{recipe.category}</span> &gt;{" "}
          <span className="font-bold text-black">{recipe.title}</span>
        </nav>

        {/* Imagem + Ingredientes */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-start pt-2">
          <div className="w-full overflow-hidden rounded-2xl shadow-sm">
            <img
              src={recipe.imgUrl}
              alt={recipe.title}
              className="aspect-square w-full object-cover"
            />
          </div>

          {/* Ingredientes */}
          <div className="flex flex-col gap-6">
            <h2 className="border-b-2 border-zest pb-2 font-aleo text-3xl font-medium text-zest sm:text-4xl lg:text-5xl">
              Ingredientes
            </h2>

            <ul className="space-y-4">
              {recipe.ingredients.map((ingredient) => {
                const isChecked = checkedIngredients.includes(ingredient.id);

                const label =
                  ingredient.description ||
                  `${ingredient.amount ? `${ingredient.amount} ` : ""}${
                    ingredient.unit ? `${ingredient.unit} de ` : ""
                  }${ingredient.name}`;

                return (
                  <li key={ingredient.id}>
                    <button
                      type="button"
                      onClick={() => toggleIngredient(ingredient.id)}
                      className="flex items-start gap-4 text-left w-full transition-opacity hover:opacity-80 hover:cursor-pointer"
                    >
                      {isChecked ? (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border-2 border-green-600 bg-green-600 text-white mt-0.5">
                          <Check className="h-5 w-5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border-2 border-zest text-zest mt-0.5">
                          <Square className="h-5 w-5 fill-transparent" />
                        </div>
                      )}
                      <span
                        className={`font-aleo text-lg font-medium sm:text-xl ${
                          isChecked
                            ? "line-through text-black/60"
                            : "text-black"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Seção Inferior: Modo de Preparo */}
        <section className="flex flex-col gap-8 pt-6">
          <div className="border-b-2 border-zest pb-2 flex items-baseline justify-between">
            <h2 className="font-aleo text-3xl font-medium text-zest sm:text-4xl lg:text-5xl">
              Modo de Preparo
            </h2>
            <span className="font-aleo text-xl font-medium text-black/60 sm:text-2xl lg:text-3xl">
              ~{recipe.prepTime}min
            </span>
          </div>

          <ol className="space-y-6">
            {recipe.steps.map((step, index) => {
              const isChecked = checkedSteps.includes(index);

              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => toggleStep(index)}
                    className="flex items-start gap-4 sm:gap-6 text-left w-full transition-opacity hover:opacity-80 hover:cursor-pointer"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-aleo text-xl font-medium transition-colors sm:h-12 sm:w-12 sm:text-2xl ${
                        isChecked
                          ? "bg-green-600 text-white"
                          : "bg-zest text-white"
                      }`}
                    >
                      {isChecked ? (
                        <Check className="h-6 w-6 stroke-[2.5]" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <p
                      className={`pt-1 font-aleo text-lg font-medium leading-relaxed sm:text-2xl ${
                        isChecked ? "line-through text-black/60" : "text-black"
                      }`}
                    >
                      {step}
                    </p>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      </Container>
    </main>
  );
}
