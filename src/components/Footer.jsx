import { useEu } from "../lib/eu";

function Footer() {
  const { eu, setEu } = useEu();

  const sair = () => {
    try {
      localStorage.removeItem("acesso");
    } catch {
      // ignorar
    }
    setEu(null);
    window.location.reload();
  };

  return (
    <footer className="hidden md:block border-t border-neutral-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 flex items-center justify-between text-sm text-neutral-500">
        <div className="flex items-center gap-3">
          <img src="/logo.webp" alt="" className="w-8 h-8 rounded-full" />
          <span>Restaurante O Tavira — área da equipa</span>
        </div>
        <button onClick={sair} className="hover:text-neutral-900 transition">
          {eu ? `Sair (${eu.nome})` : "Sair"}
        </button>
      </div>
    </footer>
  );
}

export default Footer;
