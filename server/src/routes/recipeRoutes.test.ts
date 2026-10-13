import request from "supertest";
import app from "../app";
import * as recipeService from "../services/recipeService";

// mock da camada de serviço para testes HTTP
jest.mock("../services/recipeService");

describe("Recipe Routes & Controller (HTTP Integration)", () => {
  const mockFormattedRecipes = [
    {
      id: "1",
      title: "Bolo de Cenoura",
      imgUrl: "https://example.com/bolo.jpg",
      category: "Sobremesas",
      prepTime: 45,
      steps: ["Passo 1"],
      ingredients: [{ id: "ing1", name: "Farinha" }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/recipes", () => {
    it("deve responder com status 200 OK e a lista de receitas em JSON", async () => {
      // configura o serviço mockado para retornar os dados
      (recipeService.getAllRecipes as jest.Mock).mockResolvedValue(
        mockFormattedRecipes,
      );

      const response = await request(app)
        .get("/api/recipes")
        .expect("Content-Type", /json/)
        .expect(200);

      // verificações da resposta HTTP
      expect(response.body).toEqual(mockFormattedRecipes);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe("Bolo de Cenoura");
    });

    it("deve responder com status 500 caso o serviço lance um erro inesperado", async () => {
      // silencia o console.error apenas durante o teste
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      (recipeService.getAllRecipes as jest.Mock).mockRejectedValue(
        new Error("Erro no banco"),
      );

      const response = await request(app).get("/api/recipes").expect(500);

      expect(response.body).toEqual({ message: "Erro interno no servidor" });

      consoleSpy.mockRestore();
    });
  });

  describe("GET /api/recipes/:id", () => {
    it("deve retornar status 200 OK quando a receita for encontrada", async () => {
      (recipeService.getRecipeById as jest.Mock).mockResolvedValue(
        mockFormattedRecipes[0],
      );

      const response = await request(app).get("/api/recipes/1").expect(200);

      expect(response.body.id).toBe("1");
    });

    it("deve retornar status 404 Not Found quando a receita não existir", async () => {
      (recipeService.getRecipeById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/api/recipes/999").expect(404);

      expect(response.body).toEqual({ message: "Receita não encontrada" });
    });
  });
});
