import { useEffect, useState } from "react";

// O Chrome dispara "beforeinstallprompt" muito cedo — main.jsx guarda-o aqui
let eventoGuardado = null;
const ouvintes = new Set();

export function capturarPromptInstalacao() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    eventoGuardado = e;
    ouvintes.forEach((fn) => fn());
  });
  window.addEventListener("appinstalled", () => {
    eventoGuardado = null;
    ouvintes.forEach((fn) => fn());
  });
}

export function estaInstalada() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

// "ios" (iPhone/iPad), "mac-safari", "chrome" (prompt disponível) ou "outro"
function detetarPlataforma() {
  const ua = navigator.userAgent;
  const ios = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (ios) return "ios";
  const safari = /safari/i.test(ua) && !/chrome|chromium|crios|edg|firefox|fxios/i.test(ua);
  if (safari && /macintosh/i.test(ua)) return "mac-safari";
  return "outro";
}

export function useInstalar() {
  const [, forcar] = useState(0);

  useEffect(() => {
    const fn = () => forcar((n) => n + 1);
    ouvintes.add(fn);
    return () => ouvintes.delete(fn);
  }, []);

  const instalada = estaInstalada();
  const plataforma = eventoGuardado ? "chrome" : detetarPlataforma();

  const instalar = async () => {
    if (!eventoGuardado) return false;
    eventoGuardado.prompt();
    const { outcome } = await eventoGuardado.userChoice;
    eventoGuardado = null;
    forcar((n) => n + 1);
    return outcome === "accepted";
  };

  return {
    instalada,
    plataforma,
    podeInstalar: !instalada && plataforma !== "outro",
    instalar,
  };
}
