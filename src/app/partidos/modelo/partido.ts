export interface Partido {
  id: string;
  local: string;
  visitante: string;
  fecha: number;
  sucesos: Suceso[];
  golesLocal: () => number;
  golesVisitante: () => number;
  getResultado: () => string;
}

export interface Suceso {
  class: string;
  idParticipante: string;
}
