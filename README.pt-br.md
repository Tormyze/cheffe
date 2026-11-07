# 🍳 Cheffe

> 🔗 Documento em [English](./README.md)

Uma aplicação **Full-Stack** moderna, responsiva e funcional de **receitas brasileiras**.

![Thumb](https://github.com/user-attachments/assets/0ba9623b-40a8-4194-84cc-ff4d340261ba)

🔗 Acesse o projeto online: [Cheffe](https://cheffe-smoky.vercel.app)

---

## 🥗 Sobre o Projeto

O **Cheffe** é uma plataforma interativa para descobrir, criar e organizar receitas brasileiras com uma experiência limpa, responsiva e acessível.

A aplicação combina um frontend em React com uma API REST em Node.js/Express, Prisma ORM e PostgreSQL. O frontend está hospedado na **Vercel**, enquanto a API backend roda no **Render**.

📆 A plataforma conta com:
- Busca dinâmica de receitas e filtros de categoria compartilháveis por URL;
- Navegação pública e páginas de detalhes com rotas dinâmicas (`/receitas/:id`);
- Listas interativas de ingredientes e etapas de preparo;
- Criação de contas e login com autenticação JWT e senhas protegidas por bcrypt;
- Edição de perfil com username único, normalizado e bio;
- Criação, edição e exclusão de receitas protegidas;
- Receitas favoritas com atualização otimista da interface;
- Exibição do username público do dono da receita;
- Navegação responsiva para usuários autenticados e visitantes;
- Integração com API REST e persistência em PostgreSQL;
- Navegação suave por âncoras através do componente `ScrollToAnchor`.

> 📌 **Status do Projeto:** O Cheffe é uma aplicação Full-Stack pronta para produção. O frontend está hospedado na **Vercel**, e a API Node.js/Express com **Prisma ORM** e **PostgreSQL** está hospedada no **Render**.

## 🎨 Design & Fluxo de Trabalho com IA

O projeto segue um fluxo de design com o Figma como fonte visual de verdade:

- **Design UI/UX:** Telas, componentes e decisões do Design System são estruturados no **Figma**, com o MCP oficial do Figma configurado em [`.mcp.json`](./.mcp.json) para apoiar a colaboração entre design e código.
- **Consistência visual:** Componentes React reutilizáveis espelham a linguagem visual do Figma, incluindo cards de perfil, cards de receita, botões, inputs e estados responsivos.
- **Engenharia Assistida por IA:** **GitHub Copilot** e **Gemini** apoiaram refatorações de arquitetura, integração da API, melhorias de acessibilidade, testes e fluxos de deploy.

## ♨️ Objetivos do Projeto

O principal objetivo é praticar desenvolvimento web full-stack combinando React, React Router, TypeScript, Tailwind CSS, design de APIs REST, autenticação JWT, segurança de senhas com bcrypt, modelagem com Prisma, persistência em PostgreSQL, testes automatizados e deploy em produção com Vercel e Render.

## 🛠️ Tecnologias e Ferramentas

**Linguagens**, **frameworks** e **ferramentas** utilizadas na construção do projeto:

![Vite](https://img.shields.io/badge/Vite-black?logo=vite)
![React](https://img.shields.io/badge/React-black?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-black?logo=typescript)
![React Router](https://img.shields.io/badge/React_Router-black?logo=reactrouter)
![Tailwind](https://img.shields.io/badge/TailwindCSS-black?logo=tailwindcss)
![Axios](https://img.shields.io/badge/Axios-black?logo=axios)
![Node.js](https://img.shields.io/badge/Node.js-black?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-black?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-black?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-black?logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)
![bcrypt](https://img.shields.io/badge/bcrypt-black)
![Jest](https://img.shields.io/badge/Jest-black?logo=jest)
![Supertest](https://img.shields.io/badge/Supertest-black)
![Docker](https://img.shields.io/badge/Docker-black?logo=docker)
![Vercel](https://img.shields.io/badge/Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Render-black?logo=render)
![Figma](https://img.shields.io/badge/Figma-black?logo=figma)
![MCP](https://img.shields.io/badge/MCP-black)
![Git](https://img.shields.io/badge/Git-black?logo=git)

## ✨ Funcionalidades

- [x] Arquitetura Full-Stack desacoplada com frontend na Vercel e API no Render;
- [x] Cadastro com nome, username único normalizado, bio, e-mail e senha;
- [x] Autenticação baseada em JWT com rotas protegidas e senhas criptografadas com bcrypt;
- [x] Persistência e sincronização do estado de autenticação via React Context e localStorage;
- [x] Edição inline do perfil com validação de username único e bio;
- [x] Navegação pública, busca, categorias e filtros compartilháveis por URL;
- [x] Criação, edição e exclusão de receitas restritas ao usuário autenticado proprietário;
- [x] Identificação pública do dono da receita com username e avatar ChefHat;
- [x] Favoritos disponíveis somente para usuários autenticados;
- [x] Lista interativa de ingredientes e etapas clicáveis do modo de preparo;
- [x] Persistência em PostgreSQL com migrations e modelos relacionais via Prisma;
- [x] Integração com API REST usando Axios e requisições protegidas por JWT;
- [x] Testes automatizados do backend com Jest e Supertest;
- [x] Layout responsivo Mobile First com componentes React reutilizáveis;
- [x] Configuração do Figma MCP para um fluxo de desenvolvimento orientado pelo design.

---

💻 Desenvolvido por [Tormyze](https://github.com/Tormyze)
