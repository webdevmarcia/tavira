import { createContext, useContext } from "react";
import { empregados } from "../data/equipa";
import { useLocal } from "./storage";

// "Quem sou eu" — escolhido uma vez e lembrado neste dispositivo
const EuContext = createContext(null);

export function EuProvider({ children }) {
  const [nome, setNome] = useLocal("eu", null);
  const eu = empregados.find((e) => e.nome === nome) || null;
  return <EuContext.Provider value={{ eu, setEu: setNome }}>{children}</EuContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEu() {
  return useContext(EuContext);
}
