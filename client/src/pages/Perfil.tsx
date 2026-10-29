import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Heart, ChefHat, Plus, Edit2, Pencil, Trash2 } from "lucide-react";
import Container from "../layout/Container";
import RecipeCard from "../components/RecipeCard";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { getRecipes } from "../services/recipeService";
import type { Recipe } from "../types/recipe";

export const Perfil: React.FC = () => {
  const { user } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        setLoading(true);
        const allRecipes = await getRecipes();

        // para apresentação inicial no perfil:
        setFavoriteRecipes(allRecipes.slice(0, 3));
        setMyRecipes(allRecipes.slice(0, 3));
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 text-black">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          
          {/* Card de Informações do Usuário (Sidebar no Desktop) */}
          <aside className="w-full lg:w-80 shrink-0 bg-white p-6 rounded-2xl border border-black/10 flex flex-col items-center gap-6 text-center shadow-xs">
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-zest/30 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=300"
                  alt={user?.name || "Foto de perfil"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col items-center gap-1 w-full">
                <h1 className="font-aleo text-2xl sm:text-3xl font-medium text-zest">
                  {user?.name || "Usuário Cheffe"}
                </h1>
                <span className="font-spectral text-sm text-gray-500">
                  @{user?.name?.toLowerCase().replace(/\s+/g, "") || "cheffe_user"}
                </span>
              </div>
            </div>

            <p className="font-spectral text-sm text-gray-700 leading-relaxed">
              Paixão por gastronomia. Testando e criando novas receitas!
            </p>

            <button
              type="button"
              onClick={() => alert("Edição de perfil em breve!")}
              className="w-full py-2.5 px-4 rounded-xl border border-zest text-zest font-spectral font-medium text-sm flex items-center justify-center gap-2 hover:bg-zest/5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-4 h-4 stroke-2" />
              <span>Editar perfil</span>
            </button>
          </aside>

          {/* Centro: Receitas Favoritas + Minhas Receitas */}
          <main className="flex-1 w-full flex flex-col gap-10 sm:gap-12">
            
            {/* Receitas Favoritas */}
            <section className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 text-zest">
                  <Heart className="w-6 h-6 fill-zest stroke-zest" />
                  <h2 className="font-aleo text-2xl sm:text-3xl font-medium">
                    Receitas Favoritas
                  </h2>
                </div>
                <p className="font-spectral text-sm text-gray-600">
                  Sua coleção de pratos salvos para cozinhar mais tarde.
                </p>
              </div>

              {loading ? (
                <div className="py-8 font-spectral text-gray-500">Carregando favoritos...</div>
              ) : favoriteRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {favoriteRecipes.map((recipe) => (
                    <RecipeCard key={`fav-${recipe.id}`} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 font-spectral text-gray-500">
                  Você ainda não favoritou nenhuma receita.
                </div>
              )}
            </section>

            {/* Minhas Receitas */}
            <section className="flex flex-col gap-6 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-zest">
                  <ChefHat className="w-6 h-6 stroke-2" />
                  <div className="flex items-center gap-2">
                    <h2 className="font-aleo text-2xl sm:text-3xl font-medium">
                      Minhas Receitas
                    </h2>
                    <span className="font-aleo text-2xl font-medium text-gray-400">
                      ({myRecipes.length})
                    </span>
                  </div>
                </div>

                <Link to="/criar">
                  <Button className="w-full sm:w-auto px-5 py-2.5 bg-zest hover:bg-zest-dark text-white font-spectral font-medium rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer">
                    <Plus className="w-5 h-5" />
                    <span>Nova Receita</span>
                  </Button>
                </Link>
              </div>

              {loading ? (
                <div className="py-8 font-spectral text-gray-500">Carregando suas receitas...</div>
              ) : myRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {myRecipes.map((recipe) => (
                    <div key={`my-${recipe.id}`} className="relative group">
                      <RecipeCard recipe={recipe} />
                      
                      {/* Ações de Edição/Exclusão para receitas do próprio usuário */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs p-1.5 rounded-xl shadow-xs border border-black/10">
                        <button
                          type="button"
                          title="Editar receita"
                          onClick={() => alert(`Editar receita ${recipe.id}`)}
                          className="p-1.5 text-gray-700 hover:text-zest hover:bg-zest/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          title="Excluir receita"
                          onClick={() => alert(`Excluir receita ${recipe.id}`)}
                          className="p-1.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 font-spectral text-gray-500">
                  Você ainda não criou nenhuma receita.
                </div>
              )}
            </section>

          </main>
        </div>
      </Container>
    </section>
  );
};

export default Perfil;