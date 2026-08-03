import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full py-4 bg-black shadow">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4">
        
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/logo.webp"
            alt="Logo Restaurante O Tavira"
            className="w-12 h-12 object-contain"
          />
          <span className="text-2xl font-bold text-white">O Tavira - Staff</span>
        </a>

        {/* Ícone hambúrguer (mobile) */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <span className="w-7 h-0.5 bg-white rounded"></span>
          <span className="w-7 h-0.5 bg-white rounded"></span>
          <span className="w-7 h-0.5 bg-white rounded"></span>
        </button>

        {/* Navegação desktop */}
        <ul className="hidden md:flex items-center gap-6 text-[15px] font-medium text-white">
          <li><a href="#Empregados" className="hover:text-gray-400 transition">Empregados</a></li>
          <li><a href="#Tarefas" className="hover:text-gray-400 transition">Tarefas</a></li>
          <li><a href="#Salas" className="hover:text-gray-400 transition">Salas</a></li>
          <li><a href="#Regras" className="hover:text-gray-400 transition">Regras da Casa</a></li>
        </ul>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 text-white text-lg font-semibold">
          <button
            className="absolute top-6 right-6 text-3xl"
            onClick={() => setOpen(false)}
          >
            ×
          </button>

          <a href="#Empregados" onClick={() => setOpen(false)}>Empregados</a>
          <a href="#Tarefas" onClick={() => setOpen(false)}>Tarefas</a>
          <a href="#Salas" onClick={() => setOpen(false)}>Salas</a>
          <a href="#Regras" onClick={() => setOpen(false)}>Regras da Casa</a>
        </div>
      )}
    </header>
  );
}

export default Header;
