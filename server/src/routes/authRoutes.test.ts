import request from "supertest";
import app from "../app";
import { prisma } from "../database/prisma";

describe("POST /api/auth/register", () => {
  afterAll(async () => {
    // limpa o usuário de teste se necessário
    await prisma.user.deleteMany({ where: { email: "testejest@cheffe.com" } });
    await prisma.$disconnect();
  });

  it("deve cadastrar um novo usuário com sucesso", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Usuario Teste",
        email: "testejest@cheffe.com",
        password: "senha123",
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe("testejest@cheffe.com");
    expect(response.body.user).not.toHaveProperty("password"); // NUNCA deve retornar a senha
  });

  it("deve retornar erro 409 ao tentar cadastrar o mesmo e-mail duas vezes", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Usuario Duplicado",
        email: "testejest@cheffe.com",
        password: "senha123",
      });

    expect(response.status).toBe(409);
    expect(response.body.error).toBe("E-mail já cadastrado.");
  });
});