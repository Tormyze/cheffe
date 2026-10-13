# 🍳 Cheffe

> 🔗 Document in [English](./README.md)

Uma aplicação **Full-Stack** moderna, responsiva e funcional de **receitas brasileiras**.

![Thumb](https://github.com/user-attachments/assets/0ba9623b-40a8-4194-84cc-ff4d340261ba)

🔗 Acesse o projeto online: [Cheffe](https://cheffe-smoky.vercel.app)

---

## 🥗 Sobre o Projeto

O **Cheffe** é uma plataforma web interativa desenvolvida para destacar a culinária autêntica brasileira com uma experiência de usuário simples e intuitiva.

Desenvolvida com uma **interface limpa**, **design responsivo** e tipografia personalizada, a aplicação permite aos usuários explorar receitas por categoria, buscar pelo nome do prato, filtrar diretamente via parâmetros de URL e acessar instruções detalhadas passo a passo alimentadas por uma API REST dedicada no backend.

> 📌 **Status do Projeto:** O projeto está **100% concluído como uma aplicação Full-Stack**! O frontend em React está hospedado na **Vercel**, e a API Node.js/Express com **Prisma ORM** e banco de dados **PostgreSQL (Supabase)** está em produção no **Render**.

📆 O dashboard conta com:
- **Busca de receitas** dinâmica com foco automático no input;
- Cards de **categorias filtráveis** e tags vinculadas diretamente por parâmetros de URL (`?categoria=...`);
- **Páginas de detalhes da receita** com rotas dinâmicas (`/receitas/:id`);
- Guias interativos de **preparo passo a passo** e lista de ingredientes;
- **Navegação por âncoras** (`ScrollToAnchor`) entre as seções da página inicial;
- **Integração completa com API RESTful** e consultas dinâmicas ao banco de dados.

## 🎨 Design & Fluxo de Trabalho com IA

Este projeto foi construído utilizando práticas modernas de design de produto e engenharia assistida por inteligência artificial:

- **Design UI/UX:** Prototipado e estruturado no **Figma** utilizando o **Relume.AI** para geração de wireframes de layout e otimização dos componentes do Design System.
- **Desenvolvimento Assistido por IA:** Desenvolvido utilizando o **Gemini** e **GitHub Copilot** como parceiros de Pair Programming para refatoração de arquitetura, integração da API full-stack, otimização de ESLint e configuração dos pipelines de deploy.

## ♨️ Objetivos do Projeto

O objetivo principal deste projeto foi dominar o **desenvolvimento web full-stack**, incluindo **roteamento dinâmico e gerenciamento de estado com React Router**, implementação de **filtros compartilháveis via URL**, construção de um **Design System modular** com **Tailwind CSS**, criação de uma **API REST robusta com Node.js, Express e Prisma ORM**, gerenciamento de banco de dados relacional **PostgreSQL** e deploy em produção utilizando **Vercel** e **Render**.

## 🛠️ Tecnologias e Ferramentas

**Linguagens**, **frameworks** e **ferramentas** utilizadas na construção do projeto:

![Vite](https://img.shields.io/badge/Vite-black?logo=vite)
![React](https://img.shields.io/badge/React-black?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-black?logo=typescript)
![React Router](https://img.shields.io/badge/React_Router-black?logo=reactrouter)
![Tailwind](https://img.shields.io/badge/TailwindCSS-black?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-black?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-black?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-black?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-black?logo=postgresql)
![Supabase](https://img.shields.io/badge/Supabase-black?logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Render-black?logo=render)
![Figma](https://img.shields.io/badge/Figma-black?logo=figma)
![Git](https://img.shields.io/badge/Git-black?logo=git)

## ✨ Funcionalidades

- [x] Arquitetura Full-Stack com Frontend desacoplado (Vercel) e API Backend (Render);
- [x] Busca dinâmica com transição automática de foco e filtro direto no banco via API;
- [x] Filtro de categoria compartilhável pela URL (`useSearchParams`);
- [x] Roteamento dinâmico para visualização detalhada de receitas (`/receitas/:id`);
- [x] Persistência em banco de dados relacional com PostgreSQL & Prisma ORM;
- [x] Cards de categorias e tags de receitas interativas;
- [x] Hook de rolagem suave por âncoras com escuta de chave de localização;
- [x] Layout 100% responsivo (Mobile First) com menu retrátil;

---

💻 Desenvolvido por [Tormyze](https://github.com/Tormyze)
