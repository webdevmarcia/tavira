// Converte "10:30" em minutos desde a meia-noite. "fecho" e "00:00" contam como fim do dia.
function paraMinutos(texto, fim = false) {
  const t = texto.trim().toLowerCase();
  if (t === "fecho") return 24 * 60;
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h)) return null;
  const minutos = h * 60 + (m || 0);
  return fim && minutos === 0 ? 24 * 60 : minutos;
}

// "10:00 - 15:30" → { inicio: 600, fim: 930 } (ou null se for "—")
export function intervalo(texto) {
  if (!texto || !texto.includes("-")) return null;
  const [a, b] = texto.split("-");
  const inicio = paraMinutos(a);
  let fim = paraMinutos(b, true);
  if (inicio == null || fim == null) return null;
  if (fim <= inicio) fim += 24 * 60;
  return { inicio, fim };
}

export function minutosAgora(data = new Date()) {
  return data.getHours() * 60 + data.getMinutes();
}

// Devolve "diurno", "noturno" ou null
export function turnoAtual(emp, agora = minutosAgora()) {
  for (const turno of ["diurno", "noturno"]) {
    const i = intervalo(emp[turno]);
    if (i && agora >= i.inicio && agora < i.fim) return turno;
  }
  return null;
}

// Próximo turno a começar hoje (ou null)
export function proximoTurno(emp, agora = minutosAgora()) {
  for (const turno of ["diurno", "noturno"]) {
    const i = intervalo(emp[turno]);
    if (i && agora < i.inicio) return { turno, ...i };
  }
  return null;
}

export function formatarMinutos(min) {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function hojeISO(data = new Date()) {
  const y = data.getFullYear();
  const m = String(data.getMonth() + 1).padStart(2, "0");
  const d = String(data.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
