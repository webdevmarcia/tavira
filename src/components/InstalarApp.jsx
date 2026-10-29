import { useState } from "react";
import { useInstalar } from "../lib/instalar";
import { useLocal } from "../lib/storage";
import Icone from "./Icones";

const passos = {
  ios: [
    <>Toca no botão <b>Partilhar</b> <Icone nome="partilhar" className="inline w-4 h-4 -mt-1" /> na barra do Safari (ou no menu do Chrome).</>,
    <>Desliza e escolhe <b>Adicionar ao ecrã principal</b>.</>,
    <>Toca em <b>Adicionar</b>. A app aparece no ecrã com o logo d'O Tavira.</>,
  ],
  "mac-safari": [
    <>No menu do Safari, abre <b>Ficheiro</b>.</>,
    <>Escolhe <b>Adicionar à Dock…</b></>,
    <>Confirma em <b>Adicionar</b>.</>,
  ],
};

// Cartão "Instalar a app" — Chrome/Edge/Android instalam com um toque; Safari mostra os passos
export default function InstalarApp({ compacto = false }) {
  const { podeInstalar, plataforma, instalar } = useInstalar();
  const [dispensado, setDispensado] = useLocal("instalar-dispensado", false);
  const [verPassos, setVerPassos] = useState(false);

  if (!podeInstalar || (compacto && dispensado)) return null;

  const carregar = () => (plataforma === "chrome" ? instalar() : setVerPassos(true));

  return (
    <>
      <div className="relative flex items-center gap-4 p-4 rounded-2xl bg-neutral-950 text-white">
        <img src="/icons/icon-192.png" alt="" className="w-12 h-12 rounded-xl shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-left">Instalar a app</p>
          <p className="text-sm text-neutral-400 text-left">Abre num toque, em ecrã inteiro, mesmo sem internet.</p>
        </div>
        <button
          onClick={carregar}
          className="shrink-0 inline-flex items-center gap-1.5 bg-amber-300 hover:bg-amber-200 text-neutral-950 font-semibold text-sm px-4 py-2 rounded-full transition"
        >
          <Icone nome="descarregar" className="w-4 h-4" />
          Instalar
        </button>
        {compacto && (
          <button
            onClick={() => setDispensado(true)}
            aria-label="Dispensar"
            className="absolute -top-2 -right-2 w-7 h-7 grid place-items-center rounded-full bg-neutral-700 text-white"
          >
            <Icone nome="fechar" className="w-4 h-4" />
          </button>
        )}
      </div>

      {verPassos && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setVerPassos(false)}
        >
          <div
            role="dialog"
            aria-label="Como instalar"
            className="w-full max-w-md bg-white rounded-3xl p-6 fundo-seguro animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">Instalar O Tavira</h2>
              <button onClick={() => setVerPassos(false)} aria-label="Fechar" className="p-1 text-neutral-500">
                <Icone nome="fechar" />
              </button>
            </div>
            <ol className="space-y-4">
              {passos[plataforma].map((passo, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-7 h-7 grid place-items-center rounded-full bg-amber-300 font-semibold text-sm">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-left text-neutral-700">{passo}</p>
                </li>
              ))}
            </ol>
            <button
              onClick={() => setVerPassos(false)}
              className="mt-6 w-full bg-neutral-950 text-white font-semibold py-3 rounded-xl"
            >
              Percebi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
