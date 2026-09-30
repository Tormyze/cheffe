import { Link } from "react-router";
import type { Recipe } from "../types/recipe";

export default function RecipeCard({
  recipe,
  className,
}: {
  recipe: Recipe;
  className?: string;
}) {
  const prepTimeLabel =
    recipe.prepTime >= 60
      ? `${recipe.prepTime / 60}h`
      : `${recipe.prepTime}min`;

  return (
    <Link
      to={`/receitas/${recipe.id}`}
      className={`group block transition-opacity hover:opacity-95 ${className || ""}`}
    >
      <article className="flex items-center gap-3 font-spectral sm:flex-col sm:items-start sm:gap-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-52 sm:w-full lg:h-56">
          <img
            src={recipe.imgUrl}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex w-full flex-1 flex-col gap-1">
          <div>
            <h3 className="text-base font-semibold leading-tight text-black transition-colors group-hover:text-[#E06518] sm:text-lg">
              {recipe.title}
            </h3>
            <p className="text-xs font-normal text-black/70 sm:text-sm">
              {recipe.category}
            </p>
          </div>

          <span className="font-aleo text-sm font-semibold text-black sm:text-base">
            {prepTimeLabel}
          </span>
        </div>
      </article>
    </Link>
  );
}