import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Outlet } from "react-router";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
