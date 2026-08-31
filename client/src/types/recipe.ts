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

export type Category = 
  | 'Almoço'
  | 'Jantar'
  | 'Café da manhã'
  | 'Doces'
  | 'Lanches'
  | 'Massas'
  | 'Vegetariano'
  | 'Bebidas'
  | 'Sobremesas';
