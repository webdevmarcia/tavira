import { useEffect, useRef, useState } from "react";
import { empregados, periodoTarefas } from "../data/equipa";
import { firebaseAtivo, getDb } from "../firebase";
import { guardar, ler, limparPrefixo, useLocal } from "./storage";
import { hojeISO } from "./turnos";

export { firebaseAtivo };

const CHAVE_EDITADAS = "tarefas-editadas";

function listasIniciais() {
  return Object.fromEntries(empregados.map((e) => [e.nome, e.tarefas]));
}

// Só aceita edições do período atual — quando o período muda no código, as listas novas mandam
function aplicar(guardado) {
  if (!guardado || guardado.periodo !== periodoTarefas) return listasIniciais();
  return { ...listasIniciais(), ...guardado.listas };
}

// Listas de tarefas (com edições guardadas no dispositivo e, se configurado, no Firebase)
export function useTarefas() {
  const [listas, setListas] = useState(() => aplicar(ler(CHAVE_EDITADAS)));
  const [estado, setEstado] = useState(firebaseAtivo ? "a sincronizar" : "local");
  const timer = useRef(null);
  const pendente = useRef(false); // há edições locais ainda por enviar

  useEffect(() => {
    if (!firebaseAtivo) return;
    let cancelar = () => {};
    let ativo = true;
    getDb().then(({ db, firestore }) => {
      if (!ativo) return;
      cancelar = firestore.onSnapshot(
        firestore.doc(db, "tarefas", "empregados"),
        (snap) => {
          if (snap.metadata.hasPendingWrites || pendente.current) return;
          const dados = snap.data();
          if (dados?.periodo === periodoTarefas) {
            setListas(aplicar(dados));
            guardar(CHAVE_EDITADAS, dados);
          }
          setEstado("sincronizado");
        },
        () => setEstado("offline")
      );
    });
    return () => {
      ativo = false;
      cancelar();
    };
  }, []);

  const persistir = (novas) => {
    const dados = { periodo: periodoTarefas, listas: novas };
    guardar(CHAVE_EDITADAS, dados);
    if (!firebaseAtivo) return;
    clearTimeout(timer.current);
    pendente.current = true;
    setEstado("a guardar");
    timer.current = setTimeout(async () => {
      try {
        const { db, firestore } = await getDb();
        await firestore.setDoc(firestore.doc(db, "tarefas", "empregados"), dados);
        setEstado("sincronizado");
      } catch {
        setEstado("offline");
      } finally {
        pendente.current = false;
      }
    }, 700);
  };

  const atualizar = (nome, nova) => {
    const novas = { ...listas, [nome]: nova };
    setListas(novas);
    persistir(novas);
  };

  const editar = (nome, indice, texto) =>
    atualizar(nome, listas[nome].map((t, i) => (i === indice ? texto : t)));

  const adicionar = (nome) => atualizar(nome, [...listas[nome], ""]);

  const remover = (nome, indice) => atualizar(nome, listas[nome].filter((_, i) => i !== indice));

  const repor = () => {
    const novas = listasIniciais();
    setListas(novas);
    persistir(novas);
  };

  return { listas, estado, editar, adicionar, remover, repor };
}

// Checklist do dia (só neste dispositivo, recomeça todos os dias)
export function useFeitas() {
  const chave = `feitas-${hojeISO()}`;
  const [feitas, setFeitas] = useLocal(chave, {});

  useEffect(() => {
    limparPrefixo("feitas-", chave);
  }, [chave]);

  const alternar = (nome, tarefa) => {
    const id = `${nome}|${tarefa}`;
    setFeitas((atual) => ({ ...atual, [id]: !atual[id] }));
  };

  const feita = (nome, tarefa) => Boolean(feitas[`${nome}|${tarefa}`]);

  return { feita, alternar };
}
