import request from "supertest";
import jwt from "jsonwebtoken";
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

  const recipePayload = {
    title: "Pastel de Frango",
    imgUrl: "https://example.com/pastel.jpg",
    category: "Massas",
    prepTime: 40,
    ingredients: [
      {
        name: "Farinha de trigo",
        amount: 2,
        unit: "xícara(s)",
      },
    ],
    steps: ["Misture os ingredientes.", "Asse até dourar."],
  };

  const userId = "user-1";
  const token = jwt.sign(
    { id: userId, email: "teste@cheffe.com" },
    process.env.JWT_SECRET || "default_secret",
  );

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

  describe("POST /api/recipes", () => {
    it("deve criar uma receita para o usuário autenticado", async () => {
      (recipeService.createRecipe as jest.Mock).mockResolvedValue({
        id: "recipe-1",
        ...recipePayload,
      });

      const response = await request(app)
        .post("/api/recipes")
        .set("Authorization", `Bearer ${token}`)
        .send(recipePayload)
        .expect(201);

      expect(recipeService.createRecipe).toHaveBeenCalledWith(
        userId,
        recipePayload,
      );
      expect(response.body.id).toBe("recipe-1");
    });

    it("deve rejeitar a criação sem autenticação", async () => {
      const response = await request(app)
        .post("/api/recipes")
        .send(recipePayload)
        .expect(401);

      expect(recipeService.createRecipe).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        error: "Acesso negado. Token não fornecido.",
      });
    });

    it("deve rejeitar a criação com dados inválidos", async () => {
      const response = await request(app)
        .post("/api/recipes")
        .set("Authorization", `Bearer ${token}`)
        .send({ ...recipePayload, ingredients: [] })
        .expect(400);

      expect(recipeService.createRecipe).not.toHaveBeenCalled();
      expect(response.body).toEqual({
        error: "Dados da receita inválidos.",
      });
    });
  });

  describe("PATCH /api/recipes/:id", () => {
    it("deve editar uma receita do usuário autenticado", async () => {
      (recipeService.updateRecipe as jest.Mock).mockResolvedValue({
        id: "recipe-1",
        ...recipePayload,
        title: "Pastel de Frango Especial",
      });

      const updatedPayload = {
        ...recipePayload,
        title: "Pastel de Frango Especial",
      };
      const response = await request(app)
        .patch("/api/recipes/recipe-1")
        .set("Authorization", `Bearer ${token}`)
        .send(updatedPayload)
        .expect(200);

      expect(recipeService.updateRecipe).toHaveBeenCalledWith(
        "recipe-1",
        userId,
        updatedPayload,
      );
      expect(response.body.title).toBe("Pastel de Frango Especial");
    });

    it("deve retornar 404 quando a receita não pertencer ao usuário", async () => {
      (recipeService.updateRecipe as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .patch("/api/recipes/recipe-unknown")
        .set("Authorization", `Bearer ${token}`)
        .send(recipePayload)
        .expect(404);

      expect(response.body).toEqual({
        message: "Receita não encontrada.",
      });
    });
  });

  describe("DELETE /api/recipes/:id", () => {
    it("deve excluir uma receita do usuário autenticado", async () => {
      (recipeService.deleteRecipe as jest.Mock).mockResolvedValue(true);

      await request(app)
        .delete("/api/recipes/recipe-1")
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      expect(recipeService.deleteRecipe).toHaveBeenCalledWith(
        "recipe-1",
        userId,
      );
    });

    it("deve retornar 404 quando a receita não pertencer ao usuário", async () => {
      (recipeService.deleteRecipe as jest.Mock).mockResolvedValue(false);

      const response = await request(app)
        .delete("/api/recipes/recipe-unknown")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);

      expect(response.body).toEqual({
        message: "Receita não encontrada.",
      });
    });
  });
});
