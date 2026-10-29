import { regras } from "../data/conteudo";
import { Cartao, TituloPagina } from "../components/ui";
import Icone from "../components/Icones";

const icones = { Horários: "relogio", "Sala e clientes": "equipa", Limpeza: "check", Comunicação: "regras" };

export default function Regras() {
  return (
    <section>
      <TituloPagina titulo="Regras da Casa" subtitulo="Normas essenciais para o bom funcionamento do restaurante" />

      <div className="grid md:grid-cols-2 gap-4">
        {regras.map((g) => (
          <Cartao key={g.grupo} className="p-5">
            <h2 className="flex items-center gap-2 font-semibold text-lg mb-3">
              <span className="w-9 h-9 grid place-items-center rounded-xl bg-amber-100 text-amber-800">
                <Icone nome={icones[g.grupo] || "regras"} className="w-5 h-5" />
              </span>
              {g.grupo}
            </h2>
            <ul className="space-y-2.5">
              {g.itens.map((r) => (
                <li key={r} className="flex gap-3 text-neutral-700">
                  <span className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-neutral-400" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Cartao>
        ))}
      </div>
    </section>
  );
}
