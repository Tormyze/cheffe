# 🍳 Cheffe

> 🔗 Documento em [Português BR](./README.pt-br.md)

A modern, responsive, and functional **full-stack Brazilian recipe application**.

![Thumb](https://github.com/user-attachments/assets/0ba9623b-40a8-4194-84cc-ff4d340261ba)

🔗 Access the live project: [Cheffe](https://cheffe-smoky.vercel.app)

---

## 🥗 About the Project

**Cheffe** is an interactive platform for discovering, creating, and organizing Brazilian recipes with a clean, responsive, and accessible experience.

The application combines a React frontend with a Node.js/Express REST API, Prisma ORM, and PostgreSQL. The frontend is deployed on **Vercel**, while the backend API runs on **Render**.

📆 The platform includes:
- Dynamic recipe search and category filtering with shareable URL parameters;
- Public recipe browsing and dynamic detail pages (`/receitas/:id`);
- Interactive ingredient checklists and preparation steps;
- Account creation and login with JWT authentication and bcrypt password hashing;
- Profile editing with unique, normalized usernames and bios;
- Protected recipe creation, editing, and deletion;
- Favorite recipes with optimistic UI updates;
- Recipe ownership displayed through public usernames;
- Responsive navigation with authenticated and unauthenticated states;
- RESTful API integration with PostgreSQL persistence;
- Smooth anchor navigation through the `ScrollToAnchor` component.

> 📌 **Project Status:** Cheffe is a production-ready Full-Stack Application. The frontend is hosted on **Vercel**, and the Node.js/Express API powered by **Prisma ORM** and **PostgreSQL** is hosted on **Render**.

## 🎨 Design & AI-Assisted Workflow

The project follows a Figma-first design workflow:

- **UI/UX Design:** Screens, components, and design system decisions are structured in **Figma**, with the official Figma MCP configured in [`.mcp.json`](./.mcp.json) to support design-to-code collaboration.
- **Design consistency:** Reusable React components mirror the visual language defined in Figma, including profile cards, recipe cards, buttons, inputs, and responsive states.
- **AI-Assisted Engineering:** **GitHub Copilot** and **Gemini** supported architecture refactoring, API integration, accessibility improvements, testing, and deployment workflows.

## ♨️ Project Goals

The main goal is to practice full-stack web development by combining React, React Router, TypeScript, Tailwind CSS, REST API design, JWT authentication, bcrypt password security, Prisma data modeling, PostgreSQL persistence, automated tests, and production deployment with Vercel and Render.

## 🛠️ Technologies & Tools

**Languages**, **frameworks**, and **tools** used to build this project:

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

## ✨ Features

- [x] Decoupled Full-Stack architecture with Vercel frontend and Render API;
- [x] User registration with name, unique normalized username, bio, email, and password;
- [x] JWT-based authentication with protected routes and bcrypt password hashing;
- [x] Auth state persistence and synchronization through React Context and localStorage;
- [x] Inline profile editing with username uniqueness and bio validation;
- [x] Public recipe browsing, search, categories, and URL-based filters;
- [x] Recipe creation, editing, and deletion restricted to the authenticated owner;
- [x] Recipe ownership with public username and ChefHat avatar indicators;
- [x] Favorite recipes restricted to authenticated users;
- [x] Ingredient checklist and clickable preparation steps;
- [x] PostgreSQL persistence with Prisma migrations and relational models;
- [x] REST API integration with Axios and protected JWT requests;
- [x] Automated backend coverage with Jest and Supertest;
- [x] Responsive Mobile First layout with reusable React components;
- [x] Figma MCP configuration for a Figma-first design workflow.

---

💻 Developed by [Tormyze](https://github.com/Tormyze)
