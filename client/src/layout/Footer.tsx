import Container from "./Container";

export default function Footer() {
  return (
    <footer className="w-full py-4">
      <Container>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Cheffe. Todos os direitos
          reservados.
        </p>
      </Container>
    </footer>
  );
}
