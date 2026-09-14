import { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

// Lista de empregados
const empregados = [
  { nome: "Álvaro", cor: "#98FB98" },
  { nome: "Carolina", cor: "#facc15" },
  { nome: "Emanuel", cor: "#3b82f6" },
  { nome: "Ludmila", cor: "#87CEFA" },
  { nome: "Márcia", cor: "#DA70D6" },
  { nome: "Niki", cor: "#14b8a6" },
  { nome: "Patrícia", cor: "#FA8072" },
  { nome: "Valéria", cor: "#a855f7" }
];

// =======================================
// 1. Tarefas 
// =======================================
const cardsInicial = [
  { tarefas: ["Montar a sala de dentro", "Talheres de manhã", "Varrer o chão de manhã", "Guardanapos de manhã"] }, // Álvaro

  { tarefas: ["Organizar o balcão", "Preparar couvert", "Fornecer sobremesas", "Apoiar a sala de vidro, se possível"] }, // Carolina

  { tarefas: ["Barris lá dentro", "Varrer a esplanada", "Montar/desmontar a esplanada", "Reposição e montra a noite"] }, // Emanuel 

  { tarefas: ["Limpar a área da copa", "Lavar o chão a tarde", "Limpar a garrafeira (terça a tarde)", "Guardanapos"] }, // Ludmila

  { tarefas: ["Casas de banho", "Vidros e montra", "Lavar o chão", "Lixo a noite"] }, // Márcia

  { tarefas: ["Montar sala de vidro", "Lavar os caixotes (quinta feira)", "Limpar menus, frapés e galheteiros", "Limpar as cadeiras de bebé"] }, // Niki

  { tarefas: ["Organizar o bar", "Lavar os copos", "Fornecer bebidas", "Apoiar a sala de dentro, se possível"] }, // Patrícia

  { tarefas: ["Galheteiros", "Limpar os aparadores (terça e sexta)", "Limpar a área da copa (quarta)", "Lixo a noite"] } // Valéria
];

export default function Tarefas() {
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Estado inicial vem 100% do VS Code
  const [cards, setCards] = useState(cardsInicial);

  // Guardar no Firebase 
  const guardarFirebase = async (novo) => {
    const ref = doc(db, "tarefas", "empregados");
    await updateDoc(ref, { cards: novo });
  };

  const editarTarefa = (cardIndex, tarefaIndex, novoTexto) => {
    const copia = [...cards];
    copia[cardIndex].tarefas[tarefaIndex] = novoTexto;
    setCards(copia);

    // 
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
        15 a 20 de setembro
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
