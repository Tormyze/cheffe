import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Outlet } from "react-router";
import ScrollToAnchor from "./hooks/ScrollToAnchor";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <ScrollToAnchor />
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
