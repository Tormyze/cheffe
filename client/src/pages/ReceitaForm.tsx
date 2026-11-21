import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type FormEvent,
  type InvalidEvent,
} from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ChevronDown,
  ImagePlus,
  LoaderCircle,
  RefreshCw,
  Trash2,
  UploadCloud,
} from "lucide-react";
import {
  createRecipe,
  getRecipeById,
  updateRecipe,
  uploadRecipeImage,
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
  const [imagePreview, setImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(isEditing);
  const recipeImageInputRef = useRef<HTMLInputElement>(null);

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

  const handleRecipeImage = async (file: File | undefined) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setSubmitError("Selecione uma imagem JPEG, PNG ou WebP.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSubmitError("A imagem deve ter no máximo 5 MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setImageError(false);
    setSubmitError("");

    try {
      setIsUploadingImage(true);
      const uploadedImage = await uploadRecipeImage(file);
      setImgUrl(uploadedImage.url);
      setImagePreview("");
    } catch (error) {
      console.error("Erro ao enviar imagem da receita:", error);
      setImagePreview("");
      setImageError(true);
      setSubmitError("Não foi possível enviar a imagem. Tente novamente.");
    } finally {
      URL.revokeObjectURL(previewUrl);
      setIsUploadingImage(false);
    }
  };

  const handleRecipeImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    void handleRecipeImage(file);
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

    if (!imgUrl) {
      setSubmitError("Selecione uma imagem para criar a receita.");
      return;
    }

    if (isUploadingImage) {
      setSubmitError("Aguarde o upload da imagem terminar.");
      return;
    }

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
                <input
                  ref={recipeImageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleRecipeImageChange}
                  className="hidden"
                />

                {!imgUrl && !imagePreview ? (
                  <div
                    onDragEnter={(event) => {
                      event.preventDefault();
                      setIsDragActive(true);
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDragLeave={(event) => {
                      event.preventDefault();
                      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                        setIsDragActive(false);
                      }
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      setIsDragActive(false);
                      void handleRecipeImage(event.dataTransfer.files?.[0]);
                    }}
                    className={`mt-2 flex h-44 flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 text-center transition-colors ${
                      isDragActive
                        ? "border-zest bg-orange-50"
                        : "border-orange-300 bg-orange-50/20"
                    }`}
                  >
                    {isUploadingImage ? (
                      <>
                        <LoaderCircle className="h-8 w-8 animate-spin text-zest" />
                        <span className="mt-3 font-spectral text-sm text-stone-600">
                          Otimizando imagem...
                        </span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-8 w-8 text-zest" aria-hidden="true" />
                        <p className="mt-3 font-spectral text-sm text-stone-700">
                          Arraste sua foto para cá
                        </p>
                        <button
                          type="button"
                          onClick={() => recipeImageInputRef.current?.click()}
                          className="mt-3 rounded-xl border border-zest px-5 py-2.5 font-spectral text-sm text-zest transition-colors hover:bg-orange-50"
                        >
                          Escolher foto
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative mt-2 aspect-square w-full overflow-hidden rounded-2xl bg-stone-100 shadow-sm">
                    {imagePreview || (imgUrl && !imageError) ? (
                      <img
                        src={imagePreview || imgUrl}
                        alt="Prévia da receita"
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-stone-400">
                        <ImagePlus className="h-8 w-8" aria-hidden="true" />
                      </div>
                    )}

                    {isUploadingImage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-spectral text-sm text-stone-700 shadow-md">
                          <LoaderCircle className="h-4 w-4 animate-spin text-zest" />
                          Otimizando imagem...
                        </div>
                      </div>
                    )}

                    {!isUploadingImage && (
                      <button
                        type="button"
                        onClick={() => recipeImageInputRef.current?.click()}
                        className="absolute right-3 top-3 flex items-center gap-2 rounded-xl border border-zest bg-white px-3 py-2 font-spectral text-xs text-zest shadow-md transition-colors hover:bg-orange-50 hover:cursor-pointer"
                      >
                        <RefreshCw className="h-4 w-4" aria-hidden="true" />
                        Trocar foto
                      </button>
                    )}
                  </div>
                )}

                <p className="mt-1 font-spectral text-xs font-normal text-stone-500">
                  Escolha uma foto do seu dispositivo. JPEG, PNG ou WebP, até 5 MB.
                </p>
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
