import { mockRecipes } from "../mocks/recipesMock";
import type { Category } from "../types/recipe";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router";

interface CategoryCardProps {
  category: Category;
  description: string;
  isLarge?: boolean;
  linkTo: string;
}

export default function CategoryCard({
  category,
  description,
  isLarge = false,
  linkTo
}: CategoryCardProps) {
  const categoryRecipes = mockRecipes.filter((r) => r.category === category); // pega as receitas somente dessa categoria

  const coverImage =
    categoryRecipes[0]?.imgUrl || "https://placehold.co/400x300"; // pega a imagem da primeira receita que aparecer

  const tags = categoryRecipes.slice(0, 3).map((r) => r.title); // pega até 3 títulos de receitas pra usar como tags

  return (
    <article className="flex flex-col w-full overflow-hidden rounded-2xl bg-white text-black">
      <img
        src={coverImage}
        alt={category}
        className={`w-full object-cover h-44 ${
          isLarge ? "md:h-96" : "md:h-56"
        }`}
      />

      <div className="flex flex-1 flex-col justify-between gap-3 p-3.5 sm:gap-6 sm:p-6">
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="flex flex-col gap-1 sm:gap-2">
            <h3 className="font-aleo text-lg font-medium leading-tight sm:text-3xl sm:leading-10">
              {category}
            </h3>
            <p className="font-spectral text-xs font-normal leading-relaxed text-black sm:text-base sm:leading-6">
              {description}
            </p>
          </div>

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-1 sm:gap-2">
              {tags.map((title) => (
                <li
                  key={title}
                  className="text-black text-[10px]  px-2 py-0.5 font-semibold leading-4 rounded-md outline-1 sm:px-2.5 sm:py-1 sm:text-sm sm:leading-5"
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <NavLink
          to={linkTo}
          className="inline-flex items-center gap-1 font-spectral text-xs font-medium sm:text-base"
        >
          <span>Ver receitas</span>
          <ChevronRight className="w-3 sm:w-4" />
        </NavLink>
      </div>
    </article>
  );
}
