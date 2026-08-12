import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Empregados from "./sections/Empregados";
import Formacao from "./sections/Formacao";
import Tarefas from "./sections/Tarefas";
import Regras from "./sections/Regras";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-[var(--on-surface)] bg-[var(--surface)]">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
               
                {/* CONTEÚDO PRINCIPAL */}
                <main className="overflow-x-hidden max-w-7xl mx-auto px-6 py-20 space-y-32">
                  <Empregados />
                  <Tarefas />
                  <Formacao />
                  <Regras />
                </main>
              </>
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
