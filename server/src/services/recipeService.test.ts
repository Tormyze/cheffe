import { getAllRecipes, getRecipeById } from './recipeService';
import { prisma } from '../database/prisma';

// mock do banco de dados Prisma
jest.mock('../database/prisma', () => ({
  prisma: {
    recipe: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

describe('Recipe Service - Testes Unitários', () => {
  // dados fictícios no formato do banco (que o Prisma retornaria)
  const dbMockRecipes = [
    {
      id: '1',
      title: 'Bolo de Cenoura',
      imgUrl: 'https://example.com/bolo.jpg',
      category: 'Sobremesas',
      prepTime: 45,
      steps: ['Passo 1', 'Passo 2'],
      ingredients: [
        {
          ingredient: { id: 'ing1', name: 'Farinha' },
          amount: 2,
          unit: 'xícaras',
          description: null,
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRecipes()', () => {
    it('deve buscar todas as receitas do banco e formatá-las corretamente', async () => {
      // ensina o Prisma mockado a retornar os dados fictícios
      (prisma.recipe.findMany as jest.Mock).mockResolvedValue(dbMockRecipes);

      const result = await getAllRecipes();

      expect(prisma.recipe.findMany).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Bolo de Cenoura');
      expect(result[0].ingredients[0].name).toBe('Farinha');
    });
  });

  describe('getRecipeById()', () => {
    it('deve retornar a receita formatada quando encontrar pelo ID', async () => {
      (prisma.recipe.findUnique as jest.Mock).mockResolvedValue(dbMockRecipes[0]);

      const result = await getRecipeById('1');

      expect(prisma.recipe.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: '1' } })
      );
      expect(result).not.toBeNull();
      expect(result?.id).toBe('1');
    });

    it('deve retornar null se a receita não for encontrada', async () => {
      (prisma.recipe.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getRecipeById('999');

      expect(result).toBeNull();
    });
  });
});

// nota: Meu primeiro arquivo de teste unitário em Ts com Jest!