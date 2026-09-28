export interface Recipe {
  id: string;
  title: string;
  imgUrl: string;
  category: Category;
  prepTime: number;
  ingredients: Ingredient[];
  instructions: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string; // e.g., "1 cup", "2 tbsp", etc.
}

export const CATEGORIES = [
  "Café da manhã",
  "Almoço",
  "Jantar",
  "Lanches",
  "Doces",
  "Sobremesas",
  "Vegetariano",
  "Massas",
  "Bebidas",
] as const;

// types gerados automaticamente a partir do array acima
export type Category = (typeof CATEGORIES)[number];
