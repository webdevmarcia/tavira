import { useState } from "react";
import { faq } from "../data/conteudo";
import { Cartao, TituloPagina } from "../components/ui";
import Icone from "../components/Icones";

// Ignora maiúsculas e acentos ("bulhao" encontra "Bulhão")
const normalizar = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function Destacar({ texto, termo }) {
  if (!termo) return texto;
  // normalizar letra a letra para as posições coincidirem com o texto original
  const alvo = texto.split("").map(normalizar).join("");
  const partes = [];
  let i = 0;
  let pos;
  while ((pos = alvo.indexOf(termo, i)) !== -1) {
    partes.push(texto.slice(i, pos));
    partes.push(<mark key={pos} className="bg-amber-200 rounded px-0.5">{texto.slice(pos, pos + termo.length)}</mark>);
    i = pos + termo.length;
  }
  partes.push(texto.slice(i));
  return partes;
}

export default function Formacao() {
  const [pesquisa, setPesquisa] = useState("");
  const termo = normalizar(pesquisa.trim());

  const resultados = faq.filter(
    (item) => !termo || normalizar(item.pergunta).includes(termo) || normalizar(item.resposta).includes(termo)
  );

  return (
    <section>
      <TituloPagina titulo="Formação" subtitulo="Comidas, pratos e o que levar à cozinha" />

      <label className="relative block mb-5">
        <span className="sr-only">Pesquisar</span>
        <Icone nome="pesquisa" className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="search"
          placeholder="Pesquisar um prato, peixe, acompanhamento…"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-neutral-200 focus:outline-none focus:border-neutral-950"
        />
      </label>

      <div className="space-y-3">
        {resultados.map((item) => (
          <Cartao key={item.pergunta}>
            <details className="group" open={Boolean(termo)} key={termo ? "aberto" : "fechado"}>
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none p-5 font-semibold text-lg">
                <Destacar texto={item.pergunta} termo={termo} />
                <Icone nome="seta" className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-90" />
              </summary>
              <p className="px-5 pb-5 -mt-1 text-neutral-700 leading-relaxed">
                <Destacar texto={item.resposta} termo={termo} />
              </p>
            </details>
          </Cartao>
        ))}

        {resultados.length === 0 && (
          <p className="text-center text-neutral-500 py-10">Nada encontrado para "{pesquisa}".</p>
        )}
      </div>
    </section>
  );
}
