import { Partido } from '../modelo/partido';

export interface GestorPartidos {
  getPartidos: () => Partido[];
}
