import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { ChevronRight } from "lucide-react";
import api from "../services/api";
import type { Category, Recipe } from "../types/recipe";

interface CategoryCardProps {
  category: Category;
  description: string;
  isLarge?: boolean;
}

export default function CategoryCard({
  category,
  description,
  isLarge = false,
}: CategoryCardProps) {
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryRecipes() {
      try {
        setLoading(true);
        const response = await api.get<Recipe[]>("/recipes");
        
        // Filtra localmente apenas as receitas pertencentes a esta categoria
        const filtered = response.data.filter(
          (r) => r.category.toLowerCase() === category.toLowerCase()
        );
        setCategoryRecipes(filtered);
      } catch (error) {
        console.error(`Erro ao carregar receitas para ${category}:`, error);
      } finally {
        setLoading(false);
      }
    }

    loadCategoryRecipes();
  }, [category]);

  const coverImage =
    categoryRecipes[0]?.imgUrl || "https://placehold.co/400x300";

  // pega até 3 receitas como tags
  const tags = categoryRecipes.slice(0, 3);

  // redireciona para as receitas com a categoria já filtrada
  const targetUrl = `/receitas?categoria=${encodeURIComponent(category)}`;

  return (
    <article className="flex flex-col w-full overflow-hidden rounded-2xl bg-white text-black">
      {loading ? (
        <div
          className={`w-full bg-gray-200 animate-pulse h-44 ${
            isLarge ? "md:h-96" : "md:h-56"
          }`}
        />
      ) : (
        <img
          src={coverImage}
          alt={category}
          className={`w-full object-cover h-44 ${
            isLarge ? "md:h-96" : "md:h-56"
          }`}
        />
      )}

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

          {!loading && tags.length > 0 && (
            <ul className="flex flex-wrap gap-1 sm:gap-2">
              {tags.map((recipe) => (
                <li key={recipe.id}>
                  <Link
                    to={`/receitas/${recipe.id}`}
                    className="inline-block text-black text-xs px-2.5 py-1 font-semibold rounded-md border border-black/20 hover:border-black hover:bg-black/5 transition-colors sm:px-3 sm:py-1 sm:text-sm"
                  >
                    {recipe.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <NavLink
          to={targetUrl}
          className="inline-flex items-center gap-1 font-spectral text-xs font-medium hover:underline sm:text-base"
        >
          <span>Ver receitas</span>
          <ChevronRight className="w-3 sm:w-4" />
        </NavLink>
      </div>
    </article>
  );
}