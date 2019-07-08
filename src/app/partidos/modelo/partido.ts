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
  tipo: string;
  idParticipante: string;
  url: string;
}

export interface Tarjeta extends Suceso {
  tipoTarjeta: string;
}
