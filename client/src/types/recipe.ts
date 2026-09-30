export interface Recipe {
  id: string;
  title: string;
  imgUrl: string;
  category: Category;
  prepTime: number;
  ingredients: Ingredient[];
  steps: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount?: number;       // apenas o número, ex: 1, 25, 8
  unit?: string;         // "l", "g", "colher de sopa"
  description?: string;  // "1 lata de leite condensado (395g)"
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
