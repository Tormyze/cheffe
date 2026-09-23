import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToAnchor() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // pequeno timeout para a nova página renderizar o elemento no DOM
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // se navegar para outra rota (sem hash), sobe para o topo
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);

  return null;
}

// esse código faz com que, ao clicar em um link dentro da mesma página, a rolagem seja suave até o elemento com o id correspondente ao hash (#). Se navegar para uma rota diferente, a página volta para o topo.