import { useState, useEffect } from "react";

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

const salas = [
  { nome: "Sala de Dentro", cor: "#f0f0f0" },
  { nome: "Sala de Vidro", cor: "#e8e8e8" },
  { nome: "Esplanada", cor: "#ffffff" }
];

export default function Salas() {
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Carregar dados guardados
  const [ocupacao, setOcupacao] = useState(() => {
    const guardado = localStorage.getItem("ocupacaoSalas");
    if (guardado) return JSON.parse(guardado);

    return salas.map(() => ({
      almoco: "",
      jantar: ""
    }));
  });

  // Guardar sempre que muda
  useEffect(() => {
    localStorage.setItem("ocupacaoSalas", JSON.stringify(ocupacao));
  }, [ocupacao]);

  const validarPassword = () => {
    if (password === "philipinho2002") {
      setEditMode(true);
      setError("");
    } else {
      setError("Password incorreta");
    }
  };

  const editarCampo = (salaIndex, periodo, novoTexto) => {
    const copia = [...ocupacao];
    copia[salaIndex][periodo] = novoTexto;
    setOcupacao(copia);
  };

  return (
    <section id="Salas" className="max-w-5xl mx-auto px-4 py-10 text-black">

      {/* Título */}
      <h1 className="text-4xl font-bold mb-6">Distribuição das Salas</h1>

      {/* Password */}
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

      {/* Cards das salas */}
      <div className="space-y-8">
        {salas.map((sala, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg border border-gray-700"
            style={{ backgroundColor: sala.cor }}
          >
            {/* Nome da sala */}
            <h2 className="text-2xl font-bold mb-4">{sala.nome}</h2>

            {/* Almoço */}
            <div className="mb-6">
              <p className="font-semibold mb-2">Almoço:</p>

              {editMode ? (
                <input
                  type="text"
                  value={ocupacao[index].almoco}
                  onChange={(e) =>
                    editarCampo(index, "almoco", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-600 text-black"
                />
              ) : (
                <div className="px-3 py-2 rounded-lg bg-white border border-gray-400">
                  {ocupacao[index].almoco || "—"}
                </div>
              )}
            </div>

            {/* Jantar */}
            <div>
              <p className="font-semibold mb-2">Jantar:</p>

              {editMode ? (
                <input
                  type="text"
                  value={ocupacao[index].jantar}
                  onChange={(e) =>
                    editarCampo(index, "jantar", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-600 text-black"
                />
              ) : (
                <div className="px-3 py-2 rounded-lg bg-white border border-gray-400">
                  {ocupacao[index].jantar || "—"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
