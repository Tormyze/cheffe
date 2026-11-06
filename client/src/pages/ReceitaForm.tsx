import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type InvalidEvent,
} from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ChevronDown, Image as ImageIcon, Trash2 } from "lucide-react";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
} from "../services/recipeService";
import { CATEGORIES, type Category } from "../types/recipe";

interface IngredientForm {
  name: string;
  quantity: string;
  unit: string;
}

const emptyIngredient = (): IngredientForm => ({
  name: "",
  quantity: "",
  unit: "",
});

const requiredFieldMessage =
  "Este campo é obrigatório para criar a receita.";

export default function ReceitaForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Doces");
  const [prepTime, setPrepTime] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [ingredients, setIngredients] = useState<IngredientForm[]>([
    { name: "Farinha de trigo", quantity: "2", unit: "xícaras" },
    { name: "Açúcar", quantity: "1", unit: "xícara" },
  ]);
  const [steps, setSteps] = useState<string[]>([
    "Em uma tigela grande, misture os ingredientes secos até que fiquem bem incorporados.",
    "Adicione os ingredientes líquidos aos poucos e misture até obter uma massa homogênea.",
  ]);
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(isEditing);

  useEffect(() => {
    if (!id) return;

    const loadRecipe = async () => {
      try {
        const recipe = await getRecipeById(id);
        setTitle(recipe.title);
        setCategory(recipe.category);
        setPrepTime(String(recipe.prepTime));
        setImgUrl(recipe.imgUrl);
        setIngredients(
          recipe.ingredients.map((ingredient) => ({
            name: ingredient.name,
            quantity:
              ingredient.amount === undefined ? "" : String(ingredient.amount),
            unit: ingredient.unit || "",
          })),
        );
        setSteps(recipe.steps);
      } catch (error) {
        console.error("Erro ao carregar receita para edição:", error);
        setSubmitError("Não foi possível carregar a receita.");
      } finally {
        setIsLoadingRecipe(false);
      }
    };

    loadRecipe();
  }, [id]);

  const handleRequiredInvalid = (
    event: InvalidEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    if (event.currentTarget.validity.valueMissing) {
      event.currentTarget.setCustomValidity(requiredFieldMessage);
    }
  };

  const clearRequiredInvalid = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    event.currentTarget.setCustomValidity("");
  };

  const addIngredient = () => {
    setIngredients((current) => [...current, emptyIngredient()]);
  };

  const removeIngredient = (index: number) => {
    setIngredients((current) =>
      current.filter((_, ingredientIndex) => ingredientIndex !== index),
    );
  };

  const updateIngredient = (
    index: number,
    field: keyof IngredientForm,
    value: string,
  ) => {
    setIngredients((current) =>
      current.map((ingredient, ingredientIndex) =>
        ingredientIndex === index
          ? { ...ingredient, [field]: value }
          : ingredient,
      ),
    );
  };

  const addStep = () => {
    setSteps((current) => [...current, ""]);
  };

  const removeStep = (index: number) => {
    setSteps((current) =>
      current.filter((_, stepIndex) => stepIndex !== index),
    );
  };

  const updateStep = (index: number, value: string) => {
    setSteps((current) =>
      current.map((step, stepIndex) => (stepIndex === index ? value : step)),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const recipeData = {
        title,
        category,
        prepTime: Number(prepTime),
        imgUrl,
        ingredients: ingredients.map(({ name, quantity, unit }) => ({
          name,
          amount: quantity ? Number(quantity) : undefined,
          unit,
        })),
        steps,
      };

      if (id) {
        await updateRecipe(id, recipeData);
      } else {
        await createRecipe(recipeData);
      }
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
      setSubmitError("Não foi possível salvar a receita. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingRecipe) {
    return (
      <div className="py-20 text-center font-spectral text-stone-500">
        Carregando receita...
      </div>
    );
  }

  return (
    <section className="bg-white py-8 text-stone-800 sm:py-12">
      <div className="mx-auto w-full max-w-200 px-4 sm:px-6">
        <Link
          to="/perfil"
          className="font-spectral text-xs text-stone-500 transition-colors hover:text-zest"
        >
          ← Voltar ao Perfil
        </Link>

        <header className="mt-8">
          <h1 className="font-aleo text-3xl font-medium">
            {isEditing ? "Editar Receita" : "Criar Nova Receita"}
          </h1>
          <p className="mt-2 font-spectral text-sm text-stone-500">
            Compartilhe suas melhores criações culinárias com a comunidade do
            Cheffe.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs sm:p-6">
            <h2 className="font-aleo text-xl">Informações Básicas</h2>
            <div className="mt-5 space-y-4">
              <label className="block font-spectral text-xs font-medium">
                Título da Receita
                <input
                  required
                  value={title}
                  onInvalid={handleRequiredInvalid}
                  onChange={(event) => {
                    clearRequiredInvalid(event);
                    setTitle(event.target.value);
                  }}
                  placeholder="Ex: Bolo de Cenoura com Cobertura de Chocolate"
                  className="mt-2 w-full rounded-xl border border-stone-300 px-3 py-2.5 font-spectral text-sm outline-none transition focus:border-zest focus:ring-1 focus:ring-zest"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block font-spectral text-xs font-medium">
                  Categoria
                  <span className="relative mt-2 block">
                    <select
                      value={category}
                      onChange={(event) =>
                        setCategory(event.target.value as Category)
                      }
                      className="w-full appearance-none rounded-xl border border-stone-300 bg-white px-3 py-2.5 font-spectral text-sm outline-none focus:border-zest focus:ring-1 focus:ring-zest"
                    >
                      {CATEGORIES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-stone-500" />
                  </span>
                  <p className="mt-1 truncate font-spectral text-[11px] font-normal text-stone-500">
                    {CATEGORIES.slice(0, 6).join(" · ")}
                  </p>
                </label>

                <label className="block font-spectral text-xs font-medium">
                  Tempo de Preparo
                  <span className="mt-2 flex items-center rounded-xl border border-stone-300 focus-within:border-zest focus-within:ring-1 focus-within:ring-zest">
                    <input
                      required
                      min="1"
                      type="number"
                      value={prepTime}
                      onInvalid={handleRequiredInvalid}
                      onChange={(event) => {
                        clearRequiredInvalid(event);
                        setPrepTime(event.target.value);
                      }}
                      className="w-full rounded-xl px-3 py-2.5 font-spectral text-sm outline-none"
                    />
                    <span className="pr-3 font-spectral text-xs text-stone-500">
                      minutos
                    </span>
                  </span>
                </label>
              </div>

              <div className="block font-spectral text-xs font-medium">
                Imagem da Receita
                <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    <input
                      required
                      id="recipe-image-url"
                      type="url"
                      value={imgUrl}
                      onInvalid={handleRequiredInvalid}
                      onChange={(event) => {
                        clearRequiredInvalid(event);
                        setImgUrl(event.target.value);
                        setImageError(false);
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full rounded-xl border border-stone-300 px-3 py-2.5 font-spectral text-sm outline-none transition focus:border-zest focus:ring-1 focus:ring-zest"
                    />
                    <span className="mt-1 block text-xs font-normal text-stone-500">
                      Cole o link de uma foto que dê água na boca.
                    </span>
                  </div>

                  <div className="flex w-24 shrink-0 flex-col items-center gap-1">
                    <div className="h-16 w-24 overflow-hidden rounded-lg bg-stone-100">
                      {imgUrl.trim() && !imageError ? (
                        <img
                          src={imgUrl}
                          alt="Prévia da receita"
                          onError={() => setImageError(true)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          aria-label={
                            imageError
                              ? "A imagem não pôde ser carregada"
                              : "Nenhuma imagem selecionada"
                          }
                          className="flex h-full w-full items-center justify-center text-stone-400"
                        >
                          <ImageIcon className="h-6 w-6" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    <span className="whitespace-nowrap font-spectral text-[11px] font-normal text-stone-500">
                      Prévia da imagem
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs sm:p-6">
            <h2 className="font-aleo text-xl">Ingredientes</h2>
            <p className="mt-1 font-spectral text-xs text-stone-500">
              Adicione os itens e as quantidades necessárias.
            </p>
            <div className="mt-5 space-y-3">
              <div className="hidden grid-cols-[1fr_5rem_7.5rem_1.5rem] gap-3 font-spectral text-xs sm:grid">
                <span>Ingrediente</span>
                <span>Quantidade</span>
                <span>Unidade</span>
              </div>
              {ingredients.map((ingredient, index) => (
                <div
                  key={`ingredient-${index}`}
                  className="grid gap-2 sm:grid-cols-[1fr_5rem_7.5rem_1.5rem] sm:items-center sm:gap-3"
                >
                  <input
                    required
                    aria-label={`Ingrediente ${index + 1}`}
                    value={ingredient.name}
                    onInvalid={handleRequiredInvalid}
                    onChange={(event) => {
                      clearRequiredInvalid(event);
                      updateIngredient(index, "name", event.target.value);
                    }}
                    placeholder="Ingrediente"
                    className="rounded-xl border border-stone-300 px-3 py-2.5 font-spectral text-sm outline-none focus:border-zest focus:ring-1 focus:ring-zest"
                  />
                  <input
                    required
                    aria-label={`Quantidade do ingrediente ${index + 1}`}
                    value={ingredient.quantity}
                    onInvalid={handleRequiredInvalid}
                    onChange={(event) => {
                      clearRequiredInvalid(event);
                      updateIngredient(index, "quantity", event.target.value);
                    }}
                    placeholder="2"
                    className="rounded-xl border border-stone-300 px-3 py-2.5 font-spectral text-sm outline-none focus:border-zest focus:ring-1 focus:ring-zest"
                  />
                  <select
                    required
                    aria-label={`Unidade do ingrediente ${index + 1}`}
                    value={ingredient.unit}
                    onInvalid={handleRequiredInvalid}
                    onChange={(event) => {
                      clearRequiredInvalid(event);
                      updateIngredient(index, "unit", event.target.value);
                    }}
                    className="rounded-xl border border-stone-300 bg-white px-3 py-2.5 font-spectral text-sm outline-none focus:border-zest focus:ring-1 focus:ring-zest"
                  >
                    <option value="">-</option>
                    <option value="unidade(s)">unidade(s)</option>
                    <option value="xícara(s)">xícara(s)</option>
                    <option value="colher(es) de sopa">
                      colher(es) de sopa
                    </option>
                    <option value="colher(es) de chá">colher(es) de chá</option>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                  </select>
                  <button
                    type="button"
                    title="Remover ingrediente"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                    className="justify-self-end p-2 text-stone-500 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30 sm:justify-self-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="w-full rounded-xl border border-dashed border-zest py-2.5 font-spectral text-xs text-zest transition-colors hover:bg-orange-50"
              >
                + Adicionar Ingrediente
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs sm:p-6">
            <h2 className="font-aleo text-xl">Modo de Preparo</h2>
            <p className="mt-1 font-spectral text-xs text-stone-500">
              Descreva o passo a passo de forma clara.
            </p>
            <div className="mt-5 space-y-3">
              {steps.map((step, index) => (
                <div key={`step-${index}`} className="flex items-start gap-2">
                  <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 font-spectral text-xs text-zest">
                    {index + 1}
                  </span>
                  <textarea
                    required
                    value={step}
                    onInvalid={handleRequiredInvalid}
                    onChange={(event) => {
                      clearRequiredInvalid(event);
                      updateStep(index, event.target.value);
                    }}
                    placeholder="Descreva este passo..."
                    className="min-h-16 flex-1 resize-y rounded-xl border border-stone-300 px-3 py-2.5 font-spectral text-sm outline-none focus:border-zest focus:ring-1 focus:ring-zest"
                  />
                  <button
                    type="button"
                    title="Remover passo"
                    onClick={() => removeStep(index)}
                    disabled={steps.length === 1}
                    className="mt-2 p-2 text-stone-500 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addStep}
                className="w-full rounded-xl border border-dashed border-zest py-2.5 font-spectral text-xs text-zest transition-colors hover:bg-orange-50"
              >
                + Adicionar Passo
              </button>
            </div>
          </section>

          <footer className="flex flex-col gap-4 border-t border-stone-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-spectral text-xs">
              <p>{isEditing ? "Salvar alterações?" : "Pronto para compartilhar?"}</p>
              <p className="mt-1 text-stone-500">
                Sua receita ficará visível para toda a comunidade.
              </p>
            </div>
            <div className="flex gap-2 sm:shrink-0">
              <Link
                to="/perfil"
                className="rounded-xl border border-stone-300 px-5 py-2.5 font-spectral text-sm transition-colors hover:bg-stone-50"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-zest px-5 py-2.5 font-spectral text-sm text-white transition-colors hover:bg-zest-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? isEditing
                    ? "Salvando..."
                    : "Criando..."
                  : isEditing
                    ? "Salvar Alterações"
                    : "Criar Receita"}
              </button>
            </div>
          </footer>
          {submitError && (
            <p className="font-spectral text-sm text-red-600">{submitError}</p>
          )}
        </form>
      </div>
    </section>
  );
}
