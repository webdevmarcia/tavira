import { Link, NavLink } from "react-router-dom";
import Icone from "./Icones";
import { paginas } from "../data/paginas";


// Barra de topo (logo + navegação no computador)
export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur text-white topo-seguro">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.webp" alt="" className="w-10 h-10 rounded-full" />
          <span className="leading-tight">
            <span className="block font-serif text-xl font-semibold tracking-wide">O Tavira</span>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-neutral-400">Staff</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
          {paginas.map((p) => (
            <li key={p.para}>
              <NavLink
                to={p.para}
                end={p.para === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${
                    isActive ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                  }`
                }
              >
                {p.nome}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// Barra de separadores em baixo (telemóvel) — como numa app nativa
export function BarraInferior() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-neutral-200 fundo-seguro">
      <ul className="grid grid-cols-5">
        {paginas.map((p) => (
          <li key={p.para}>
            <NavLink
              to={p.para}
              end={p.para === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 pt-2 pb-1.5 text-[11px] font-medium transition ${
                  isActive ? "text-neutral-950" : "text-neutral-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`px-4 py-1 rounded-full transition ${isActive ? "bg-amber-300" : ""}`}>
                    <Icone nome={p.icone} className="w-5 h-5" />
                  </span>
                  {p.nome}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
