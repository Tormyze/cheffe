import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.tsx";
import Home from "./pages/Home/index.tsx";
import Receitas from "./pages/Receitas.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // renderiza o elemento Home no Outlet quando a rota for '/'
        element: <Home />,
      },
      {
        path: "receitas",
        element: <Receitas />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
