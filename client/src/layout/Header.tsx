import Container from "./Container";
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-2">
      <Container>
        <div className="flex justify-between items-center">
          <img src="/logo.svg" alt="Cheffe Logo" className="h-7" />
          <button className="p-2">
            <Menu className="text-zest" />
          </button>
        </div>
      </Container>
    </header>
  );
}
