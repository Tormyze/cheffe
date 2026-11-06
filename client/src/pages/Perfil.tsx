import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Heart,
  ChefHat,
  Plus,
  Edit2,
  Pencil,
  Trash2,
  LogOut,
} from "lucide-react";
import Container from "../layout/Container";
import RecipeCard from "../components/RecipeCard";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useFavorites } from "../hooks/useFavorites";
import { deleteRecipe, getRecipes } from "../services/recipeService";
import type { Recipe } from "../types/recipe";

export const Perfil: React.FC = () => {
  const { user, signOut } = useAuth();
  const { favoriteRecipes, loadingFavorites } = useFavorites();
  const navigate = useNavigate();
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [recipeActionError, setRecipeActionError] = useState("");
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
  const [isDeletingRecipe, setIsDeletingRecipe] = useState(false);

  useEffect(() => {
    async function loadProfileData() {
      try {
        setLoading(true);
        const allRecipes = await getRecipes();

        // para apresentação inicial das minhas receitas:
        setMyRecipes(allRecipes.slice(0, 3));
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const handleDeleteRecipe = (recipe: Recipe) => {
    setRecipeActionError("");
    setRecipeToDelete(recipe);
  };

  const confirmDeleteRecipe = async () => {
    if (!recipeToDelete) return;

    try {
      setRecipeActionError("");
      setIsDeletingRecipe(true);
      await deleteRecipe(recipeToDelete.id);
      setMyRecipes((current) =>
        current.filter(
          (currentRecipe) => currentRecipe.id !== recipeToDelete.id,
        ),
      );
      setRecipeToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir receita:", error);
      setRecipeActionError("Não foi possível excluir a receita. Tente novamente.");
    } finally {
      setIsDeletingRecipe(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 text-black">
      <Container>
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Card de Informações do Usuário (Sidebar no Desktop) */}
          <aside className="w-full lg:w-80 shrink-0 bg-white p-6 rounded-2xl border border-black/10 flex flex-col items-center gap-6 text-center shadow-xs">
            <article className="flex flex-col items-center gap-4 w-full">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-zest/30 shadow-inner">
                <div
                  role="img"
                  aria-label={user?.name || "Foto de perfil"}
                  className="flex h-full w-full items-center justify-center bg-orange-50 text-zest"
                >
                  <ChefHat
                    className="h-16 w-16 stroke-[1.5] sm:h-20 sm:w-20"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-1 w-full">
                <h1 className="font-aleo text-2xl sm:text-3xl font-medium text-zest">
                  {user?.name || "Novo Cheffe"}
                </h1>
                <span className="font-spectral text-sm text-gray-500">
                  @
                  {user?.name?.toLowerCase().replace(/\s+/g, "") ||
                    "cheffe_user"}
                </span>
              </div>
            </article>

            <p className="font-spectral text-sm text-gray-700 leading-relaxed">
              Testando e criando novas receitas!
            </p>

            {/* Grupo de Ações do Usuário */}
            <div className="flex flex-col gap-3 w-full">
              <button
                type="button"
                onClick={() => alert("Edição de perfil em breve!")}
                className="w-full py-2.5 px-4 rounded-xl border border-zest text-zest font-spectral font-medium text-sm flex items-center justify-center gap-2 hover:bg-zest/5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-4 h-4 stroke-2" />
                <span>Editar perfil</span>
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-2.5 px-4 rounded-xl border border-red-500 text-red-600 font-spectral font-medium text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 stroke-2" />
                <span>Sair da conta</span>
              </button>
            </div>
          </aside>

          {/* Centro: Receitas Favoritas + Minhas Receitas */}
          <main className="flex-1 w-full flex flex-col gap-10 sm:gap-12">
            {/* Receitas Favoritas */}
            <section className="flex flex-col gap-6 w-full">
              {recipeActionError && (
                <p className="font-spectral text-sm text-red-600">
                  {recipeActionError}
                </p>
              )}
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

              {loadingFavorites ? (
                <div className="py-8 font-spectral text-gray-500">
                  Carregando favoritos...
                </div>
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
                <div className="py-8 font-spectral text-gray-500">
                  Carregando suas receitas...
                </div>
              ) : myRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {myRecipes.map((recipe) => (
                    <div key={`my-${recipe.id}`} className="relative group">
                      <RecipeCard recipe={recipe} />

                      {/* Ações de Edição/Exclusão para receitas do próprio usuário */}
                      <div className="absolute top-2 right-2 sm:top-auto sm:right-3 sm:bottom-23 flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-xl shadow-xs border border-black/10">
                        <button
                          type="button"
                          title="Editar receita"
                          onClick={() => navigate(`/editar/${recipe.id}`)}
                          className="shrink-0 p-1.5 text-gray-700 hover:text-zest hover:bg-zest/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          title="Excluir receita"
                          onClick={() => handleDeleteRecipe(recipe)}
                          className="shrink-0 p-1.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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

      {recipeToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-[2px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isDeletingRecipe) {
              setRecipeToDelete(null);
            }
          }}
        >
          <div
            aria-describedby="delete-recipe-description"
            aria-labelledby="delete-recipe-title"
            aria-modal="true"
            className="flex w-full max-w-105 flex-col items-center gap-4 overflow-hidden rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.16)]"
            role="dialog"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-red-50 text-red-600">
              <Trash2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2
              id="delete-recipe-title"
              className="font-aleo text-center text-xl font-medium leading-7 text-stone-800"
            >
              Excluir Receita?
            </h2>
            <p
              id="delete-recipe-description"
              className="text-center font-spectral text-sm leading-5.5 text-gray-600"
            >
              Tem certeza que deseja excluir a receita{" "}
              <strong className="font-bold">
                &apos;{recipeToDelete.title}&apos;
              </strong>
              ? Esta ação não poderá ser desfeita.
            </p>
            <div className="flex w-full gap-3">
              <button
                type="button"
                onClick={() => setRecipeToDelete(null)}
                disabled={isDeletingRecipe}
                className="h-11 flex-1 rounded-xl border border-gray-300 px-6 py-2.5 font-spectral text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDeleteRecipe}
                disabled={isDeletingRecipe}
                className="h-11 flex-1 rounded-xl border border-zest bg-red-600 px-6 py-2.5 font-spectral text-sm text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeletingRecipe ? "Excluindo..." : "Sim, Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Perfil;
