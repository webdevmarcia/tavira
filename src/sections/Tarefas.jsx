import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const empregados = [
  { nome: "Álvaro", cor: "#98FB98" },
  { nome: "Carolina", cor: "#facc15" },
  { nome: "Emanuel", cor: "#3b82f6" },
  { nome: "Filipe", cor: "#DC143C" },
  { nome: "Guilherme", cor: "#DCDCDC" },
  { nome: "João", cor: "#A52A2A" },
  { nome: "Márcia", cor: "#DA70D6" },
  { nome: "Niki", cor: "#14b8a6" },
  { nome: "Patrícia", cor: "#FA8072" },
  { nome: "Valéria", cor: "#a855f7" }
];

export default function Tarefas() {
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cards, setCards] = useState([]);

  // ============================
  // 1. Carregar tarefas do Firebase
  // ============================
  useEffect(() => {
    async function carregar() {
      const ref = doc(db, "tarefas", "empregados");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setCards(snap.data().cards);
      } else {
        // Se não existir, cria estrutura inicial
        const inicial = empregados.map(() => ({
          tarefas: [
            "Arrumar sala de dentro",
            "Talheres",
            "Guardanapos",
            "Casas de banho"
          ]
        }));
        setCards(inicial);
        await updateDoc(ref, { cards: inicial });
      }
    }

    carregar();
  }, []);

  // ============================
  // 2. Guardar no Firebase
  // ============================
  const guardarFirebase = async (novo) => {
    const ref = doc(db, "tarefas", "empregados");
    await updateDoc(ref, { cards: novo });
  };

  const editarTarefa = (cardIndex, tarefaIndex, novoTexto) => {
    const copia = [...cards];
    copia[cardIndex].tarefas[tarefaIndex] = novoTexto;
    setCards(copia);
    guardarFirebase(copia);
  };

  const validarPassword = () => {
    if (password === "philipinho2002") {
      setEditMode(true);
      setError("");
    } else {
      setError("Password incorreta");
    }
  };

  return (
    <section id="Tarefas" className="max-w-5xl mx-auto px-4 py-10 text-black">

      <h1 className="text-black text-4xl font-bold mb-2">Tarefas de cada empregado</h1>

      <div className="inline-block px-4 py-1 bg-yellow-500 text-black font-semibold rounded-full mb-8">
        4 a 9 de agosto
      </div>

      {!editMode && (
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password para editar"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-600 rounded-lg mr-3"
          />
          <button
            onClick={validarPassword}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Entrar
          </button>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}

      <div className="space-y-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg border border-gray-700"
            style={{ backgroundColor: empregados[index].cor }}
          >
            <h2 className="text-2xl font-bold text-black mb-4">
              {empregados[index].nome}
            </h2>

            <ul className="space-y-3">
              {card.tarefas.map((tarefa, i) => (
                <li key={i}>
                  {editMode ? (
                    <input
                      type="text"
                      value={tarefa}
                      onChange={(e) =>
                        editarTarefa(index, i, e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-gray-600 text-black"
                    />
                  ) : (
                    <span className="text-black text-lg">• {tarefa}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
