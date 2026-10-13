# 🍳 Cheffe

> 🔗 Documento em [Português BR](./README.pt-br.md)

A modern, responsive, and functional **full-stack Brazilian recipe application**.

![Thumb](https://github.com/user-attachments/assets/0ba9623b-40a8-4194-84cc-ff4d340261ba)

🔗 Access the live project: [Cheffe](https://cheffe-smoky.vercel.app)

---

## 🥗 About the Project

**Cheffe** is an interactive web platform designed to showcase authentic Brazilian cuisine with a seamless and intuitive user experience.

Developed with a **clean interface**, **responsive design**, and custom typography, the application allows users to explore recipes by category, search by dish name, filter directly via URL query parameters, and access detailed recipe step-by-step instructions.

> 📌 **Project Status:** The project is **100% completed as a Full-Stack Application**! The frontend UI/UX is deployed on **Vercel**, and the Node.js/Express backend API powered by **Prisma ORM** and **PostgreSQL (Supabase)** is hosted on **Render**.

📆 It features a dashboard displaying:
- Dynamic **recipe search** with focus triggers;
- Filterable **category cards** and tags linked directly via URL parameters (`?categoria=...`);
- **Detailed recipe pages** with dynamic routing (`/receitas/:id`);
- Interactive **step-by-step preparation guides** and ingredient checklists;
- **Anchor navigation** (`ScrollToAnchor`) across home sections;
- Full **RESTful API integration** with dynamic database queries.

## 🎨 Design & AI-Assisted Workflow

This project was built leveraging modern product design and AI-assisted engineering practices:

- **UI/UX Design:** Prototyped and structured in **Figma** using **Relume.AI** to generate layout wireframes and optimize design system components.
- **AI-Assisted Pair Programming:** Developed using **Gemini** and **GitHub Copilot** as collaborative thought partners for architecture refactoring, full-stack API integration, ESLint optimization, and deployment pipelines.

## ♨️ Project Goals

The main goal of this project was to master **full-stack web development**, including **dynamic routing and state management with React Router**, implementing **shareable URL query parameter filtering**, building a **modular Design System** with **Tailwind CSS**, creating a robust **REST API with Node.js, Express, and Prisma ORM**, managing a relational **PostgreSQL database** and deploying a production-ready application across **Vercel** and **Render**.

## 🛠️ Technologies & Tools

**Languages**, **frameworks**, and **tools** used to build this project:

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

## ✨ Features

- [x] Full-stack architecture with decoupled Frontend (Vercel) and Backend API (Render);
- [x] Dynamic search with automatic focus transition and backend query filtering;
- [x] Shareable category URL filtering (`useSearchParams`);
- [x] Dynamic routing for detailed recipe views (`/receitas/:id`);
- [x] Relational database persistence with PostgreSQL & Prisma ORM;
- [x] Interactive category cards and recipe tags;
- [x] Custom anchor scroll hook with location key listener;
- [x] Fully responsive layout (Mobile First) with slide-out navigation;

---

💻 Developed by [Tormyze](https://github.com/Tormyze)
