# 🍳 Cheffe

> 🔗 Documento em [Português BR](./README.pt-br.md)

A modern, responsive, and functional **Brazilian recipe application**.

![Thumb]()

🔗 Access the live project: [Cheffe](https://cheffe-smoky.vercel.app)

---

## 🥗 About the Project

**Cheffe** is an interactive web platform designed to showcase authentic Brazilian cuisine with a seamless and intuitive user experience.

Developed with a **clean interface**, **responsive design**, and custom typography, the application allows users to explore recipes by category, search by dish name, filter directly via URL query parameters, and access detailed recipe step-by-step instructions.

> 📌 **Project Status:** The **Front-end UI/UX & Routing** is 100% completed, fully functional with mock data (`recipesMock.ts`). Full-stack API integration and backend development are currently in progress.

📆 It features a dashboard displaying:
- Dynamic **recipe search** with focus triggers;
- Filterable **category cards** and tags linked directly via URL parameters (`?categoria=...`);
- **Detailed recipe pages** with dynamic routing (`/receitas/:id`);
- Interactive **step-by-step preparation guides** and ingredient checklists;
- **Anchor navigation** (`ScrollToAnchor`) across home sections;

## 🎨 Design & AI-Assisted Workflow

This project was built leveraging modern product design and AI-assisted engineering practices:

- **UI/UX Design:** Prototyped and structured in **Figma** using **Relume.AI** to generate layout wireframes and optimize design system components.
- **AI-Assisted Pair Programming:** Developed using **Gemini** and **GitHub Copilot** as collaborative thought partners for architecture refactoring, ESLint optimization, and React Router URL-state strategy.

## ♨️ Project Goals

The main goal of this project was to master **dynamic routing and state management with React Router**, implementing **shareable URL query parameter filtering**, building a **modular Design System** with **Tailwind CSS**, and applying **Clean Code** best practices in TypeScript.

## 🛠️ Technologies & Tools

**Languages**, **frameworks**, and **tools** used to build this project:

![Vite](https://img.shields.io/badge/Vite-black?logo=vite)
![React](https://img.shields.io/badge/React-black?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-black?logo=typescript)
![React Router](https://img.shields.io/badge/React_Router-black?logo=reactrouter)
![Tailwind](https://img.shields.io/badge/TailwindCSS-black?logo=tailwindcss)
![Figma](https://img.shields.io/badge/Figma-black?logo=figma)
![Git](https://img.shields.io/badge/Git-black?logo=git)

## ✨ Features

- [x] Dynamic search with automatic focus transition;
- [x] Shareable category URL filtering (`useSearchParams`);
- [x] Dynamic routing for detailed recipe views (`/receitas/:id`);
- [x] Interactive category cards and recipe tags;
- [x] Custom anchor scroll hook with location key listener;
- [x] Fully responsive layout (Mobile First) with slide-out navigation;

---

💻 Developed by [Tormyze](https://github.com/Tormyze)