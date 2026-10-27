import request from "supertest";
import app from "../app";
import { prisma } from "../database/prisma";

describe("POST /api/auth/register", () => {
  afterAll(async () => {
    // limpa o usuário de teste se necessário
    await prisma.user.deleteMany({ where: { email: "testejest@cheffe.com" } });
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

describe("POST /api/auth/login", () => {
  beforeAll(async () => {
    await request(app).post("/api/auth/register").send({
      name: "Usuario Login",
      email: "loginjest@cheffe.com",
      password: "senha123",
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: "loginjest@cheffe.com" } });
    await prisma.$disconnect();
  });

  it("deve realizar login com credenciais válidas", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "loginjest@cheffe.com",
        password: "senha123",
      })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toBe("Login realizado com sucesso!");
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user).toMatchObject({
      name: "Usuario Login",
      email: "loginjest@cheffe.com",
    });
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).not.toHaveProperty("password");
  });

  it("deve retornar erro 401 para senha inválida", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "loginjest@cheffe.com",
        password: "senhaerrada",
      })
      .expect(401);

    expect(response.body.error).toBe("E-mail ou senha inválidos.");
  });

  it("deve retornar erro 401 para e-mail não cadastrado", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "naoexistejest@cheffe.com",
        password: "senha123",
      })
      .expect(401);

    expect(response.body.error).toBe("E-mail ou senha inválidos.");
  });

  it("deve retornar erro 400 quando e-mail ou senha não forem informados", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "loginjest@cheffe.com" })
      .expect(400);

    expect(response.body.error).toBe("E-mail e senha são obrigatórios.");
  });
});