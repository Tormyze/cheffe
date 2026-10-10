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
  amount?: number; 
  unit?: string;
  description?: string;
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

export type Category = (typeof CATEGORIES)[number];
