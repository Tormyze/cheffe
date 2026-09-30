import { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router";
import Container from "../layout/Container";
import RecipeCard from "../components/RecipeCard";
import { Search } from "lucide-react";
import { mockRecipes } from "../mocks/recipesMock";
import { CATEGORIES } from "../types/recipe";

export default function Receitas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState("");

  // categoria passada na URL (se houver)
  const selectedCategory = searchParams.get("categoria");

  // foca o mouse na barra de pesquisa se a rota for acessada com o estado autoFocusSearch
  useEffect(() => {
    if (location.state?.autoFocusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [location.state]);

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? recipe.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    const isCurrentlySelected =
      selectedCategory?.toLowerCase() === category.toLowerCase();
      
    if (isCurrentlySelected) {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: category });
    }
  };

  return (
    <main className="py-6 sm:py-16 text-black">
      <Container className="space-y-6 sm:space-y-12">
        <header className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-aleo text-4xl font-medium sm:text-5xl">
              Todas as receitas
            </h1>
            <p className="font-spectral text-sm text-black-60 sm:text-lg">
              Encontre a refeição para o momento
            </p>
          </div>

          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-black-60" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-black-20 bg-transparent py-3 pl-11 pr-4 font-spectral text-base text-black placeholder:text-black/60 focus:border-black focus:outline-none"
            />
          </div>

          <div className="-mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
            {CATEGORIES.map((category) => {
              const isSelected =
                selectedCategory?.toLowerCase() === category.toLowerCase();
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`shrink-0 rounded-md border border-black/20 px-3 py-1.5 font-spectral text-sm font-semibold hover:cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-black text-white"
                      : "bg-transparent text-black hover:bg-black/5"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </header>

        {/* Receitas */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                className="hover:cursor-pointer"
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center font-spectral text-black/60">
            Nenhuma receita encontrada para os filtros selecionados.
          </div>
        )}
      </Container>
    </main>
  );
}