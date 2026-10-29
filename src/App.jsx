import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Gate from "./sections/Gate";
import Header, { BarraInferior } from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./sections/Inicio";
import Empregados from "./sections/Empregados";
import Tarefas from "./sections/Tarefas";
import Formacao from "./sections/Formacao";
import Regras from "./sections/Regras";
import { EuProvider } from "./lib/eu";
import "./index.css";

// Conteúdo da página atual (volta ao topo e anima ao mudar de página)
function Conteudo() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <main className="max-w-5xl mx-auto px-4 pt-6 md:pt-10 pb-28 md:pb-10 animate-fadeIn" key={pathname}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/equipa" element={<Empregados />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/formacao" element={<Formacao />} />
        <Route path="/regras" element={<Regras />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <Gate>
      <EuProvider>
        <BrowserRouter>
          <div className="min-h-dvh bg-neutral-50 text-neutral-950">
            <Header />
            <Conteudo />
            <Footer />
            <BarraInferior />
          </div>
        </BrowserRouter>
      </EuProvider>
    </Gate>
  );
}
