import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button className={`px-6 py-3 rounded-lg ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
}
