import type { Recipe } from "../types/recipe";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const prepTimeLabel =
    recipe.prepTime > 60 ? `${recipe.prepTime / 60} h` : `${recipe.prepTime} min`;

  return (
    <article className="flex items-center gap-3 font-['Spectral'] text-Color-Scheme-5-Text">
      <img
        src={recipe.imgUrl}
        alt={recipe.title}
        className="h-24 w-24 shrink-0 rounded-2xl object-cover"
      />
      <div className="flex flex-1 flex-col gap-1">
        <div>
          <h3 className="text-base font-semibold leading-tight sm:text-lg">
            {recipe.title}
          </h3>
          <p className="text-xs font-normal opacity-80 sm:text-sm">
            {recipe.category}
          </p>
        </div>

        <span className="text-base font-semibold sm:text-lg">
          {prepTimeLabel}
        </span>
      </div>
    </article>
  );
}
