# 🍳 Cheffe

> 🔗 Document in [English](./README.md)

Uma aplicação de receitas brasileiras moderna, responsiva e funcional.

![Thumb](https://github.com/user-attachments/assets/0ba9623b-40a8-4194-84cc-ff4d340261ba)

🔗 Acesse o projeto online: [Cheffe](https://cheffe-smoky.vercel.app)

---

## 🥗 Sobre o Projeto

O **Cheffe** é uma plataforma web interativa desenvolvida para destacar a culinária autêntica brasileira com uma experiência de usuário simples e intuitiva.

Desenvolvido com uma **interface clean**, **design responsivo** e tipografia personalizada, o sistema permite que os usuários explorem receitas por categoria, façam buscas por nome do prato, utilizem filtros diretamente via Query Parameters na URL e acessem instruções detalhadas passo a passo.

> 📌 **Status do Projeto:** A interface **Front-end UI/UX e Roteamento** está 100% concluída e totalmente funcional com dados simulados (`recipesMock.ts`). O desenvolvimento da API Back-end e a integração com o banco de dados estão em andamento.

📆 O dashboard conta com:
- **Busca de receitas** dinâmica com foco automático no input;
- Cards de **categorias filtráveis** e tags vinculadas diretamente por parâmetros de URL (`?categoria=...`);
- **Páginas de detalhes da receita** com rotas dinâmicas (`/receitas/:id`);
- Guias interativos de **preparo passo a passo** e lista de ingredientes;
- **Navegação por âncoras** (`ScrollToAnchor`) entre as seções da página inicial;

## 🎨 Design & Fluxo de Trabalho com IA

Este projeto foi construído utilizando práticas modernas de design de produto e engenharia assistida por inteligência artificial:

- **Design UI/UX:** Prototipado e estruturado no **Figma** utilizando o **Relume.AI** para geração de wireframes de layout e otimização dos componentes do Design System.
- **Desenvolvimento Assistido por IA:** Desenvolvido utilizando o **Gemini** e **GitHub Copilot** como parceiros de Pair Programming para refatoração de arquitetura, otimizações de ESLint e estratégia de estado baseada em URL com o React Router.

## ♨️ Objetivos do Projeto

O objetivo principal deste projeto foi dominar o **roteamento dinâmico e gerenciamento de estado com React Router**, implementar **filtros compartilháveis por Query Parameters na URL**, construir um **Design System modular** com **Tailwind CSS** e aplicar as melhores práticas de **Clean Code** utilizando TypeScript.

## 🛠️ Tecnologias e Ferramentas

**Linguagens**, **frameworks** e **ferramentas** utilizadas na construção do projeto:

![Vite](https://img.shields.io/badge/Vite-black?logo=vite)
![React](https://img.shields.io/badge/React-black?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-black?logo=typescript)
![React Router](https://img.shields.io/badge/React_Router-black?logo=reactrouter)
![Tailwind](https://img.shields.io/badge/TailwindCSS-black?logo=tailwindcss)
![Figma](https://img.shields.io/badge/Figma-black?logo=figma)
![Git](https://img.shields.io/badge/Git-black?logo=git)

## ✨ Funcionalidades

- [x] Busca dinâmica com transição de foco automático;
- [x] Filtro de categorias compartilhável pela URL (`useSearchParams`);
- [x] Rotas dinâmicas para detalhes das receitas (`/receitas/:id`);
- [x] Cards de categoria e tags de receita interativos;
- [x] Hook de scroll para âncoras ouvindo a chave de localização (`location.key`);
- [x] Layout 100% responsivo (Mobile First) com menu gaveta expansível;

---

💻 Desenvolvido por [Tormyze](https://github.com/Tormyze)
