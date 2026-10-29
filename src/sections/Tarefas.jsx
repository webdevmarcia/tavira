import { useState } from "react";
import { empregados, periodoTarefas } from "../data/equipa";
import { useEu } from "../lib/eu";
import { firebaseAtivo, useFeitas, useTarefas } from "../lib/tarefas";
import { Avatar, Caixa, Cartao, Progresso, TituloPagina } from "../components/ui";
import Icone from "../components/Icones";

// Mesma nota do Gate: password visível no código, serve só para evitar edições por engano
const PASSWORD_EDICAO = "philipinho2002";

const estados = {
  local: "Edições guardadas só neste dispositivo",
  "a sincronizar": "A sincronizar…",
  "a guardar": "A guardar…",
  sincronizado: "Sincronizado com a equipa",
  offline: "Sem ligação — guardado neste dispositivo",
};

export default function Tarefas() {
  const { eu } = useEu();
  const { listas, estado, editar, adicionar, remover, repor } = useTarefas();
  const { feita, alternar } = useFeitas();

  const [editMode, setEditMode] = useState(false);
  const [pedirPassword, setPedirPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [soMinhas, setSoMinhas] = useState(Boolean(eu));

  const validarPassword = (e) => {
    e.preventDefault();
    if (password === PASSWORD_EDICAO) {
      setEditMode(true);
      setPedirPassword(false);
      setPassword("");
      setError("");
    } else {
      setError("Password incorreta");
    }
  };

  const visiveis = empregados.filter((e) => editMode || !soMinhas || !eu || e.nome === eu.nome);

  return (
    <section>
      <TituloPagina titulo="Tarefas" subtitulo="Tarefas de cada empregado">
        <span className="inline-block px-3 py-1.5 bg-amber-300 text-neutral-950 text-sm font-semibold rounded-full">
          {periodoTarefas}
        </span>
      </TituloPagina>

      {/* Barra de ferramentas */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {eu && !editMode && (
          <div className="inline-flex p-1 rounded-full bg-neutral-200/70 text-sm font-medium">
            {[
              [true, "As minhas"],
              [false, "Todas"],
            ].map(([valor, rotulo]) => (
              <button
                key={rotulo}
                onClick={() => setSoMinhas(valor)}
                className={`px-4 py-1.5 rounded-full transition ${soMinhas === valor ? "bg-white shadow-sm" : "text-neutral-500"}`}
              >
                {rotulo}
              </button>
            ))}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {editMode ? (
            <>
              <button onClick={() => confirm("Repor as tarefas originais deste período?") && repor()} className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-950">
                Repor
              </button>
              <button onClick={() => setEditMode(false)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-950 text-white text-sm font-medium">
                <Icone nome="check" className="w-4 h-4" /> Concluído
              </button>
            </>
          ) : (
            <button onClick={() => setPedirPassword((v) => !v)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 text-sm font-medium hover:bg-white">
              <Icone nome="lapis" className="w-4 h-4" /> Editar
            </button>
          )}
        </div>
      </div>

      {pedirPassword && !editMode && (
        <Cartao className="p-4 mb-5">
          <form onSubmit={validarPassword} className="flex flex-wrap gap-2">
            <input
              type="password"
              autoFocus
              placeholder="Password para editar"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 min-w-48 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-950"
            />
            <button type="submit" className="px-4 py-2 bg-neutral-950 text-white rounded-lg font-medium">Entrar</button>
          </form>
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </Cartao>
      )}

      {editMode && (
        <p className="mb-4 flex items-center gap-2 text-sm text-neutral-500">
          <Icone nome="nuvem" className="w-4 h-4" />
          {estados[estado]}
          {!firebaseAtivo && " (Firebase não configurado)"}
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {visiveis.map((emp) => {
          const tarefas = listas[emp.nome];
          const preenchidas = tarefas.filter(Boolean);
          const feitas = preenchidas.filter((t) => feita(emp.nome, t)).length;

          return (
            <Cartao key={emp.nome} className="overflow-hidden">
              <div className="h-1.5" style={{ backgroundColor: emp.cor }} />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar emp={emp} />
                  <h2 className="flex-1 text-xl font-semibold">{emp.nome}</h2>
                  {!editMode && (
                    <span className="text-sm text-neutral-500 tabular-nums">{feitas}/{preenchidas.length}</span>
                  )}
                </div>
                {!editMode && <Progresso feitas={feitas} total={preenchidas.length} cor={emp.cor} />}

                <ul className="mt-2 divide-y divide-neutral-100">
                  {tarefas.map((tarefa, i) => (
                    <li key={i} className="flex items-center gap-3 py-2.5">
                      {editMode ? (
                        <>
                          <input
                            type="text"
                            value={tarefa}
                            placeholder="Nova tarefa"
                            onChange={(e) => editar(emp.nome, i, e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-neutral-950"
                          />
                          <button onClick={() => remover(emp.nome, i)} aria-label="Apagar tarefa" className="p-2 text-neutral-400 hover:text-red-600">
                            <Icone nome="lixo" />
                          </button>
                        </>
                      ) : (
                        tarefa && (
                          <>
                            <Caixa marcada={feita(emp.nome, tarefa)} onClick={() => alternar(emp.nome, tarefa)} rotulo={tarefa} />
                            <span className={feita(emp.nome, tarefa) ? "line-through text-neutral-400" : ""}>{tarefa}</span>
                          </>
                        )
                      )}
                    </li>
                  ))}
                </ul>

                {editMode && (
                  <button onClick={() => adicionar(emp.nome)} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-950">
                    <Icone nome="mais" className="w-4 h-4" /> Adicionar tarefa
                  </button>
                )}
              </div>
            </Cartao>
          );
        })}
      </div>

      {!editMode && (
        <p className="mt-6 text-sm text-neutral-500">
          As tarefas marcadas como feitas ficam guardadas neste dispositivo e recomeçam todos os dias.
        </p>
      )}
    </section>
  );
}
