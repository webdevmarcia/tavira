import { useEffect, useState } from "react";

// localStorage pode falhar (modo privado, armazenamento bloqueado) — nunca deixar a app rebentar
export function ler(chave, padrao) {
  try {
    const valor = localStorage.getItem(chave);
    return valor == null ? padrao : JSON.parse(valor);
  } catch {
    return padrao;
  }
}

export function guardar(chave, valor) {
  try {
    if (valor === undefined) localStorage.removeItem(chave);
    else localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // ignorar
  }
}

// Apaga chaves antigas com um prefixo (ex.: checklists de dias anteriores)
export function limparPrefixo(prefixo, manter) {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(prefixo) && k !== manter)
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignorar
  }
}

// useState que fica guardado neste dispositivo
export function useLocal(chave, padrao) {
  const [estado, setEstado] = useState(() => ({ chave, valor: ler(chave, padrao) }));

  let valor = estado.valor;
  if (estado.chave !== chave) {
    valor = ler(chave, padrao);
    setEstado({ chave, valor });
  }

  const set = (novo) => {
    setEstado((atual) => {
      const resolvido = typeof novo === "function" ? novo(atual.valor) : novo;
      guardar(chave, resolvido);
      return { chave, valor: resolvido };
    });
  };

  return [valor, set];
}

// Hora atual, atualizada a cada minuto
export function useAgora() {
  const [agora, setAgora] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setAgora(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);
  return agora;
}
