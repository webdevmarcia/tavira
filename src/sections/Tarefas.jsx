import { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

// Lista de empregados
const empregados = [
  { nome: "Álvaro", cor: "#98FB98" },
  { nome: "Ana", cor: "#FFA500" },
  { nome: "Carolina", cor: "#facc15" },
  { nome: "Emanuel", cor: "#3b82f6" },
  { nome: "Filipe", cor: "#DC143C" },   
  { nome: "Inês", cor: "#DCDCDC" },
  { nome: "Ludmila", cor: "#87CEFA" },
  { nome: "Márcia", cor: "#DA70D6" },
  { nome: "Nicole", cor: "#14b8a6" },
  { nome: "Patrícia", cor: "#FA8072" },
  { nome: "Valéria", cor: "#a855f7" }
];

// =======================================
// 1. Tarefas — 4 por empregado
// =======================================
const cardsInicial = [
  { tarefas: ["Montar sala de dentro", "Talheres de manhã", "Varrer o chão de manhã", "Atender os clientes"] }, // Álvaro

  { tarefas: ["Lavar o chão de manhã", "Varrer o chão a tarde", "Lavar o chão a tarde ", "Atender os clientes"] }, // Ana

  { tarefas: ["Organizar o balcão", "Preparar couvert", "Fornecer sobremesas", "Apoiar a sala de vidro, se possível"] }, // Carolina

  { tarefas: ["Lavar os caixotes (Quinta)", "Lixo a noite", "Atender os clientes", "Barris lá dentro"] }, // Emanuel 

  { tarefas: [ "Montar a sala de vidro", "Repor as bebidas (tarde e noite)", "Ver a fossa (quarta ou quinta)", "Atender clientes", ] }, // Filipe
 
  { tarefas: ["Dobrar guardanapos (manhã e tarde)", "Varrer a esplanada", "Limpar a montra de manhã", "Apoio" ] }, // Inês

  { tarefas: ["Limpar os aparadores (quarta e quinta)", "Limpar os frapés (terça)", "Organizar as salas a tarde", "Atender os clientes"] }, // Ludmila

  { tarefas: ["Montar a esplanada", "Montra da noite", "Ver Reservas", "Repor bebidas de manhã"] }, // Márcia

  { tarefas: ["Limpar os vidros, ecrãs e por cima dos frigoríficos", "Limpar a casa de banho de manhã", "Fazer os talheres a tarde", "Apoio"] }, // Nicole

  { tarefas: ["Organizar o bar", "Lavar os copos", "Fornecer bebidas", "Apoiar a sala de dentro, se possível"] }, // Patrícia

  { tarefas: ["Montar sala de vidro", "Limpar a garrafeira (quarta ou quinta)", "Limpar menus e galheteiros", "Atender clientes"] } // Valéria
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
        1 a 6 de setembro
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
