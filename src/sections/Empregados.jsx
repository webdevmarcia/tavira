import { empregados } from "../data/equipa";
import { useEu } from "../lib/eu";
import { useAgora } from "../lib/storage";
import { minutosAgora, turnoAtual } from "../lib/turnos";
import { Avatar, Cartao, TituloPagina } from "../components/ui";
import Icone from "../components/Icones";

export default function Empregados() {
  const { eu } = useEu();
  const min = minutosAgora(useAgora());
  const deServico = empregados.filter((e) => turnoAtual(e, min)).length;

  return (
    <section>
      <TituloPagina titulo="Equipa" subtitulo="Horários e turnos da equipa">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {deServico} de serviço agora
        </span>
      </TituloPagina>

      <ul className="grid sm:grid-cols-2 gap-3">
        {empregados.map((emp) => {
          const atual = turnoAtual(emp, min);
          return (
            <li key={emp.nome}>
              <Cartao className={`p-4 flex items-center gap-4 ${eu?.nome === emp.nome ? "ring-2 ring-amber-300" : ""}`}>
                <Avatar emp={emp} tamanho="w-12 h-12 text-lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-lg">{emp.nome}</span>
                    {emp.direto && (
                      <span className="px-2 py-0.5 rounded-full bg-neutral-950 text-white text-xs font-medium">Direto</span>
                    )}
                    {atual && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">Agora</span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600 tabular-nums">
                    <span className={`inline-flex items-center gap-1 ${atual === "diurno" ? "text-neutral-950 font-medium" : ""}`}>
                      <Icone nome="sol" className="w-4 h-4 text-amber-500" /> {emp.diurno}
                    </span>
                    <span className={`inline-flex items-center gap-1 ${atual === "noturno" ? "text-neutral-950 font-medium" : ""}`}>
                      <Icone nome="lua" className="w-4 h-4 text-indigo-500" /> {emp.noturno}
                    </span>
                  </div>
                </div>
              </Cartao>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
