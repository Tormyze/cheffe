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
        username: "usuario_teste",
        bio: "Bio de teste",
        email: "testejest@cheffe.com",
        password: "senha123",
      });

    expect(response.status).toBe(201);
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe("testejest@cheffe.com");
    expect(response.body.user.username).toBe("usuario_teste");
    expect(response.body.user.bio).toBe("Bio de teste");
    expect(response.body.user).not.toHaveProperty("password"); // NUNCA deve retornar a senha
  });

  it("deve retornar erro 409 ao tentar cadastrar o mesmo e-mail duas vezes", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Usuario Duplicado",
        username: "outro_username",
        email: "testejest@cheffe.com",
        password: "senha123",
      });

    expect(response.status).toBe(409);
    expect(response.body.error).toBe("E-mail já cadastrado.");
  });

  it("deve normalizar o username e rejeitar username já ocupado", async () => {
    const normalized = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Outro Usuario",
        username: "Outro_Usuario",
        email: "outrojest@cheffe.com",
        password: "senha123",
      })
      .expect(201);

    expect(normalized.body.user.username).toBe("outro_usuario");

    const duplicate = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Terceiro Usuario",
        username: "OUTRO_USUARIO",
        email: "terceirojest@cheffe.com",
        password: "senha123",
      })
      .expect(409);

    expect(duplicate.body.error).toBe("Username já está ocupado.");
    await prisma.user.deleteMany({
      where: { email: { in: ["outrojest@cheffe.com", "terceirojest@cheffe.com"] } },
    });
  });

  it("deve rejeitar username e bio inválidos", async () => {
    const usernameResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Usuario Invalido",
        username: "nome-invalido",
        email: "invalidojest@cheffe.com",
        password: "senha123",
      })
      .expect(400);

    expect(usernameResponse.body.error).toContain("Username deve ter");

    const bioResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Usuario Bio",
        username: "usuario_bio",
        email: "biojest@cheffe.com",
        password: "senha123",
        bio: "a".repeat(201),
      })
      .expect(400);

    expect(bioResponse.body.error).toBe("A bio deve ter no máximo 200 caracteres.");
  });
});

describe("POST /api/auth/login", () => {
  beforeAll(async () => {
    await request(app).post("/api/auth/register").send({
      name: "Usuario Login",
      username: "usuario_login",
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

describe("GET /api/auth/me", () => {
  let token: string;

  beforeAll(async () => {
    await request(app).post("/api/auth/register").send({
      name: "Usuario Perfil",
      username: "usuario_perfil",
      email: "mejest@cheffe.com",
      password: "senha123",
    });

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "mejest@cheffe.com",
        password: "senha123",
      });

    token = response.body.token;
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: "mejest@cheffe.com" } });
  });

  it("deve retornar o perfil do usuário autenticado", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.user).toMatchObject({
      name: "Usuario Perfil",
      username: "usuario_perfil",
      bio: "",
      email: "mejest@cheffe.com",
    });
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("createdAt");
    expect(response.body.user).toHaveProperty("recipes");
    expect(response.body.user).not.toHaveProperty("password");
  });

  it("deve retornar erro 401 quando o token não for informado", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .expect(401);

    expect(response.body.error).toBe("Acesso negado. Token não fornecido.");
  });

  it("deve retornar erro 403 quando o token for inválido", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", "Bearer token-invalido")
      .expect(403);

    expect(response.body.error).toBe("Token inválido ou expirado.");
  });

  it("deve atualizar nome, username e bio do perfil autenticado", async () => {
    const response = await request(app)
      .patch("/api/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuario Perfil Atualizado",
        username: "Perfil_Novo",
        bio: "Nova bio",
      })
      .expect(200);

    expect(response.body.user).toMatchObject({
      name: "Usuario Perfil Atualizado",
      username: "perfil_novo",
      bio: "Nova bio",
      email: "mejest@cheffe.com",
    });
    expect(response.body.user).not.toHaveProperty("password");
  });

  it("deve rejeitar atualização para username ocupado", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Usuario Ocupado",
      username: "username_ocupado",
      email: "ocupadojest@cheffe.com",
      password: "senha123",
    });

    const response = await request(app)
      .patch("/api/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "USERNAME_OCUPADO" })
      .expect(409);

    expect(response.body.error).toBe("Username já está ocupado.");
    await prisma.user.deleteMany({ where: { email: "ocupadojest@cheffe.com" } });
  });

  it("deve exigir autenticação para atualizar o perfil", async () => {
    await request(app)
      .patch("/api/auth/me")
      .send({ bio: "Sem token" })
      .expect(401);
  });
});