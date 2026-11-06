import { Link } from "react-router";
import { Heart } from "lucide-react";
import type { Recipe } from "../types/recipe";
import { useFavorites } from "../hooks/useFavorites";

export default function RecipeCard({
  recipe,
  className,
}: {
  recipe: Recipe;
  className?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite ? isFavorite(recipe.id) : false;

  const prepTimeLabel =
    recipe.prepTime >= 60
      ? `${Math.floor(recipe.prepTime / 60)}h`
      : `${recipe.prepTime}min`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(recipe.id);
    }
  };

  return (
    <Link
      to={`/receitas/${recipe.id}`}
      className={`group block transition-opacity hover:opacity-95 ${className || ""}`}
    >
      <article className="flex items-center gap-3 font-spectral sm:flex-col sm:items-start sm:gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-52 sm:w-full lg:h-56">
          <img
            src={recipe.imgUrl}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <button
            type="button"
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-transform hover:scale-110 hover:cursor-pointer active:scale-95 shadow-sm outline-none"
            aria-label={
              fav ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
          >
            <Heart
              className={`h-4 w-4 transition-colors sm:h-5 sm:w-5 ${
                fav ? "fill-zest text-zest" : "text-black hover:text-zest"
              }`}
            />
          </button>
        </div>

        <div className="flex w-full flex-1 flex-col gap-1">
          <div>
            <h3 className="text-base font-semibold leading-tight text-black transition-colors group-hover:text-zest sm:text-lg">
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
