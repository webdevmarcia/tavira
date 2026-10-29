import Icone from "./Icones";

export function TituloPagina({ titulo, subtitulo, children }) {
  return (
    <div className="mb-6 md:mb-8 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-neutral-950">{titulo}</h1>
        {subtitulo && <p className="mt-1 text-neutral-500">{subtitulo}</p>}
      </div>
      {children}
    </div>
  );
}

export function Cartao({ className = "", children, ...props }) {
  return (
    <div className={`bg-white rounded-2xl border border-neutral-200/80 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Avatar({ emp, tamanho = "w-10 h-10 text-base" }) {
  return (
    <span
      className={`${tamanho} shrink-0 grid place-items-center rounded-full font-semibold text-neutral-950 ring-2 ring-white`}
      style={{ backgroundColor: emp.cor }}
      aria-hidden
    >
      {emp.nome[0]}
    </span>
  );
}

export function Caixa({ marcada, onClick, rotulo }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={marcada}
      aria-label={rotulo}
      onClick={onClick}
      className={`shrink-0 w-6 h-6 grid place-items-center rounded-md border-2 transition ${
        marcada ? "bg-neutral-950 border-neutral-950 text-white" : "border-neutral-300 hover:border-neutral-500"
      }`}
    >
      {marcada && <Icone nome="check" className="w-4 h-4" />}
    </button>
  );
}

export function Progresso({ feitas, total, cor = "#0a0a0a" }) {
  const pct = total ? Math.round((feitas / total) * 100) : 0;
  return (
    <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden" aria-hidden>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: cor }} />
    </div>
  );
}
