import { useState } from "react";
import { ler, guardar } from "../lib/storage";
import Icone from "../components/Icones";

// Nota: esta password está no código do site — serve para afastar curiosos,
// não é segurança a sério. Para mudar, alterar aqui (e todos voltam a ter de a introduzir).
const PASSWORD = "Marisco";
const VERSAO_ACESSO = "1";

export default function Gate({ children }) {
  const [authorized, setAuthorized] = useState(() => ler("acesso") === VERSAO_ACESSO);
  const [password, setPassword] = useState("");
  const [lembrar, setLembrar] = useState(true);
  const [error, setError] = useState("");

  const validar = (e) => {
    e.preventDefault();
    if (password.trim() === PASSWORD) {
      if (lembrar) guardar("acesso", VERSAO_ACESSO);
      setAuthorized(true);
      setError("");
    } else {
      setError("Password incorreta");
    }
  };

  if (authorized) return children;

  return (
    <div className="min-h-dvh flex items-center justify-center bg-neutral-950 px-6 topo-seguro">
      <form onSubmit={validar} className="w-full max-w-sm text-center">
        <img src="/logo.webp" alt="Restaurante O Tavira" className="w-36 h-36 mx-auto mb-8 rounded-full" />

        <h1 className="font-serif text-3xl text-white mb-1">Área da Equipa</h1>
        <p className="text-neutral-400 text-sm mb-8 text-center">Introduz a password do staff para continuar</p>

        <label className="relative block mb-3">
          <span className="sr-only">Password</span>
          <Icone nome="cadeado" className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="password"
            autoComplete="current-password"
            autoFocus
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-300"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-neutral-400 mb-5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={lembrar}
            onChange={(e) => setLembrar(e.target.checked)}
            className="w-4 h-4 accent-amber-300"
          />
          Lembrar neste dispositivo
        </label>

        <button type="submit" className="w-full bg-amber-300 hover:bg-amber-200 text-neutral-950 font-semibold py-3.5 rounded-xl transition">
          Entrar
        </button>

        <p role="alert" className="text-red-400 mt-4 text-sm text-center min-h-5">{error}</p>
      </form>
    </div>
  );
}
