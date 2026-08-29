import type { ReactNode } from "react"; // usado para renderizar elementos React

interface ContainerProps { // interface para tipar fortemente as props
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

// Container é um componente que centraliza o conteúdo da página e aplica padding horizontal. Ele recebe os filhos (children) e uma classe opcional (className) para estilização adicional.