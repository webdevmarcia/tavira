export default function Regras() {
  return (
    <section id="Regras" className="w-full py-20 text-black">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold">Regras da Casa</h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Card 1 */}
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-3">
            Normas essenciais para o bom funcionamento do restaurante
          </h2>

          <ul className="space-y-2 text-lg">

            <li>• Respeitar os horários e evitar atrasos.</li>

            <li>• Almoço: 11:25h às 11:55h — Jantar: 18:25h às 18:55h.</li>

            <li>• Às 12h e às 19h todos devem estar prontos e nos seus postos.</li>

            <li>• A esplanada nunca pode ficar sem nenhum empregado.</li>


            <li>• Manter as mesas limpas e organizadas durante todo o serviço.</li>

            <li>• Nunca sentar clientes sem verificar o livro das reservas.</li>

            <li>• Confirmar sempre o número de pessoas antes de sentar.</li>

            <li>• Não deixar a louça suja em nenhum balcão. Recolheu da mesa → levar à cozinha na mesma hora e raspar sempre os pratos.</li>

            <li>• As mesas devem ser limpas imediatamente após o cliente sair.</li>

            <li>• Talheres, pratos e guardanapos devem estar sempre reabastecidos.</li>

            <li>• Casas de banho verificadas a cada duas horas </li>

            <li>• Vidros e montra limpos diariamente.</li>

            <li>• Informar sempre o responsável sobre qualquer problema.</li>

            <li>• Nunca discutir à frente dos clientes.</li>

            <li>• Manter uma comunicação clara entre a sala, o bar e a  cozinha.</li>

          </ul>
        </div>

      </div>
    </section>
  );
}
