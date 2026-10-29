// Ícones simples (traço), herdam a cor do texto
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const caminhos = {
  inicio: <path d="M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9" />,
  equipa: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2c2.9.4 5 2.8 5 5.8" />
    </>
  ),
  tarefas: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
      <path d="m8 9 1.6 1.6L12.5 7.7M8 15.5l1.6 1.6 2.9-2.9M15 9.5h2M15 16h2" />
    </>
  ),
  formacao: <path d="M4 5.5C6.5 4 9.5 4 12 5.5 14.5 4 17.5 4 20 5.5V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0Zm8 0V19" />,
  regras: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5 7.5-9.5V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  relogio: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  lua: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  pesquisa: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  mais: <path d="M12 5v14M5 12h14" />,
  fechar: <path d="M6 6l12 12M18 6 6 18" />,
  lixo: <path d="M4.5 7h15M10 11v6M14 11v6M6 7l1 12.5h10L18 7M9.5 7V4.5h5V7" />,
  lapis: <path d="M4 20h4L19 9l-4-4L4 16Zm9-13 4 4" />,
  partilhar: <path d="M12 15V3.5M8 7.5l4-4 4 4M6 11H5v9.5h14V11h-1" />,
  descarregar: <path d="M12 3.5V15m-4-4 4 4 4-4M5 20.5h14" />,
  cadeado: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  sair: <path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14M10 16l-4-4 4-4M6 12h10" />,
  seta: <path d="m9 6 6 6-6 6" />,
  nuvem: <path d="M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.5 1.6A3.8 3.8 0 0 1 17.5 18.5Z" />,
};

export default function Icone({ nome, className = "w-5 h-5", ...props }) {
  return (
    <svg {...base} className={className} {...props}>
      {caminhos[nome]}
    </svg>
  );
}
