// Lista de empregados
const empregados = [
  { nome: "Álvaro", cor: "	#98FB98", diurno: "10:00 - 15:45", noturno: "18:15 - 23:00", direto: false },
  { nome: "Carolina", cor: "#facc15", diurno: "10:00 - 15:45", noturno: "18:15 - 23:30", direto: false },
  { nome: "Emanuel", cor: "#3b82f6", diurno: "—", noturno: "15:00 - 00:00", direto: true },
  { nome: "Filipe", cor: "	#DC143C", diurno: "10:00 - 18:30", noturno: "—", direto: true },
  { nome: "Guilherme", cor: "#DCDCDC", diurno: "10:00 - 15:45", noturno: "18:00 - 23:00", direto: false },
  { nome: "João", cor: "#A52A2A", diurno: "10:00 - 15:45", noturno: "18:00 - 23:00", direto: false },
  { nome: "Márcia", cor: "#DA70D6", diurno: "10:00 - 16:00", noturno: "18:30 - 00:00", direto: false },
  { nome: "Niki", cor: "#14b8a6", diurno: "10:00 - 15:45", noturno: "18:00 - 23:00", direto: false },
  { nome: "Patrícia", cor: "#FA8072", diurno: "10:00 - 15:45", noturno: "18:30 - 23:30", direto: false },
  { nome: "Valéria", cor: "#a855f7", diurno: "10:00 - 16:00", noturno: "—", direto: false },
,
];

export default function Empregados() {
  return (
    <section id="Empregados" className="max-w-6xl mx-auto px-4 py-10">
      
      {/* Título */}
      <div className="text-center mb-10">
         {/* Título da semana */}
      <h1 className=" text-black text-4xl font-bold mb-2"> Empregados</h1>

        <p className="mt-2 text-lg text-gray-400">Horários e turnos da equipa</p>
      </div>

      {/* Tabela */}
      <table className="w-full text-white border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Diurno</th>
            <th className="p-3 text-left">Noturno</th>
            <th className="p-3 text-left">Direto</th>
          </tr>
        </thead>

        <tbody>
          {empregados.map((emp, index) => (
            <tr
              key={index}
              className="text-black"
              style={{ backgroundColor: emp.cor }}
            >
              <td className="p-3 font-semibold">{emp.nome}</td>
              <td className="p-3">{emp.diurno}</td>
              <td className="p-3">{emp.noturno}</td>
              <td className="p-3">
                {emp.direto ? (
                  <span className="px-3 py-1 bg-black/40 text-white rounded-full">
                    Direto
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
