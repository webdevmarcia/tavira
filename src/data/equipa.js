// =======================================
// EQUIPA — horários, cores e tarefas
// Editar aqui todas as semanas.
// =======================================

// Período das tarefas atuais (aparece no topo da página Tarefas)
export const periodoTarefas = "30 de outubro a 8 de novembro";

export const empregados = [
  {
    nome: "Álvaro", cor: "#98FB98", diurno: "10:00 - 15:30", noturno: "18:15 - 23:00", direto: false,
    tarefas: ["Montar a sala de dentro", "Talheres de manhã", "Varrer o chão de manhã", "Guardanapos de manhã"],
  },
  {
    nome: "Carolina", cor: "#facc15", diurno: "10:00 - 15:45", noturno: "18:15 - 23:00", direto: false,
    tarefas: ["Organizar o balcão", "Preparar couvert", "Fornecer sobremesas", "Apoiar a sala de vidro, se possível"],
  },
  {
    nome: "Ludmila", cor: "#87CEFA", diurno: "10:30 - 20:30", noturno: "—", direto: true,
    tarefas: ["Lavar o chão", "Limpar a área da copa", "Esplanada", "Limpar os menus, frapés e galheteiros"],
  },
  {
    nome: "Márcia", cor: "#DA70D6", diurno: "10:00 - fecho", noturno: "—", direto: true,
    tarefas: ["Barris lá dentro/fora", "Ver reservas", "Lixo a noite", "Montra a noite"],
  },
  {
    nome: "Niki", cor: "#14b8a6", diurno: "10:30 - 16:30", noturno: "18:15 - 23:30", direto: false,
    tarefas: ["Vidros e montra de manhã", "Casas de banho", "Limpar os aparadores (quarta/quinta)", "Sala de vidro"],
  },
  {
    nome: "Patrícia", cor: "#FA8072", diurno: "11:00 - 15:45", noturno: "18:15 - 00:00", direto: false,
    tarefas: ["Organizar o bar", "Lavar os copos", "Fornecer bebidas", "Apoiar a sala de dentro, se possível"],
  },
  {
    nome: "Ricardo", cor: "#DC143C", diurno: "10:30 - 15:45", noturno: "18:15 - 00:00", direto: false,
    tarefas: ["Lavar os caixotes (quinta)", "Apoio a montar as salas", "Reposição de manhã", "Lixo a noite"],
  },
  {
    nome: "Valéria", cor: "#a855f7", diurno: "10:30 - 15:30", noturno: "20:30 - fecho", direto: false,
    tarefas: ["Limpar as cadeiras de bebé", "Guardanapos", "Limpar a garrafeira", "Reposição a noite"],
  },
];

// Momentos-chave do dia (usados no Início)
export const momentosDia = [
  { hora: "11:25", fim: "11:55", titulo: "Almoço da equipa" },
  { hora: "12:00", titulo: "Serviço de almoço — todos nos postos" },
  { hora: "18:25", fim: "18:55", titulo: "Jantar da equipa" },
  { hora: "19:00", titulo: "Serviço de jantar — todos nos postos" },
];
