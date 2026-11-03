import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import app from "../app";
import { prisma } from "../database/prisma";

describe("Favorite Routes Integration Tests (/api/favorites)", () => {
  let token: string;
  let userId: string;
  let recipeId: string;

  beforeAll(async () => {
    // limpa registros de teste prévios
    await prisma.favorite.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = await prisma.user.create({
      data: {
        name: "User Teste Favoritos",
        email: `fav_test_${Date.now()}@example.com`,
        password: hashedPassword,
      },
    });
    userId = user.id;

    const recipe = await prisma.recipe.create({
      data: {
        title: "Bolo de Teste Automatizado",
        category: "Doces",
        prepTime: 40,
        imgUrl: "http://example.com/bolo.jpg",
        steps: ["Misturar os ingredientes", "Assar por 40 minutos"],
        userId: userId,
      },
    });
    recipeId = recipe.id;

    token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );
  });

  afterAll(async () => {
    // limpeza final do banco Docker de dev/teste
    await prisma.favorite.deleteMany();
    await prisma.recipe.deleteMany({ where: { id: recipeId } });
    await prisma.user.deleteMany({ where: { id: userId } });
    await prisma.$disconnect();
  });

  it("should return 401 when accessing without token", async () => {
    const response = await request(app).get("/api/favorites");
    expect(response.status).toBe(401);
  });

  it("POST /api/favorites/:recipeId - should add recipe to favorites (toggle ON)", async () => {
    const response = await request(app)
      .post(`/api/favorites/${recipeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ isFavorite: true });
  });

  it("POST /api/favorites/:recipeId - should remove recipe from favorites (toggle OFF)", async () => {
    const response = await request(app)
      .post(`/api/favorites/${recipeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ isFavorite: false });
  });

  it("GET /api/favorites - should list user favorite recipes", async () => {
    // favorita novamente para garantir 1 item no retorno
    await request(app)
      .post(`/api/favorites/${recipeId}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/api/favorites")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(recipeId);
  });
});