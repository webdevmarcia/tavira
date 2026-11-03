import { Component } from "react";

// Se alguma página rebentar, mostra uma mensagem em vez de um ecrã preto
export default class ErroApp extends Component {
  state = { erro: null };

  static getDerivedStateFromError(erro) {
    return { erro };
  }

  componentDidCatch(erro, info) {
    console.error(erro, info.componentStack);
  }

  render() {
    if (!this.state.erro) return this.props.children;

    return (
      <div className="min-h-dvh flex items-center justify-center bg-neutral-950 px-6 text-center topo-seguro">
        <div className="max-w-sm">
          <img src="/logo.webp" alt="" className="w-24 h-24 mx-auto mb-6 rounded-full" />
          <h1 className="font-serif text-2xl text-white mb-2">Algo correu mal</h1>
          <p className="text-neutral-400 text-sm mb-6">Recarrega a página para continuar.</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-amber-300 hover:bg-amber-200 text-neutral-950 font-semibold py-3.5 rounded-xl transition"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }
}
