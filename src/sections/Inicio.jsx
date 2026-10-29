import { Link } from "react-router-dom";
import { empregados, momentosDia } from "../data/equipa";
import { useEu } from "../lib/eu";
import { useAgora } from "../lib/storage";
import { useFeitas, useTarefas } from "../lib/tarefas";
import { formatarMinutos, intervalo, minutosAgora, proximoTurno, turnoAtual } from "../lib/turnos";
import { Avatar, Caixa, Cartao, Progresso } from "../components/ui";
import InstalarApp from "../components/InstalarApp";
import Icone from "../components/Icones";

function saudacao(data) {
  const h = data.getHours();
  if (h < 6) return "Boa noite";
  if (h < 13) return "Bom dia";
  if (h < 20) return "Boa tarde";
  return "Boa noite";
}

function EscolherPessoa() {
  const { setEu } = useEu();
  return (
    <Cartao className="p-5">
      <h2 className="font-semibold text-lg">Quem és tu?</h2>
      <p className="text-sm text-neutral-500 mb-4">Escolhe o teu nome para veres o teu turno e as tuas tarefas. Fica guardado neste telemóvel.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {empregados.map((e) => (
          <button
            key={e.nome}
            onClick={() => setEu(e.nome)}
            className="flex items-center gap-2 p-2 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition text-left"
          >
            <Avatar emp={e} tamanho="w-8 h-8 text-sm" />
            <span className="font-medium">{e.nome}</span>
          </button>
        ))}
      </div>
    </Cartao>
  );
}

function OMeuDia({ eu, agora }) {
  const { listas } = useTarefas();
  const { feita, alternar } = useFeitas();
  const tarefas = listas[eu.nome].filter(Boolean);
  const feitas = tarefas.filter((t) => feita(eu.nome, t)).length;

  const min = minutosAgora(agora);
  const atual = turnoAtual(eu, min);
  const proximo = proximoTurno(eu, min);

  let estado;
  if (atual) {
    const fim = intervalo(eu[atual]).fim;
    estado = { cor: "bg-emerald-500", texto: `De serviço — ${eu[atual].includes("fecho") ? "até ao fecho" : `até às ${formatarMinutos(fim)}`}` };
  } else if (proximo) {
    estado = { cor: "bg-amber-400", texto: `Próximo turno às ${formatarMinutos(proximo.inicio)}` };
  } else {
    estado = { cor: "bg-neutral-300", texto: "Turnos de hoje terminados" };
  }

  return (
    <Cartao className="overflow-hidden">
      <div className="h-1.5" style={{ backgroundColor: eu.cor }} />
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-600 mb-4">
          <span className={`w-2.5 h-2.5 rounded-full ${estado.cor}`} />
          {estado.texto}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { t: "diurno", rotulo: "Diurno", icone: "sol" },
            { t: "noturno", rotulo: "Noturno", icone: "lua" },
          ].map(({ t, rotulo, icone }) => (
            <div key={t} className={`rounded-xl p-3 ${atual === t ? "bg-neutral-950 text-white" : "bg-neutral-100"}`}>
              <div className={`flex items-center gap-1.5 text-xs uppercase tracking-wider ${atual === t ? "text-neutral-400" : "text-neutral-500"}`}>
                <Icone nome={icone} className="w-4 h-4" /> {rotulo}
              </div>
              <div className="mt-1 font-semibold tabular-nums">{eu[t]}</div>
            </div>
          ))}
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-semibold">As minhas tarefas</h3>
          <span className="text-sm text-neutral-500 tabular-nums">{feitas}/{tarefas.length}</span>
        </div>
        <Progresso feitas={feitas} total={tarefas.length} />
        <ul className="mt-3 divide-y divide-neutral-100">
          {tarefas.map((t) => (
            <li key={t} className="flex items-center gap-3 py-2.5">
              <Caixa marcada={feita(eu.nome, t)} onClick={() => alternar(eu.nome, t)} rotulo={t} />
              <span className={feita(eu.nome, t) ? "line-through text-neutral-400" : ""}>{t}</span>
            </li>
          ))}
        </ul>
        {tarefas.length > 0 && feitas === tarefas.length && (
          <p className="mt-3 text-sm font-medium text-emerald-700">Tudo feito por hoje. Obrigado!</p>
        )}
      </div>
    </Cartao>
  );
}

function DeServico({ agora }) {
  const min = minutosAgora(agora);
  const presentes = empregados.filter((e) => turnoAtual(e, min));

  return (
    <Cartao className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">De serviço agora</h2>
        <span className="text-sm text-neutral-500 tabular-nums">{formatarMinutos(min)}</span>
      </div>
      {presentes.length === 0 ? (
        <p className="text-sm text-neutral-500">Ninguém de serviço neste momento.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {presentes.map((e) => (
            <li key={e.nome} className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-neutral-100">
              <Avatar emp={e} tamanho="w-7 h-7 text-xs" />
              <span className="text-sm font-medium">{e.nome}</span>
            </li>
          ))}
        </ul>
      )}
      <Link to="/equipa" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-950">
        Ver todos os horários <Icone nome="seta" className="w-4 h-4" />
      </Link>
    </Cartao>
  );
}

function Hoje({ agora }) {
  const min = minutosAgora(agora);
  // Um momento "passou" quando chega a hora de fim (ou a hora, se não tiver fim)
  const fimMomento = (m) => intervalo(`${m.hora} - ${m.fim || "fecho"}`)[m.fim ? "fim" : "inicio"];
  const proximoIdx = momentosDia.findIndex((m) => fimMomento(m) >= min);

  return (
    <Cartao className="p-5">
      <h2 className="font-semibold mb-4">Hoje</h2>
      <ol className="relative border-l-2 border-neutral-100 ml-2 space-y-4">
        {momentosDia.map((m, i) => {
          const passado = proximoIdx === -1 || i < proximoIdx;
          const proximo = i === proximoIdx;
          return (
            <li key={m.hora} className="pl-5 relative">
              <span
                className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${
                  proximo ? "bg-amber-400 ring-4 ring-amber-100" : passado ? "bg-neutral-300" : "bg-neutral-950"
                }`}
              />
              <div className={`text-sm tabular-nums ${passado ? "text-neutral-400" : "text-neutral-500"}`}>
                {m.hora}{m.fim && ` – ${m.fim}`}
              </div>
              <div className={`font-medium ${passado ? "text-neutral-400" : ""}`}>{m.titulo}</div>
            </li>
          );
        })}
      </ol>
    </Cartao>
  );
}

export default function Inicio() {
  const { eu, setEu } = useEu();
  const agora = useAgora();

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-neutral-500 first-letter:uppercase">
            {agora.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold">
            {saudacao(agora)}{eu ? `, ${eu.nome}` : ""}
          </h1>
        </div>
        {eu && (
          <button onClick={() => setEu(null)} className="text-sm text-neutral-500 hover:text-neutral-950 underline underline-offset-4">
            Não és {eu.nome}?
          </button>
        )}
      </div>

      <InstalarApp compacto />

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 items-start">
        {eu ? <OMeuDia eu={eu} agora={agora} /> : <EscolherPessoa />}
        <div className="space-y-5">
          <DeServico agora={agora} />
          <Hoje agora={agora} />
        </div>
      </div>
    </div>
  );
}
