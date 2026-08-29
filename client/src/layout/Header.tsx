import Container from "./Container";
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full">
      <Container>
        <div className="flex justify-between items-center py-2">
          <img src="/logo.svg" alt="Cheffe Logo" className="h-7" />
          <button className="p-2">
            <Menu className="text-zest" />
          </button>
        </div>
      </Container>
    </header>
  );
}
